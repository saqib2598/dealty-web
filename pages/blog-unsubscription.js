import Head from 'next/head'
import React from 'react'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import PropTypes from 'prop-types'
import { unSubscribeBlogs } from '../modules/blogs';

const mapDispatchToProps = { unSubscribeBlogs }

class BlogUnSubscription extends React.Component {

  async componentDidMount() {
    const { unSubscribeBlogs, token } = this.props
      await unSubscribeBlogs(token);
      window.close();
  }

  render() {
    return (
      <Layout headerStyle="teal" bodyBg="light" footerStyle="white">
        <Head>
          <title>Blogs</title>
        </Head>
        <Container className="pt-4">
          <div className="unsubscription-text">
            <p>Unsubscribing, Please wait ....</p>
          </div>
        </Container>
      </Layout>
    )
  }
}

BlogUnSubscription.getInitialProps = ({ query }) => {
    let props = { }
    if (query.token) {
      props = {
        token: query.token
      }
    }
    return props
}


BlogUnSubscription.propTypes = {
  unSubscribeBlogs: PropTypes.func.isRequired,
  token: PropTypes.string
}

export default connect(null, mapDispatchToProps)(BlogUnSubscription);
