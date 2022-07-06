import React from 'react'
import { Modal } from 'reactstrap'
import { Form } from 'react-final-form'
import ClaimListingForm from './ClaimListingForm'

const ClaimListingModal = ({toggleModal, isOpen, verifyClaimListing, listing, listing_claimed, restart, resendCode, seconds, handleTick, handleChange}) => {
  return(
    <Modal isOpen={ isOpen } >
      <Form
        component={ClaimListingForm}
        toggleModal={toggleModal}
        listing={listing}
        listing_claimed={listing_claimed}
        restart={restart}
        resendCode={resendCode}
        seconds={seconds}
        handleTick={handleTick}
        handleChange={handleChange}
        onSubmit={verifyClaimListing}
      />
    </Modal>
  )
}

export default ClaimListingModal
