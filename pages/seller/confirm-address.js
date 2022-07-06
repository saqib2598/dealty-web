import Head from 'next/head'
import React from 'react'
import Layout from '../../components/Layout'
import SubheaderPageTitle from '../../components/SubheaderPageTitle'
import ConfirmNewAddressContainer from '../../containers/seller/ConfirmNewAddressContainer'
import requireAuth from '../../lib/requireAuth'

const ConfirmAddress = () => (
  <Layout headerStyle="teal" bodyBg="light" footerStyle="white">
    <Head>
      <title>Confirm Address | Dealty</title>
    </Head>
    <SubheaderPageTitle title="Confirm Address"/>
    <div className="wrapper">
      <ConfirmNewAddressContainer />
    </div>
  </Layout>
)

export default requireAuth(ConfirmAddress)