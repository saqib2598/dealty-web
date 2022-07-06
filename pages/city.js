import Head from 'next/head'
import React from 'react'
import CityContainer from '../containers/location/CityContainer'
import Layout from '../components/Layout'
import { requireEnvVar } from '../lib/utils'
import PropTypes from 'prop-types'

class City extends React.PureComponent {

  render() {
    const { data, query } = this.props
    return (
      <Layout headerStyle="teal" bodyBg="light" footerStyle="white">
        {data &&
          <Head>
            <title>{data.head_title}</title>
            <meta name="title" content={data.head_title} />
            <meta name="description" content={data.head_body} />
            <meta name="keywords" content={data.head_title} />
            <meta property="og:title" content={data.head_title} />
            <meta property="og:image" content={data.image} />
            <meta property="og:image:secure_url" content={data.image} />
            <meta property="og:image:width" content="640" />
            <meta property="og:image:height" content="442" />
            <meta property="og:description" content={data.head_body} />
          </Head>
        }
        <CityContainer location={query} />
      </Layout>
    )
  }

  static async getInitialProps({ query }) {
    let data = null
    try {
      const apiUrl = requireEnvVar('API_SERVER')
      const res = await fetch(`${apiUrl}/api/v1/states/${query.state}/cities/${query.city}`)
      data = await res.json()
    } catch {
      data = null
    }
    let props = {
      data: data,
      query: query
    }
    return props
  }
}

City.propTypes = {
  query: PropTypes.object,
  data: PropTypes.object,
}

export default City
