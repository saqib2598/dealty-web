import React from 'react'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import { isSignedIn as hasCredentials } from '../../../lib/session'
import SendAppointmentForm from '../../../components/buyer/home/SendAppointmentForm'
import { createAppointment } from '../../../modules/appointments'
import { mapFinalFormErrors } from '../../../lib/utils'
import { retrieveUser, selectUser } from '../../../modules/users'

const mapErrors = mapFinalFormErrors('Failed to submit your query.')

const mapDispatchToProps = { createAppointment, retrieveUser }

const mapStateToProps = (state) => ({
  isSignedIn: hasCredentials(state),
  user: selectUser(state)
})

class SendAppointmentContainer extends React.Component {

  state = {
    formKey: 0
  }

  componentDidMount(){
    const {retrieveUser, isSignedIn} = this.props
    isSignedIn && retrieveUser()
  }
  onSubmit = async (values) => {
    const { createAppointment, home, toggleSendAppointment } = this.props

    if(values.AppointmentTime){
      values.AppointmentTime = new Date(values.AppointmentTime)
      values['SenderTz'] = Intl.DateTimeFormat().resolvedOptions().timeZone
    }
    try {
      await createAppointment(home, values)
      toggleSendAppointment()
      setTimeout(()=>{
        this.setState(prevState => {return {formKey: prevState.formKey + 1} })
      }, 3000)
    } catch (error) {
      mapErrors(error)
    }
  }

  render() {
    let { openSendOnlineOffer, toggleSendOnlineOffer, isSignedIn, user, home, toggleSendAppointment, openSendAppointment } = this.props
    let { formKey } = this.state
    return (
      <Form
        component={SendAppointmentForm}
        onSubmit={this.onSubmit}
        toggleSendAppointment = {toggleSendAppointment}
        openSendAppointment = {openSendAppointment}
        isSignedIn={isSignedIn}
        heading='Schedule Showing'
        message='requesting a showing'
        home = {home}
        key = {formKey}
      />
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SendAppointmentContainer)
