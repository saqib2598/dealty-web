import { Router } from '../routes'
import React from 'react'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import ContactForm from '../components/ContactForm'
import { mapFinalFormErrors } from '../lib/utils'
import { sendContactMessage } from '../modules/users'

const mapErrors = mapFinalFormErrors('Failed to send message')

const mapDispatchToProps = {sendContactMessage}

class ContactContainer extends React.PureComponent {
  onSubmit = (values) => {
    const { sendContactMessage } = this.props
    return sendContactMessage(values)
      .then(() => Router.back())
      .catch(mapErrors)
  }

  validate = (values) => {
    const errors = {}

    if (!values.message) {
      errors.message = 'Message is required'
    }

    return errors
  }

  render() {
    return (
      <Form
        component={ContactForm}
        onSubmit={this.onSubmit}
        validate={this.validate}
      />
    )
  }
}

ContactContainer = connect(null, mapDispatchToProps)(ContactContainer)

export default ContactContainer
