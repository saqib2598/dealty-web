import Head from 'next/head'
import React from 'react'
import { connect } from 'react-redux';
import HousePatternSvg from '../components/HousePattern'
import Layout from '../components/Layout'
import LoginContainer from '../containers/users/LoginContainer'
import forwardAuth from '../lib/forwardAuth'
import { USER_HOME_PATH, retrieveUser } from '../modules/users'
import { retrieveActiveListing } from '../modules/listings'
import { isSignedIn } from '../lib/session'
import { Router } from '../routes'
import FSRecordVars from '../components/RecordFullStory'

const mapDispatchToProps = { retrieveUser, retrieveActiveListing }

const mapStateToProps = state => ({
  me: state.users.me,
  activeListing: state.listings.activeListing
})

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      viewForm: false
    }
  }

  componentWillMount() {
    const { retrieveActiveListing, retrieveUser } = this.props;
    return this.checkSignIn()
      .then((a) => a == true ? retrieveUser() : this.setState({ viewForm: true })  )
      .then((b) => {
        if(b && b.id){
          FSRecordVars(b)
          if(b.buyer){
            Router.pushRoute('/buy')
          } else {
            retrieveActiveListing()
            .then(()=>(Router.pushRoute('/dashboard')))
          }
        }
      }).catch((e)=> {
        this.setState({ viewForm: true })
      })
  }

  checkSignIn = async () => {
    return await isSignedIn();
  }

  render() {
    if(!this.state.viewForm) return null;
    return (
      <Layout headerStyle="none" bodyBg="teal" footerStyle="teal">
        <Head>
          <title>Login | Dealty</title>
        </Head>
        <div className="center">
          <div className="wrapper sm">
            <LoginContainer/>
          </div>
        </div>
        <HousePatternSvg />
      </Layout>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
