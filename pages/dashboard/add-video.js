import Head from 'next/head'
import React from 'react'
import { Container } from 'reactstrap'
import Layout from '../../components/Layout'
import SubheaderPageTitle from '../../components/SubheaderPageTitle'
import UploadVideoContainer from '../../containers/dashboard/UploadVideoContainer'
import requireAuth from '../../lib/requireAuth'

const AddVideo = ({propertyId}) => (
  <Layout headerStyle="teal" bodyBg="light" footerStyle="white">
    <Head>
      <title>Upload Video | Dealty</title>
    </Head>
    <SubheaderPageTitle title="Upload Video"/>
    <Container fluid>
      <div className="wrapper">
        <UploadVideoContainer propertyId={propertyId} />
      </div>
    </Container>
  </Layout>
)

AddVideo.getInitialProps = async ({ query }) => {
  return {
    propertyId: query.propertyId
  }
}

export default requireAuth(AddVideo)
