import Head from 'next/head'
import React from 'react'
import HousePatternSvg from '../../components/HousePattern'
import Layout from '../../components/Layout'
import ListingPendingContainer from '../../containers/dashboard/ListingPendingContainer'
import requireAuth from '../../lib/requireAuth'

const ListingPending = ({propertyId}) => (
  <Layout headerStyle="dark" bodyBg="dark" footerStyle="dark">
    <Head>
      <title>Your Listing is Pending... | Dealty</title>
    </Head>
    <div className="center">
      <div className="pt-4 mx-auto">
        <ListingPendingContainer propertyId={propertyId}/>
      </div>
    </div>
    <HousePatternSvg />
  </Layout>
)

ListingPending.getInitialProps = async ({ query }) => {
  return {
    propertyId: query.propertyId
  }
}

export default requireAuth(ListingPending)
