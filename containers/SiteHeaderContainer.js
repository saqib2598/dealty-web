import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { isSignedIn } from '../lib/session'
import { retrieveUser, selectIsSignedIn, signOut, selectUser } from '../modules/users'
import { selectPrimaryDomain } from '../modules/homes';
import NotificationSubscription from '../components/setup-notifications'
import { SiteHeader } from '../components/Header'

const mapStateToProps = createSelector(
  selectIsSignedIn,
  selectUser,
  selectPrimaryDomain,
  (isSignedIn, user, primaryDomain) => ({ isSignedIn, user, primaryDomain }),
)

const mapDispatchToProps = { retrieveUser, signOut }

class SiteHeaderContainer extends React.PureComponent {
  state = {
    loading: true
  }

  async componentDidMount() {
    const { retrieveUser } = this.props

    if (isSignedIn()) {
      await retrieveUser()
    }
    this.setState({ loading: false })
  }

  render() {
    const { user, isSignedIn } = this.props
    const isBuyer = user && user.buyer
    const isLoanOfficer = user && user.loanOfficer
    return (
      <>
        {isSignedIn && <NotificationSubscription user={user} />}
        <SiteHeader {...this.props} {...this.state} />
      </>
    );
  }
}

SiteHeaderContainer = connect(mapStateToProps, mapDispatchToProps)(SiteHeaderContainer)

export default SiteHeaderContainer
