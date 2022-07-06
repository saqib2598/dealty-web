import Head from 'next/head'
import React from 'react'
import Layout from '../../components/Layout'
import requireAuth from '../../lib/requireAuth'
import QuestionContainer from '../../containers/dashboard/QuestionContainer'
import questions from '../../data/homeInfoQuestions.json'
import PropTypes from 'prop-types'

const ConfirmHomeInfo = ({propertyId}) => (
  <Layout headerStyle="teal" bodyBg="light" footerStyle="white">
    <Head>
      <title>Confirm Home Info | Dealty</title>
    </Head>
    <QuestionContainer
      title='Confirm Home Info'
      icon='icon-home-info'
      questions={questions}
      category='confirm_home_info_count'
      propertyId={propertyId}
    />
  </Layout>
)

ConfirmHomeInfo.getInitialProps = async ({ query }) => {
  return {
    propertyId: query.propertyId
  }
}

ConfirmHomeInfo.propTypes = {
  propertyId: PropTypes.string.isRequired
}

export default requireAuth(ConfirmHomeInfo)
