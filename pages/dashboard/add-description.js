import Head from 'next/head'
import React from 'react'
import { Container } from 'reactstrap'
import Layout from '../../components/Layout'
import SubheaderPageTitle from '../../components/SubheaderPageTitle'
import CommunityInformationContainer from '../../containers/dashboard/CommunityInformationContainer'
import requireAuth from '../../lib/requireAuth'

const AddDescription= ({propertyId}) => (
  <Layout headerStyle="teal" bodyBg="light" footerStyle="white">
    <Head>
      <title>Upload Description | Dealty</title>
    </Head>
    <SubheaderPageTitle title="Upload Description"/>
    <Container fluid>
      <div className="wrapper">
        <CommunityInformationContainer propertyId={propertyId} type="description" />
      </div>
    </Container>
  </Layout>
)

AddDescription.getInitialProps = async ({ query }) => {
  return {
    propertyId: query.propertyId
  }
}
export default requireAuth(AddDescription)
