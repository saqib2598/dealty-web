import { FORM_ERROR } from 'final-form'
import PropTypes from 'prop-types'
import React from 'react'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import AcceptInvitationForm from '../../components/users/AcceptInvitationForm'
import { mapFinalFormErrors } from '../../lib/utils'
import { acceptInvitation, retrieveInvitedUser, selectInvitedUser } from '../../modules/users'
import { Router } from '../../routes'

const mapErrors = mapFinalFormErrors('Failed to set password')

const mapDispatchToProps = { acceptInvitation, retrieveInvitedUser, selectInvitedUser }

const mapStateToProps = state => ({
  me: state.users.me,
  invitedUser: selectInvitedUser(state)
})

class AcceptInvitationFormContainer extends React.Component {

  validate = (values) => {
    const errors = {}

    if (!values.password) {
      errors.password = 'Password is required'
    }

    if (!values.passwordConfirmation) {
      errors.passwordConfirmation = 'Confirm Password is required'
    }
    else if (values.password !== values.passwordConfirmation) {
      errors.passwordConfirmation = 'Passwords must match'
    }

    return errors
  }

  async componentDidMount(){
    const { invitationToken , retrieveInvitedUser } = this.props
    let invitedUser = null
    try{
      invitedUser = await retrieveInvitedUser(invitationToken)
    }
    catch(error){
      if(invitedUser == null){
        Router.pushRoute(`/invitation-greeting`)
      }
    }
  }

  onSubmit = (values) => {
    const { invitedUser, acceptInvitation, invitationToken } = this.props
    values.marketed_by = 'email/text'
    values['sellerAttributes'] = { id: invitedUser && invitedUser.seller && invitedUser.seller.id,  sellerType: values.sellerType,
      brokerageName: values.brokerageName }
    if(values.state || values.agentLicenseNumber){
      values.sellerAttributes['sellerDetailsAttributes'] = [{state: values.state, agentLicenseNumber: values.agentLicenseNumber}]
    }
    acceptInvitation({
        invitationToken,
        ...values
      })
      .then(() => Router.pushRoute('/congrats'))
      .catch((error) => {
        const formErrors = mapErrors(error)
        if (formErrors.invitationToken) {
          // Use invitation token error as main error if it exists
          formErrors[FORM_ERROR] = formErrors.invitationToken
        }
        return formErrors
      })
    }

  render() {
    return(
      <Form
        component={AcceptInvitationForm}
        onSubmit={this.onSubmit}
        validate={this.validate}
      />
    )
  }
}

AcceptInvitationFormContainer.propTypes = {
  invitationToken: PropTypes.string.isRequired,
}

AcceptInvitationFormContainer = connect(mapStateToProps, mapDispatchToProps)(AcceptInvitationFormContainer)

export default AcceptInvitationFormContainer
