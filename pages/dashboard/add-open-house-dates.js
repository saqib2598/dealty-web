import Head from 'next/head'
import React from 'react'
import { Container } from 'reactstrap'
import Layout from '../../components/Layout'
import SubheaderPageTitle from '../../components/SubheaderPageTitle'
import OpenHouseDatesContainer from '../../containers/dashboard/OpenHouseDatesContainer'
import requireAuth from '../../lib/requireAuth'

const AddOpenHouseDates= ({propertyId}) => (
  <Layout headerStyle="teal" bodyBg="light" footerStyle="white">
    <Head>
      <title>Upload Description | Dealty</title>
    </Head>
    <SubheaderPageTitle title="Add Open House Dates"/>
    <Container fluid>
      <div className="wrapper" style={{maxWidth: '650px'}}>
        <OpenHouseDatesContainer propertyId={propertyId} />
      </div>
    </Container>
  </Layout>
)

AddOpenHouseDates.getInitialProps = async ({ query }) => {
  return {
    propertyId: query.propertyId
  }
}
export default requireAuth(AddOpenHouseDates)
