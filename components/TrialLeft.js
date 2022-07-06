import React from 'react'
import { alertStyle} from '../containers/dashboard/styles/Modal'
import { Alert } from 'reactstrap'

const TrialLeft = ({user}) => {
  return(
    <div>
      {
        (((user.trialLeft && user.trialLeft > -1) || user.trialLeft == 0) && !user.card) &&
          <Alert align="center" color={`${user.trialLeft > 10 ? 'success' : 'danger'}`} style={alertStyle}>
            You are on {user.plan.nickname} plan, <strong>{user.trialLeft}</strong> days left of your free membership
          </Alert>
      }
    </div>
  )
}

export default TrialLeft
