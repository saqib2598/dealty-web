import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loading from '../components/Loading'
import { emailConfirmation } from '../modules/users'
import NotificationPage from '../components/NotificationPage'
import PropTypes from 'prop-types'
import { Link } from '../routes'

const mapDispatchToProps = { emailConfirmation }

class ConfirmationPage extends Component {
  state = {
    loading: true,
    error: false,
    success: false
  }

  componentDidMount(){
    const { token, emailConfirmation } = this.props
    if (token) {
      emailConfirmation(token)
      .then(() => this.setState({success: true}))
      .catch(() => { this.setState({error: true}) })
    }
  }
  render(){
    const {loading, error, success} = this.state
    return(
      <div>
        { loading && <Loading /> }
        { error &&
          <NotificationPage
            wish="Oops!"
            message="Something went wrong, Please contact site administrator."
            regards="Thank you!" />
        }

        { success &&
          <NotificationPage
            wish="Congratulations!"
            message={<p>Your email has been confirmed, Please <Link href='/login'>Log in</Link> to continue</p>}
            regards="Thank you!" >
          </NotificationPage>
        }
      </div>
    )
  }
}

ConfirmationPage.getInitialProps = ({ query }) => ({
  token: query.token
})

ConfirmationPage.propTypes = {
  token: PropTypes.string.isRequired,
  emailConfirmation: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(ConfirmationPage)
