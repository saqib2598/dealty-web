import React from 'react'
import { Modal } from 'reactstrap'
import PropTypes from 'prop-types'
import { ModalBody, ModalHeader } from 'reactstrap'
import AccountUpdateContainer from '../../containers/users/AccountUpdateContainer'

const updateAccountModal = ({isOpen, toggleUpdateAccountModal}) =>(
  <Modal isOpen={ isOpen } >
    <ModalHeader className="text-center">Update your account first!</ModalHeader>
    <ModalBody>
      <AccountUpdateContainer
        toggleUpdateAccountModal={toggleUpdateAccountModal}
      />
    </ModalBody>
  </Modal>
)

updateAccountModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleUpdateAccountModal: PropTypes.func.isRequired
}

export default updateAccountModal
