import Head from 'next/head'
import React from 'react'
import Layout from '../../components/Layout'
import requireAuth from '../../lib/requireAuth'
import QuestionContainer from '../../containers/dashboard/QuestionContainer'

import questions from '../../data/otherHomeUpdates.json'

const OtherHomeUpdates = ({propertyId}) => (
  <Layout headerStyle="teal" bodyBg="light" footerStyle="white">
    <Head>
      <title>Other Home Updates | Dealty</title>
    </Head>
    <QuestionContainer
      title='Other Home Updates'
      icon='icon-other'
      questions={questions}
      category='other_home_updates_count'
      propertyId={propertyId}
    />
  </Layout>
)

OtherHomeUpdates.getInitialProps = async ({ query }) => {
  return {
    propertyId: query.propertyId
  }
}

export default requireAuth(OtherHomeUpdates)