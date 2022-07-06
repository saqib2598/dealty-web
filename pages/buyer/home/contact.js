import Head from 'next/head'
import React from 'react'
import Layout from '../../../components/Layout'
import requireAuth from '../../../lib/requireAuth'
import ContactContainer from '../../../containers/buyer/home/ContactContainer'

const Contact = () => (
  <Layout isBuyer={true} headerStyle="default" bodyBg="grey">
    <Head>
      <title>Contact | Dealty</title>
    </Head>
    <ContactContainer />
  </Layout>
)

export default requireAuth(Contact)