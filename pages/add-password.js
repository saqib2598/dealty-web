import Head from 'next/head'
import React, { Component } from 'react'
import { Alert } from 'reactstrap'
import HousePatternSvg from '../components/HousePattern'
import Layout from '../components/Layout'
import PropTypes from 'prop-types'
import AddPasswordContainer from '../containers/users/AddPasswordContainer'

class AddPassword extends Component {

  render() {
    const { resetToken, userId } = this.props

    return (
      <Layout headerStyle="none" bodyBg="teal" footerStyle="teal">
        <Head>
          <title>Add New Password</title>
        </Head>
        <div className="center">
          <div className="wrapper sm">
            {!resetToken && (<Alert color="danger" className="text-center">Missing password reset token</Alert>)}
            <AddPasswordContainer
              resetToken={resetToken}
              userId={userId}
            />
          </div>
        </div>
        <HousePatternSvg />
      </Layout>
    )
  }
}

AddPassword.getInitialProps = ({ query }) => ({
  resetToken: query.reset_password_token,
  userId: query.user_id
})

AddPassword.propTypes = {
  resetToken: PropTypes.object.isRequired,
  userId: PropTypes.object.isRequired
}

export default AddPassword
