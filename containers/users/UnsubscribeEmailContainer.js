import React from 'react'
import { connect } from 'react-redux'
import { Router } from '../../routes'
import { Button } from 'reactstrap'
import PropTypes from 'prop-types'
import { unsubscribeEmail, unsubUser } from '../../modules/users'

const mapDispatchToProps = { unsubscribeEmail }
const mapStateToProps = (state) => ({
  user: unsubUser(state)
});

class UnsubscribeEmailContainer extends React.PureComponent {

  handleUnsubscribe = () => {
    const { unsubscribeEmail } = this.props

    unsubscribeEmail(this.props.uid)
      .then(() => {
        const { user } = this.props
        const query = { unsubscribed: user.unsubscribed }
        Router.push({pathname: '/unsubscribe/message', query})
      }).catch('Could not unsubscribe User')
      .then(() => window.scrollTo(0, 0))
  }

  render() {
    return (
    <>
      <h3>Are you sure you want to unsubscribe?</h3>
      <h5>You will no longer receive E-mails from Dealty.</h5>
      <Button
        block
        size="lg"
        color="gray-light"
        onClick={this.handleUnsubscribe}
        className="unsub-btn"
        >Unsubscribe
      </Button>
    </>
    )
  }
}

UnsubscribeEmailContainer.propTypes = {
  uid: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
}

UnsubscribeEmailContainer = connect(mapStateToProps, mapDispatchToProps)(UnsubscribeEmailContainer)

export default UnsubscribeEmailContainer
