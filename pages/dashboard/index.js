import Head from 'next/head'
import React from 'react'

import Layout from '../../components/Layout'
import DashboardContainer from '../../containers/dashboard/DashboardContainer'
import requireAuth from '../../lib/requireAuth'

const Dashboard = () => (
  <Layout bodyBg="light" headerStyle="teal" footerStyle="white">
    <Head>
      <title>Dashboard | Dealty</title>
    </Head>
    <div className="dashboard">
    <DashboardContainer />
    </div>
  </Layout>
)

export default requireAuth(Dashboard)
