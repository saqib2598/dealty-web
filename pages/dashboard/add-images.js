import Head from 'next/head'
import React from 'react'
import { Container } from 'reactstrap'
import Layout from '../../components/Layout'
import SubheaderPageTitle from '../../components/SubheaderPageTitle'
import UploadImagesContainer from '../../containers/dashboard/UploadImagesContainer'
import requireAuth from '../../lib/requireAuth'

const AddImages = ({propertyId}) => (
  <Layout headerStyle="teal" bodyBg="light" footerStyle="white">
    <Head>
      <title>Upload Images | Dealty</title>
    </Head>
    <SubheaderPageTitle title="Upload Images"/>
    <Container fluid>
      <div className="wrapper">
        <UploadImagesContainer propertyId={propertyId} />
      </div>
    </Container>
  </Layout>
)

AddImages.getInitialProps = async ({ query }) => {
  return {
    propertyId: query.propertyId
  }
}

export default requireAuth(AddImages)
