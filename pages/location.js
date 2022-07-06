import React from 'react'
import { Helmet } from 'react-helmet'

import Layout from '../components/Layout'
import LocationContainer from '../containers/location/LocationContainer'


class Location extends React.PureComponent {
  render() {

    const seoTtitle = 'Your Personal Real Estate GPS for Buying and Selling Homes'
    const seoDescription = `Browse through the most comprehensive nation-wide online portal
    for real estate listings. Updated in real time, our location-wise home directory enables
    you to navigate across the USA and search for verified property listings in a jiffy.`

    return (
      <Layout headerStyle="teal" bodyBg="light" footerStyle="white">
        <Helmet>
          <title>{seoTtitle}</title>
          <meta name="title" content={seoTtitle} />
          <meta name="description" content={seoDescription} />
          <meta name="keywords" content={seoTtitle} />
          <meta property="og:title" content={seoTtitle} />
          <meta property="og:image:width" content="640" />
          <meta property="og:image:height" content="442" />
          <meta property="og:description" content={seoDescription} />
          <link rel='canonical' href='https://yourdealty.com/location' />
        </Helmet>
        <LocationContainer />
      </Layout>
    )
  }
}

export default Location
