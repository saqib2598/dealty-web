import { withRouter } from 'next/router'
import React, { Component } from 'react'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import { mapFinalFormErrors } from '../../lib/utils'
import { resetPassword } from '../../modules/users'
import { Router } from '../../routes'
import ForgotPasswordForm from '../../components/users/ForgotPasswordForm'

const mapErrors = mapFinalFormErrors()

const mapDispatchToProps = { resetPassword }

class ForgotPasswordFormContainer extends Component {
  state = {
    alert: null
  }

  onSubmit = (values) => {
    const { resetPassword } = this.props

    resetPassword(values)
      .then(() => {
        this.setState(
          {alert: 'Please check your email to reset password'}
        )
      })
      .then(() => setTimeout(() => {Router.pushRoute('login')}, 3000))
      .then(() => window.scrollTo(0, 0))
      .catch(mapErrors)
  }

  validate = (values) => {
    const errors = {}

    if (!values.email) {
      errors.email = 'Email is required'
    }

    return errors
  }

  render(){
    const { alert } = this.state

    return(
      <Form
        component={ForgotPasswordForm}
        onSubmit={this.onSubmit}
        validate={this.validate}
        alert={alert}
      />
    )
  }

}

ForgotPasswordFormContainer = connect(null, mapDispatchToProps)(ForgotPasswordFormContainer)

export default withRouter(ForgotPasswordFormContainer)
