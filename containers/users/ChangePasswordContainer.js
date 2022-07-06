import React from 'react'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import ChangePasswordForm from '../../components/users/ChangePasswordForm'
import { mapFinalFormErrors } from '../../lib/utils'
import { updatePassword, retrieveUser, selectUser } from '../../modules/users'

const mapDispatchToProps = { updatePassword, retrieveUser }

const mapStateToProps = (state) => ({
  user: selectUser(state)
});

const mapErrors = mapFinalFormErrors('Failed to change password')

class ChangePasswordContainer extends React.Component {
  state = {
    alert: null,
    visible:false,
  }

  componentDidMount() {
    const { retrieveUser } = this.props
    retrieveUser()
  }

  closeAlertLater = (val) => {
    this.setState({ visible: true }, ()=>{
      setTimeout(() =>{
        this.setState({ visible: false })
      }, 3000)
    });
  }

  onSubmit = async(values) => {
    
    const { updatePassword } = this.props

    try{
      await updatePassword(values)
      this.setState ({ alert: 'Password updated successfully!' })
      this.closeAlertLater('success')
    }catch (error) {
      return mapErrors(error)
    }
  }

  validate = (values) => {
    const errors = {}
    
    if (!values.currentPassword) {
      errors.currentPassword = 'Current password is required'
    }

    if (values.password && values.password.length < 6) {
      errors.password = 'Password is too short (minimum is 6 characters)'
    }

    if (!values.password) {
      errors.password = 'New Password is required'
    }

    if (!values.passwordConfirmation) {
      errors.passwordConfirmation = 'Must confirm new password'
    }

    if (values.passwordConfirmation && values.password && values.password !== values.passwordConfirmation) {
      errors.passwordConfirmation = 'Passwords must match'
    }

    return errors
  }

  render() {
    const { alert, visible } = this.state
    const { user } = this.props

    return (
      <Form
        component={ChangePasswordForm}
        onSubmit={this.onSubmit}
        validate={this.validate}
        alert={alert}
        visible={visible}
        {...this.props}
        user={user}
      />
    )
  }
}


ChangePasswordContainer = connect(mapStateToProps, mapDispatchToProps)(ChangePasswordContainer)

export default ChangePasswordContainer
