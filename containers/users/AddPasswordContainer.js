import { Router } from '../../routes'
import React from 'react'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import AddNewPasswordForm from '../../components/users/AddNewPasswordForm'
import { mapFinalFormErrors } from '../../lib/utils'
import { changePassword, signIn, getGuestUser, guestUser } from '../../modules/users'
import PropTypes from 'prop-types'

const mapDispatchToProps = { changePassword, signIn, getGuestUser }
const mapStateToProps = (state) => ({
  guest_user: guestUser(state)
})

const mapErrors = mapFinalFormErrors('Failed to add password')
class AddPasswordContainer extends React.Component {
  state = {
    val: null
  }
  onSubmit = async(values) => {
    this.setState({val: values})
    const { changePassword, resetToken, userId, getGuestUser } = this.props
    const user = {
      ...values,
      reset_password_token: resetToken,
      user_id: userId
    }
    await changePassword(user)
      .then(() => {
        getGuestUser(user.user_id)
          .then(() => {
            this.loginGuestUser(this.state.val, this.props.guest_user.email)
            Router.push({
              pathname: "/add-user-info",
              query: user
            });
          })
      }).catch(mapErrors)
  }

  validate = (values) => {
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

  loginGuestUser = (pass, email) => {
    const { signIn } = this.props
    email !== undefined ? signIn({'email': email, 'password': pass.password}) : null
  }

  render() {

    return (
      <Form
      component={AddNewPasswordForm}
      onSubmit={this.onSubmit}
      validate={this.validate}
    />
    )
  }
}

AddPasswordContainer.propTypes = {
  changePassword: PropTypes.func.isRequired,
  resetToken: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  signIn: PropTypes.func.isRequired,
  getGuestUser: PropTypes.func.isRequired,
  guest_user: PropTypes.object.isRequired
}

AddPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(AddPasswordContainer)

export default AddPasswordContainer
