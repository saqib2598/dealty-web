import { Router } from '../../routes'
import React from 'react'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import ResetPasswordForm from '../../components/users/ResetPasswordForm'
import { mapFinalFormErrors } from '../../lib/utils'
import { changePassword } from '../../modules/users'

const mapErrors = mapFinalFormErrors('Failed to change password')

const onSubmit = (changePassword, resetToken) => (values) => {
  const user = {
    ...values,
    reset_password_token: resetToken,
  }

  return changePassword(user)
    .then(() => {
      const query = { message: 'Password changed successfully' }
      Router.push({pathname: '/login', query})
    }).catch(mapErrors)
}

const validate = (values) => {
  const errors = {}

  if (!values.password) {
    errors.password = 'New password is required'
  }

  if (values.password && values.password.length < 6) {
    errors.password = 'Password is too short (minimum is 6 characters)'
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Must confirm new password'
  }

  if (values.passwordConfirmation && values.password && values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'Passwords must match'
  }

  return errors
}


let ResetPasswordContainer = ({ changePassword, resetToken }) => (
  <Form
    component={ResetPasswordForm}
    onSubmit={onSubmit(changePassword, resetToken)}
    validate={validate}
  />
)


ResetPasswordContainer = connect(null, { changePassword: changePassword })(ResetPasswordContainer)

export default ResetPasswordContainer
