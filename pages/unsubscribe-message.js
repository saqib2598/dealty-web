import Head from 'next/head'
import React, { Component } from 'react'
import HousePatternSvg from '../components/HousePattern'
import Layout from '../components/Layout'
import PropTypes from 'prop-types'
class UnsubscribeMessage extends Component {

	render() {
        const { unsubscribed } = this.props
    
    return (
      <Layout headerStyle="none" bodyBg="teal" footerStyle="teal">
		<Head>
          <title>Unsubscribe Email</title>
        </Head>
        <div className="center">
          <div className="wrapper lg">
            {unsubscribed == 'true' ?
              <>
                <h2>You Have Successfully Unsubscribed from Dealty E-mails.</h2>
                <h3>If you wish to subscribe again, please contact <a href="mailto:hello@yourdealy.com">hello@yourdealty.com</a></h3>
              </>
              :
              <>
                <h3>An Error Occured, Please Try Again Later</h3>
              </>
            }
          </div>
        </div>
        <HousePatternSvg />
      </Layout>
	)
	}
}

UnsubscribeMessage.getInitialProps = ({ query }) => ({
  unsubscribed: query.unsubscribed,
})

UnsubscribeMessage.propTypes = {
  unsubscribed: PropTypes.string.isRequired
}


export default UnsubscribeMessage
