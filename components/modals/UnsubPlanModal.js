import React from 'react'
import { Modal } from 'reactstrap'
import { alertStyle} from '../../containers/dashboard/styles/Modal'
import { Alert, Button, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'


const UnsubPlanModal = ({isOpen, success, handleSubmit, disabled, handleHide, error, close}) => {
  return(
    <Modal isOpen={ isOpen } >
      <ModalHeader className="text-center">Cancel Subscription</ModalHeader>
      <ModalBody>
        {
          success !== '' &&
            <Alert color="success" style={alertStyle}>{success}</Alert>
        }
        {
          error !== '' &&
          <Alert color="danger" style={alertStyle}>{error}</Alert>
        }
        - You will be demoted to the basic plan
        <br />
        - All listings will be deactivated except for the latest one
        <br />
        <br />
        <strong>These actions will be applied when your payment will expire</strong>

      </ModalBody>
      <ModalFooter>
        <Button color="primary" type="submit" onClick={handleSubmit} disabled={disabled}>Delete</Button>
        <Button color="gray-light" onClick={handleHide} disabled={close ? false : disabled}>{close ? "Close" : "Cancel"}</Button>
      </ModalFooter>
    </Modal>
  )
}

export default UnsubPlanModal
