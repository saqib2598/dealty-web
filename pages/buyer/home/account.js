import Head from 'next/head'
import React from 'react'
import Layout from '../../../components/Layout'
import requireAuth from '../../../lib/requireAuth'
import Setting from '../../../containers/users/Settings'
import { selectUser } from '../../../modules/users'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  user: selectUser(state),
})

class Account extends React.Component {

  render(){
    const { user } = this.props
    return(
      <Layout isBuyer={ true } headerStyle="default" bodyBg="light">
        <Head>
          <title>Account | Dealty</title>
        </Head>
        <Setting user={ user }/>
      </Layout>
    )
  }
}

Account = connect(mapStateToProps, null)(Account)
export default requireAuth(Account)
