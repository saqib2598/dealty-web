import Head from 'next/head'
import React from 'react'
import Layout from '../../components/Layout'
import SubheaderPageTitle from '../../components/SubheaderPageTitle'
import SavedHomesContainer  from '../../containers/dashboard/SavedHomesContainer'
import requireAuth from '../../lib/requireAuth'

const SavedSearches = () => (
  <Layout bodyBg="light" headerStyle="teal" footerStyle="white">
    <Head>
      <title>Saved Searches | Dealty</title>
    </Head>
    <SubheaderPageTitle title="Saved Searches" />
    <SavedHomesContainer />
  </Layout>
)

export default requireAuth(SavedSearches)
