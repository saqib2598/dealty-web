import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from '../components/CheckoutForm'
import requireAuth from '../lib/requireAuth'
import getConfig from 'next/config'
import { connect }from 'react-redux'
import { selectUser, retrieveUser } from '../modules/users'
import { Router } from '../routes'

const mapDispatchToProps = { selectUser, retrieveUser }

const mapStateToProps = (state) => ({
  user: selectUser(state)
})

class StripeProviderComponent  extends Component {

  constructor() {
    super()
    this.state = {stripe: null}
  }

  componentDidMount() {
    const { user, plan } = this.props
    const { publicRuntimeConfig } = getConfig()
    if(user.card && plan)
      Router.pushRoute('/plans')

    if (window.Stripe) {
      this.setState({stripe: window.Stripe(publicRuntimeConfig.stripeKey)});
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({stripe: window.Stripe(publicRuntimeConfig.stripeKey)});
      });
    }
  }

  render() {
    const { user, plan } = this.props
    return (
      <StripeProvider stripe={this.state.stripe}>
        <div>
          <Elements>
            <CheckoutForm plan={plan} user={user} />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(StripeProviderComponent));
