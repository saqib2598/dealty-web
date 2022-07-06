import Head from 'next/head'
import React from 'react'
import { Container } from 'reactstrap'
import Layout from '../../components/Layout'
import SubheaderPageTitle from '../../components/SubheaderPageTitle'
import UploadDocumentsContainer from '../../containers/dashboard/UploadDocumentsContainer'
import requireAuth from '../../lib/requireAuth'

const AddFloorPlans = ({propertyId}) => (
  <Layout headerStyle="teal" bodyBg="light" footerStyle="white">
    <Head>
      <title>Upload Floor Plans | Dealty</title>
    </Head>
    <SubheaderPageTitle title="Upload Floor Plans"/>
    <Container fluid>
      <div className="wrapper">
        <UploadDocumentsContainer propertyId={propertyId} type="floor_plan" />
      </div>
    </Container>
  </Layout>
)

AddFloorPlans.getInitialProps = async ({ query }) => {
  return {
    propertyId: query.propertyId
  }
}
export default requireAuth(AddFloorPlans)
