import Head from 'next/head';
import React from 'react';
import Layout from '../../../components/Layout';
import requireAuth from '../../../lib/requireAuth';
import SubheaderPageTitle from '../../../components/SubheaderPageTitle';
import FavoriteContainer from '../../../containers/dashboard/FavoriteContainer';

const Favorite = () => (
  <Layout isBuyer={true} headerStyle="default" bodyBg="grey">
    <Head>
      <title>Favorite | Dealty</title>
    </Head>
    <SubheaderPageTitle title="Favorite Properties" color="white" headerColor = "#007793" />
    <FavoriteContainer />
  </Layout>
);

export default requireAuth(Favorite);
