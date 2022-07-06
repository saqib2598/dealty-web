import Head from 'next/head'
import { connect } from 'react-redux';
import React from 'react'
import Layout from '../../components/Layout'
import RegisterContainer from '../../containers/users/RegisterContainer'
import { USER_HOME_PATH, retrieveUser } from '../../modules/users'
import { retrieveActiveListing } from '../../modules/listings'
import forwardAuth from '../../lib/forwardAuth'
import { isSignedIn } from '../../lib/session'
import { Router } from '../../routes'

const mapDispatchToProps = { retrieveUser, retrieveActiveListing }

const mapStateToProps = state => ({
  me: state.users.me,
  activeListing: state.listings.activeListing
})

class Register extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      viewForm: false
    }
  }

  componentWillMount() {
    const { retrieveActiveListing, retrieveUser } = this.props;

    return this.checkSignIn()
      .then((b) => b == true && retrieveActiveListing())
      .then((a) => a && retrieveUser())
      .then((b) => ((this.props.activeListing && Router.pushRoute(`/seller/property/${this.props.activeListing}`)) ||
        (((b.seller && b.seller.listings.length == 0) && typeof this.props.activeListing == 'object') && Router.pushRoute(USER_HOME_PATH))) ||
        this.setState({ viewForm: true })
      )
  }

  checkSignIn = async () => {
    return await isSignedIn();
  }

  render() {
    if(!this.state.viewForm) return null;

    return (
      <div>
      {
        this.state.viewForm ?
        <Layout headerStyle="teal" bodyBg="white" footerStyle="white">
          <Head>
            <title>Register | Dealty</title>
          </Head>
          <div className="wrapper">
            <RegisterContainer />
          </div>
        </Layout> :
        <span></span>
      }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
