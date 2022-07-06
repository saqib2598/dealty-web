import React from 'react'
import { connect } from 'react-redux'
import { Router } from '../../routes'
import { Button } from 'reactstrap'
import { signOut } from '../../modules/users'

const mapDispatchToProps = { signOut }

class LogoutContainer extends React.PureComponent {

  handleLogout = () => {
    const { signOut } = this.props

    signOut()
      .then(() => Router.push('/'))
      .then(() => window.scrollTo(0, 0))
  }

  render() {
    return (
      <Button
        block
        size="lg"
        color="gray-light"
        onClick={this.handleLogout}
        >Log Out
      </Button>
    )
  }
}

LogoutContainer = connect(null, mapDispatchToProps)(LogoutContainer)

export default LogoutContainer
