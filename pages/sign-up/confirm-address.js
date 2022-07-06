import Head from 'next/head'
import React from 'react'
import Layout from '../../components/Layout'
import ConfirmAddressContainer from '../../containers/users/ConfirmAddressContainer'
import requireAuth from '../../lib/requireAuth'

const ConfirmAddress = () => (
  <Layout headerStyle="none" bodyBg="dark" footerStyle="dark">
    <Head>
      <title>Confirm Address | Dealty</title>
    </Head>
    <div className="wrapper">
      <ConfirmAddressContainer />
    </div>
  </Layout>
)

export default requireAuth(ConfirmAddress)