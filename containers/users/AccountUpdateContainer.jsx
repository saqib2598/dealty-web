import React, { PureComponent } from 'react'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import MyAccountUpdateForm from '../../components/users/MyAccountUpdateForm'
import { selectUser, updateProfile, retrieveUser } from '../../modules/users'
import { mapFinalFormErrors } from '../../lib/utils'
import PropTypes from 'prop-types'

const mapErrors = mapFinalFormErrors('Failed to update account')

const mapStateToProps = state => ({
  user: selectUser(state),
})

const mapDispatchToProps = { updateProfile, retrieveUser }

let AccountUpdateContainer = class AccountUpdateContainer extends PureComponent {
  state = {
    alert: null,
    confirmation: null
  }

  componentDidMount(){
    const {unconfirmedEmail} = this.props.user
    if(unconfirmedEmail){
      this.setUnconfirmedEmail(unconfirmedEmail)
    }
  }

  onSubmit = values => {
    const { updateProfile, retrieveUser, toggleUpdateAccountModal, user } = this.props
    const updatedUser = {user: { ...values }}

    return updateProfile(updatedUser, user.id)
      .then(() => {
        retrieveUser()
        this.setState ({alert: 'Account updated successfully!'})
        const {unconfirmedEmail} = this.props.user
        if(unconfirmedEmail){
          this.setUnconfirmedEmail(unconfirmedEmail)
        } else {
          toggleUpdateAccountModal()
        }
      })
      .catch(mapErrors)
  }

  setUnconfirmedEmail = unconfirmedEmail => {
    if(unconfirmedEmail){
      this.setState({
        confirmation: `We've sent you a confirmation email to ${unconfirmedEmail}, Please confirm email to continue or update email if it is wrong address`
      })
    }
  }

  render() {
    const { user } = this.props
    const { alert, confirmation } = this.state

    const initialValues = {
      email: '',
      firstName: user.firstName != 'dealty' && user.firstName || '',
      lastName: user.lastName != 'user' && user.lastName || '',
      password: '',
      passwordConfirmation: ''
    }

    return (
      <>
        <Form
          component={MyAccountUpdateForm}
          onSubmit={this.onSubmit}
          initialValues={initialValues}
          alert={alert}
          confirmation={confirmation}
          {...this.props}
        />
        <style jsx="true">{`
          h3{
            margin: 0 0 20px 0;
          }
          p{
            font-size:18px;
          }
          .map-image{
            display:block;
            height: 265px;
            width: 100%;
            margin: 0 0 35px 0;
            overflow:hidden;
          }
        `}</style>
      </>
    )
  }
}

AccountUpdateContainer.propTypes = {
  updateProfile: PropTypes.func,
  retrieveUser: PropTypes.func,
  toggleUpdateAccountModal: PropTypes.func,
  user: PropTypes.object
}

AccountUpdateContainer = connect(mapStateToProps, mapDispatchToProps)(AccountUpdateContainer)

export default AccountUpdateContainer
