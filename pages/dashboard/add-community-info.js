import Head from 'next/head'
import React from 'react'
import { Container } from 'reactstrap'
import Layout from '../../components/Layout'
import SubheaderPageTitle from '../../components/SubheaderPageTitle'
import CommunityInformationContainer from '../../containers/dashboard/CommunityInformationContainer'
import requireAuth from '../../lib/requireAuth'

const AddCommunityInformation= ({propertyId}) => (
  <Layout headerStyle="teal" bodyBg="light" footerStyle="white">
    <Head>
      <title>Upload Community Information | Dealty</title>
    </Head>
    <SubheaderPageTitle title="Upload Community Information"/>
    <Container fluid>
      <div className="wrapper">
        <CommunityInformationContainer propertyId={propertyId} type="community_information" />
      </div>
    </Container>
  </Layout>
)

AddCommunityInformation.getInitialProps = async ({ query }) => {
  return {
    propertyId: query.propertyId
  }
}
export default requireAuth(AddCommunityInformation)
