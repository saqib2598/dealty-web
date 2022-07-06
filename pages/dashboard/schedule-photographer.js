import Head from 'next/head'
import React from 'react'
import { Container } from 'reactstrap'
import Layout from '../../components/Layout'
import SubheaderPageTitle from '../../components/SubheaderPageTitle'
import SchedulePhotographerContainer from '../../containers/dashboard/SchedulePhotographerContainer'
import requireAuth from '../../lib/requireAuth'

const SchedulePhotographer = ({propertyId}) => (
  <Layout headerStyle="teal" bodyBg="light" footerStyle="white">
    <Head>
      <title>Schedule Photographer | Dealty</title>
    </Head>
    <SubheaderPageTitle title="Schedule Photographer"/>
    <Container fluid>
      <div className="wrapper">
        <SchedulePhotographerContainer propertyId={propertyId} />
      </div>
    </Container>
  </Layout>
)

SchedulePhotographer.getInitialProps = async ({ query }) => {
  return {
    propertyId: query.propertyId
  }
}

export default requireAuth(SchedulePhotographer)
