import Head from 'next/head'
import React from 'react'
import Layout from '../../components/Layout'
import PropertyDetailContainer from '../../containers/dashboard/PropertyDetailContainer'
import requireAuth from '../../lib/requireAuth'

const PropertyDashboard = ({ propertyId }) => (
  <Layout bodyBg="light" headerStyle="teal" footerStyle="white">
    <Head>
      <title>Property Dashboard | Dealty</title>
    </Head>
    <div className="dashboard">
      <PropertyDetailContainer propertyId={propertyId}/>
    </div>
  </Layout>
)

PropertyDashboard.getInitialProps = async ({ query }) => {
  return {
    propertyId: query.propertyId
  }
}

export default requireAuth(PropertyDashboard)