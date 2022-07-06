import Head from 'next/head'
import React from 'react'
import { Container } from 'reactstrap'
import Layout from '../../components/Layout'
import SubheaderPageTitle from '../../components/SubheaderPageTitle'
import SellerProfileContainer from '../../containers/seller/SellerProfileContainer'

const ShowSellerListing= ({sellerId}) => (
  <Layout headerStyle="teal" bodyBg="light" footerStyle="white">
    <Head>
      <title>Lister Profile </title>
    </Head>
    <SubheaderPageTitle title="Lister Profile"/>
    <div className="sellerInfo">
      <SellerProfileContainer sellerId={sellerId} />
    </div>
  </Layout>
)

ShowSellerListing.getInitialProps = async ({ query }) => {
  return {
    sellerId: query.sellerId
  }
}

export default ShowSellerListing
