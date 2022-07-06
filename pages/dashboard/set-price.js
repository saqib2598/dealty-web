import Head from 'next/head'
import React from 'react'
import HousePatternSvg from '../../components/HousePattern'
import Layout from '../../components/Layout'
import SetPriceContainer from '../../containers/dashboard/SetPriceContainer'
import requireAuth from '../../lib/requireAuth'
import PropTypes from 'prop-types'

const SetPrice = ({propertyId}) => (
  <Layout headerStyle="teal" bodyBg="teal" footerStyle="teal">
    <Head>
      <title>List Your Home | Dealty</title>
    </Head>
    <div className="center">
      <div className="wrapper">
        <SetPriceContainer propertyId={propertyId}/>
      </div>
    </div>
    <HousePatternSvg />
  </Layout>
)

SetPrice.getInitialProps = async ({ query }) => {
  return {
    propertyId: query.propertyId
  }
}

SetPrice.propTypes = {
  propertyId: PropTypes.string.isRequired
}

export default requireAuth(SetPrice)
