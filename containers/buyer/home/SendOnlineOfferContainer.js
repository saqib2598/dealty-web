import React from 'react'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import { isSignedIn as hasCredentials } from '../../../lib/session'
import SendOnlineOfferForm from '../../../components/buyer/home/SendOnlineOfferForm'
import { sendOnlineOffer } from '../../../modules/offers'
import { mapFinalFormErrors } from '../../../lib/utils'
import { retrieveUser, selectUser } from '../../../modules/users'


const mapErrors = mapFinalFormErrors('Failed to submit your query.')

const mapDispatchToProps = { sendOnlineOffer, retrieveUser }

const mapStateToProps = (state) => ({
  isSignedIn: hasCredentials(state),
  user: selectUser(state)
})

class SendOnlineOfferContainer extends React.Component {

  state = {
    formKey: 0
  }

  componentDidMount(){
    const {retrieveUser, isSignedIn} = this.props
    isSignedIn && retrieveUser()
  }
  onSubmit = async (values) => {
    const { sendOnlineOffer, home, toggleSendOnlineOffer } = this.props
    if(values.SuggestedClosingDate){
      values.SuggestedClosingDate = new Date(values.SuggestedClosingDate)
    }
    try {
      await sendOnlineOffer(home, values)
      toggleSendOnlineOffer()
      setTimeout(()=>{
        this.setState(prevState => {return {formKey: prevState.formKey + 1} })
      }, 3000)
    } catch (error) {
      mapErrors(error)
    }
  }

  render() {
    let { openSendOnlineOffer, toggleSendOnlineOffer, isSignedIn, home } = this.props
    let { formKey } = this.state
    return (
      <Form
        component={SendOnlineOfferForm}
        onSubmit={this.onSubmit}
        openSendOnlineOffer={openSendOnlineOffer}
        toggleSendOnlineOffer={toggleSendOnlineOffer}
        isSignedIn={isSignedIn}
        heading='Send Online Offer'
        home = {home}
        key = {formKey}
        note = "Be advised the owner of this property has not yet officially claimed their listing on the Dealty website, but your message will be forwarded to the contact information that is on the property records"
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendOnlineOfferContainer)
