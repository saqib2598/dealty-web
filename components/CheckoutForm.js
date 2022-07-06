import React, {Component} from 'react';
import { injectStripe} from 'react-stripe-elements';
import { Alert } from 'reactstrap'
import { checkoutPayment, updateCard } from '../modules/users'
import CardElement from './users/CardComponent'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Router } from '../routes'
import { alertStyle} from '../containers/dashboard/styles/Modal'
import SubscriptionPlanModal from './modals/SubscriptionPlanModal'

const mapDispatchToProps = { checkoutPayment, updateCard }

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      deleteSubscriptionModalVisible: false,
      subscriptionModalVisible: false,
      success: '',
      subscribeSubmitter: false,
      error: '',
      key: 0
    };
    this.submit = this.submit.bind(this);
    this.manageCard = this.manageCard.bind(this);
    this.manageSubscription = this.manageSubscription.bind(this);
  }

  async submit(ev) {
    // User clicked submit
    const { user, plan } = this.props
    const full_name = user.firstName + " " + user.lastName
    this.setState({ subscribeSubmitter: true })
    let { token } = await this.props.stripe.createToken({name: full_name});
    if(!token){
      this.setState({
        subscribeSubmitter: false,
        error: 'Invalid card information'
      }, () => {
        setTimeout(() => {
          this.setState({error: ''})
        }, 5000)
      })
      return
    }

    if(!plan)
      this.manageCard(token)
    else
      this.manageSubscription(token)

  }

  async manageCard(token){
    const { updateCard, user } = this.props
    try{
      await updateCard(token, user.id)
      this.setState({
        key: this.state.key+1,
        subscribeSubmitter: false,
        success: 'Card is updated Successfully'
      }, () => {
        setTimeout(() => {
          this.setState({success: ''})
        }, 3000)
      })
    } catch (error) {
      this.setState({
        subscribeSubmitter: false,
        error: error.message
      }, () => {
        setTimeout(() => {
          this.setState({error: ''})
        }, 5000)
      })
    }
  }

  async manageSubscription(token){
    const { checkoutPayment, plan } = this.props

    token.planId = plan.id
    let response = null
    try{
      response = await checkoutPayment(token)
      this.setState({
        subscriptionModalVisible: true,
        success: "Subscription Created Successfully",
        error: ''
      })

      setTimeout(() => {
        Router.pushRoute('/plans')
      }, 3000)

    } catch (error) {
      this.setState({
        subscriptionModalVisible: false,
        subscribeSubmitter: false,
        error: error.message
      }, () => {
        setTimeout(() => {
          this.setState({error: ''})
        }, 5000)
      })
    }
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    const { user, plan } = this.props
    const { subscriptionModalVisible, subscribeSubmitter, error, key } = this.state

    return (
        <>
          <SubscriptionPlanModal
            isOpen={subscriptionModalVisible}
            success={this.state.success}
            plan={plan}
            user={user}
            error={error}
          />

          {
            this.state.success !== '' &&
              <Alert color="success" style={alertStyle}>{this.state.success}</Alert>
          }

          <CardElement
            key={key}
            handleSubmit={this.submit}
            subscribeSubmitter={subscribeSubmitter}
            error={error}
            updatingCard={!plan}
            user={user}
          />
        </>
    );
  }
}
CheckoutForm = connect(null, mapDispatchToProps)(CheckoutForm)
export default withRouter(injectStripe(CheckoutForm));
