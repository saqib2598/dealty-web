import Head from 'next/head'
import React, { Component } from "react"
import Layout from '../../components/Layout'
import SubheaderPageTitle from '../../components/SubheaderPageTitle'
import requireAuth from '../../lib/requireAuth'
import { connect } from 'react-redux'
import { selectUser } from '../../modules/users'
import Setting from '../../containers/users/Settings'

const mapStateToProps = (state) => ({
  user: selectUser(state),
})

class MyAccount extends Component {

  render(){

    const { user } = this.props
    
    return(
      <Layout bodyBg={user.seller ? 'light' : 'grey'} headerStyle={user.seller ? 'teal' : 'default'} footerStyle="white">
        <Head>
          <title>Dashboard | Dealty | Edit My Account</title>
        </Head>
        <SubheaderPageTitle 
          title="My Account" 
          subTitle={user.plan && user.plan.nickname} 
          color={user.seller ? '#007793' : 'white'}
          headerColor={user.seller ? 'white' : '#007793'}
        />
        <Setting user={ user }/>
      </Layout>
    )
  }
}

MyAccount = connect(mapStateToProps, null)(MyAccount)

export default requireAuth(MyAccount)
