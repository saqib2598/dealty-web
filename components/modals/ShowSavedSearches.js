import React from 'react'
import { ModalBody, Modal, ModalHeader, Button, ModalFooter } from 'reactstrap'
import PropTypes from 'prop-types'

const ShowSaveSearches = ({ toggleShowSaveSearches, SaveSearchSuccess, redirectToSaveSearches }) => {
  return(
    <Modal size="lg" isOpen={SaveSearchSuccess} className="show-saved-searches">
      <ModalHeader toggle={toggleShowSaveSearches}></ModalHeader>
      <ModalBody>
        <h3>Your Search has been saved succesfully</h3>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" type="submit" onClick={()=>{ redirectToSaveSearches() }}>Show Saved Searches</Button>
        <Button color="gray-light" onClick={toggleShowSaveSearches}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}

ShowSaveSearches.propTypes = {
  toggleShowSaveSearches: PropTypes.func,
  SaveSearchSuccess: PropTypes.bool,
  redirectToSaveSearches: PropTypes.func,
}

export default ShowSaveSearches
