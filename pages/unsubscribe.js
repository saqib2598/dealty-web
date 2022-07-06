import Head from 'next/head'
import React, { Component } from 'react'
import { Alert } from 'reactstrap'
import HousePatternSvg from '../components/HousePattern'
import Layout from '../components/Layout'
import PropTypes from 'prop-types'
import UnsubscribeEmailContainer from '../containers/users/UnsubscribeEmailContainer'

class Unsubscribe extends Component {

	render() {
    const { uid } = this.props
    
    return (
      <Layout headerStyle="none" bodyBg="teal" footerStyle="teal">
		<Head>
          <title>Unsubscribe Email</title>
        </Head>
        <div className="center">
          <div className="wrapper md">
            {!uid && ( <Alert color="danger" className="text-center">Missing password reset token</Alert> )}
            <UnsubscribeEmailContainer uid={uid} />
          </div>
        </div>
        <HousePatternSvg />
      </Layout>
		)
	}
}

Unsubscribe.getInitialProps = ({ query }) => ({
  uid: query.uid,
})

Unsubscribe.propTypes = {
  uid: PropTypes.string.isRequired,
}

export default Unsubscribe
