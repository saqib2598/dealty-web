import React from 'react'
import { Modal } from 'reactstrap'
import PropTypes from 'prop-types'
import { ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap'

import { customStyles } from './styles/Modal'

const deleteListingModal = ({isOpen, deleteSubmitter, handleDelete, toggleDeleteListingModal}) =>(
  <Modal className='dashboard-modal' isOpen={ isOpen }>
    <ModalHeader className="text-center" style = { customStyles }>Delete Listing</ModalHeader>
    <ModalBody>
      Are you sure you want to delete this listing?
    </ModalBody>
    <ModalFooter>
      <Button color="primary" type="submit" onClick={handleDelete} disabled={deleteSubmitter}>Delete</Button>
      <Button color="gray-light" onClick={toggleDeleteListingModal}>Cancel</Button>
    </ModalFooter>
  </Modal>
)

deleteListingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  deleteSubmitter: PropTypes.bool,
  handleDelete: PropTypes.func.isRequired,
  toggleDeleteListingModal: PropTypes.func.isRequired
}

export default deleteListingModal
