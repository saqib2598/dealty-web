import Head from 'next/head'
import React, { Component } from 'react'
import { Alert } from 'reactstrap'
import HousePatternSvg from '../components/HousePattern'
import Layout from '../components/Layout'
import ResetPasswordContainer from '../containers/users/ResetPasswordContainer'

class ResetPassword extends Component {

	render() {
    const { resetToken } = this.props

    return (
      <Layout headerStyle="none" bodyBg="teal" footerStyle="teal">
				<Head>
          <title>Reset Password</title>
        </Head>
        <div className="center">
          <div className="wrapper sm">
            {!resetToken && ( <Alert color="danger" className="text-center">Missing password reset token</Alert> )}
            <ResetPasswordContainer resetToken={resetToken} />
          </div>
        </div>
        <HousePatternSvg />
			</Layout>
		)
	}
}

ResetPassword.getInitialProps = ({ query }) => ({
  resetToken: query.reset_password_token,
})

export default ResetPassword
