import Head from 'next/head'
import React from 'react'
import Layout from '../../components/Layout'
import SubheaderPageTitle from '../../components/SubheaderPageTitle'
import AddNewPropertyContainer from '../../containers/seller/AddNewPropertyContainer'
import requireAuth from '../../lib/requireAuth'

const AddNewProperty = () => (
  <Layout headerStyle="teal" bodyBg="light" footerStyle="white">
    <Head>
      <title>Add New Property | Dealty</title>
    </Head>
    <SubheaderPageTitle title="Add New Property"/>
    <div className="wrapper">
      <AddNewPropertyContainer />
    </div>
  </Layout>
)

export default requireAuth(AddNewProperty)