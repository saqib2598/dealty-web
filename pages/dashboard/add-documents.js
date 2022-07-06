import Head from 'next/head'
import React from 'react'
import { Container } from 'reactstrap'
import Layout from '../../components/Layout'
import SubheaderPageTitle from '../../components/SubheaderPageTitle'
import UploadDocumentsContainer from '../../containers/dashboard/UploadDocumentsContainer'
import requireAuth from '../../lib/requireAuth'

const AddDocuments = ({propertyId}) => (
  <Layout headerStyle="teal" bodyBg="light" footerStyle="white">
    <Head>
      <title>Upload Documents | Dealty</title>
    </Head>
    <SubheaderPageTitle title="Upload Documents"/>
    <Container fluid>
      <div className="wrapper">
        <UploadDocumentsContainer propertyId={propertyId}  type="document"/>
      </div>
    </Container>
  </Layout>
)

AddDocuments.getInitialProps = async ({ query }) => {
  return {
    propertyId: query.propertyId
  }
}
export default requireAuth(AddDocuments)
