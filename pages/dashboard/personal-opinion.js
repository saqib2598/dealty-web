import Head from 'next/head'
import React from 'react'
import Layout from '../../components/Layout'
import requireAuth from '../../lib/requireAuth'
import QuestionContainer from '../../containers/dashboard/QuestionContainer'

import questions from '../../data/personalOpinion.json'

const PersonalOpinion = ({propertyId}) => (
  <Layout headerStyle="teal" bodyBg="light" footerStyle="white">
    <Head>
      <title>Personal Opinion | Dealty</title>
    </Head>
    <QuestionContainer
      title='Personal Opinion'
      icon='icon-opinion'
      questions={questions}
      category='personal_opinion_count'
      propertyId={propertyId}
    />
  </Layout>
)

PersonalOpinion.getInitialProps = async ({ query }) => {
  return {
    propertyId: query.propertyId
  }
}

export default requireAuth(PersonalOpinion)