import React from 'react'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import RegisterForm from '../../components/users/RegisterForm'
import { signUp } from '../../modules/users'
import { mapFinalFormErrors } from '../../lib/utils'
import { Router } from '../../routes'

const mapErrors = mapFinalFormErrors('Failed to create account')

const mapDispatchToProps = { signUp }

const mapStateToProps = state => ({
  me: state.users.me,
  activeListing: state.listings.activeListing
})

class RegisterContainer extends React.Component {

  onSubmit = async (values) => {
    const { signUp } = this.props
    let params = {}
    values.marketedBy = values.marketedBy === 'other' ? values.marketedSource : values.marketedBy
    if (values.userType === "buyer"){
      try {
        params = {
          ...values,
          buyerAttributes: {
            lenderName: (values.lenderPrequalified == 'true' ? values.lenderName : ''),
            leaderContact: (values.lenderPrequalified == 'true' ? values.lenderContact : ''),
            lenderPrequalified: values.lenderPrequalified,
          }
        }
        await signUp(params)
        Router.push('/congrats')
      } catch (error) {
          return mapErrors(error)
      }
    }
    else if (values.userType === "seller"){
      params = {
        ...values,
        sellerAttributes: {
          sellerType: values.sellerType,
          brokerageName: values.brokerageName,
        }
      }
      if(values.state || values.agentLicenseNumber){
        params.sellerAttributes['sellerDetailsAttributes'] = [{state: values.state, agentLicenseNumber: values.agentLicenseNumber}]
      }
      return signUp(params)
        .then((user) => {
          Router.push('/congrats')
        })
        .catch(mapErrors)
      }
    else if (values.userType === "loan-officer") {
      try {
        const params = {
          ...values,
          loanOfficerAttributes: {
            bio: values.bio,
            company: values.company,
            lisence: values.lisence
          }
        }
        await signUp(params)
        if(localStorage.getItem("redirectUrl")){
          Router.pushRoute(localStorage.getItem("redirectUrl"))
          localStorage.removeItem("redirectUrl")
        }
        else{
          Router.push('/congrats')
        }
      } catch (error) {
          return mapErrors(error)
      }
    }
  }

  validate = (values) => {
    const errors = {}

    if (values.password && values.password.length < 6) {
      errors.password = 'Password is too short (minimum is 6 characters)'
    }

    return errors
  }

  render() {

    return (
      <Form
        component={RegisterForm}
        onSubmit={this.onSubmit}
        validate={this.validate}
      />
    )
  }
}

RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)

export default RegisterContainer
