import React from 'react'
import { connect } from 'react-redux'
import getConfig from 'next/config'
import Intercom from 'react-intercom';
import { selectUser } from '../modules/users'

const { publicRuntimeConfig: { intercomAppId } } = getConfig()

const mapStateToProps = (state) => ({
  user: selectUser(state)
})

class IntercomContainer extends React.Component {
  render() {
    const { user } = this.props
    
    const intercom_user = { user_id: user.id, name: user.firstName + ' ' + user.lastName, email: user.email }

    return(
      <div>
        {
          intercom_user.user_id === undefined ? <Intercom appID={intercomAppId} /> : <Intercom appID={intercomAppId} {...intercom_user } />
        }
      </div>
    )
  }
}

IntercomContainer = connect(mapStateToProps, null)(IntercomContainer)
export default IntercomContainer