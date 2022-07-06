import React from 'react'
import { alertStyle} from '../../containers/dashboard/styles/Modal'
import { Alert, Button, ModalBody, Modal, ModalHeader, ModalFooter } from 'reactstrap'
import moment from 'moment'

const SubscriptionPlanModal = ({disabled, isOpen, error, success, plan, subscribe, handleHide, user, close, handleUpdate}) => {

  const renewAt = " on " + moment(user.cancelAt).add(1, 'day').format('DD MMM YYYY')

  return(
    <Modal isOpen={ isOpen } >
      <ModalHeader className="text-center">{plan && plan.nickname} plan</ModalHeader>
      <ModalBody>
        {
          success !== '' &&
            <Alert color="success" style={alertStyle}>{success}</Alert>
        }
        {
          error !== '' &&
          <Alert color="danger" style={alertStyle}>{error}</Alert>
        }
        - You will be charged <strong>${user && user.stripeCustomer ? plan && plan.displayPrice : 0}</strong>
        { user.cancelAt && <strong>{renewAt}</strong> }
        <br/>
        - You will be able to use all listed perks
        <br/>
        - Your remaining price will be adjusted in next invoice, if any
      </ModalBody>
      {(subscribe || handleHide) &&
        <ModalFooter>
          {subscribe &&
            <Button color="info" disabled={disabled} onClick={user.subscriptionId ? () => handleUpdate() : () => subscribe(plan && plan.id)}>
              {user.subscriptionId ? 'ReSubscribe' : 'Subscribe'}
            </Button>
          }
          {handleHide &&
            <Button color="gray-light" disabled={close ? false : disabled} onClick={handleHide}>{close ? "Close" : "Cancel"}</Button>
          }

        </ModalFooter>
      }
    </Modal>
  )
}

export default SubscriptionPlanModal
