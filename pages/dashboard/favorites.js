import Head from 'next/head'
import React from 'react'
import Layout from '../../components/Layout'
import SubheaderPageTitle from '../../components/SubheaderPageTitle'
import FavoriteContainer from '../../containers/dashboard/FavoriteContainer'
import requireAuth from '../../lib/requireAuth'

const Favorites = () => (
  <Layout bodyBg="light" headerStyle="teal" footerStyle="white">
    <Head>
      <title>Favorite | Dealty</title>
    </Head>
    <SubheaderPageTitle title="Favorite Properties" />
    <FavoriteContainer />
  </Layout>
)

export default requireAuth(Favorites)
