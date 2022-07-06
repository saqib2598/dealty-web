import Head from 'next/head'
import React from 'react'
import Layout from '../components/Layout'
import ForgotPasswordFormContainer from '../containers/users/ForgotPasswordFormContainer'
import HousePatternSvg from '../components/HousePattern'

const ForgotPassword = () => (
  <Layout headerStyle="none" bodyBg="teal" footerStyle="teal">
    <Head>
      <title>Forgot Password</title>
    </Head>
    <div className="center">
      <div className="wrapper sm">
        <ForgotPasswordFormContainer />
      </div>
    </div>
    <HousePatternSvg />
  </Layout>
)

export default ForgotPassword