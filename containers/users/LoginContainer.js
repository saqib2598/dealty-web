import React from 'react'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import LoginForm from '../../components/users/LoginForm'
import { mapFinalFormErrors } from '../../lib/utils'
import { signIn, USER_HOME_PATH, retrieveUser } from '../../modules/users'
import { Router } from '../../routes'
import { Alert } from 'reactstrap'
import { withRouter } from 'next/router'
import { retrieveActiveListing } from '../../modules/listings'
import { isSignedIn } from '../../lib/session'
import FSRecordVars from '../../components/RecordFullStory'

const mapErrors = mapFinalFormErrors('Failed to sign in')

const mapDispatchToProps = { signIn, retrieveUser, retrieveActiveListing }

const mapStateToProps = state => ({
  me: state.users.me,
  activeListing: state.listings.activeListing
})

class LoginContainer extends React.Component {

  componentWillReceiveProps = async(nextProps) => {
    if (nextProps.me.id && typeof nextProps.activeListing == 'undefined' && isSignedIn() && nextProps.me.seller) {
      await this.props.retrieveActiveListing();
    } else if (isSignedIn() && nextProps.me.loanOfficer) {
      Router.pushRoute(`/`)
    } else if (isSignedIn() && nextProps.me.buyer) {
      Router.pushRoute(`/buy`)
    } else if (isSignedIn() && nextProps.activeListing) {
      Router.pushRoute(`/dashboard`)
    }
  }

  onSubmit = (values) => {
    const { signIn, retrieveUser, retrieveActiveListing } = this.props

    return signIn(values)
      .then(() => retrieveUser())
      .then((user) => (isSignedIn() && FSRecordVars(user) && user.seller && user.seller.listings && user.seller.listings.length != 0) && retrieveActiveListing())
      .then((id) => {
        let ref = localStorage.getItem('forwardTo')
        localStorage.removeItem('forwardTo')
        if(ref){
          Router.pushRoute(ref)
        }
        else if (id) {
          Router.pushRoute(`/dashboard`)
        } else {
          if (this.props.me.buyer) {
            return Router.replaceRoute('/buy')
          } else if (this.props.me.seller) {
            return Router.replaceRoute('/dashboard')
          }
            else if (this.props.me.loanOfficer) {
            Router.pushRoute('/')
          } else if (!this.props.me.buyer) {
            Router.pushRoute(USER_HOME_PATH)
          }
        }
      })
      .then(() => window.scrollTo(0, 0))
      .catch(mapErrors)
  }

  validate = (values) => {
    const errors = {}

    if (!values.email) {
      errors.email = 'Email is required'
    }

    if (!values.password) {
      errors.password = 'Password is required'
    }

    return errors
  }

  render() {
    const { error, message } = this.props.router.query

    return (
      <>
        {error && <Alert color="danger" className="text-center">{error}</Alert>}
        {message && <Alert color="success" className="text-center">{message}</Alert>}
        <Form
          component={LoginForm}
          onSubmit={this.onSubmit}
          validate={this.validate}
        />
      </>
    )
  }

}

LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginContainer)

export default withRouter(LoginContainer)
