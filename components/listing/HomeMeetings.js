import React from 'react'
import PropTypes from 'prop-types'
import { Button, Row, Col } from 'reactstrap'

const homeMeetings = ({ toggleLenderContact, toggleSendAppointment, toggleSendOnlineOffer, sellerTypeTBD }) => {
  return <div className="meeting-schedule">
    <ul className = 'meeting-list'>
      <li md={6}>
        <div className="meeting-box">
          <h3>Need to get Prequalified?</h3>
          <p>Contact a Lender</p>
          <Button className="btn-meeting" onClick={toggleLenderContact}>Get Prequalified </Button>
        </div>
      </li>
      <li md={6}>
        <div className="meeting-box">
          <h3>Schedule a Showing</h3>
          <p>Virtual or In Person</p>
          <Button className="btn-meeting" onClick={toggleSendAppointment}>Schedule Showing</Button>
        </div>
      </li>
      <li md={6}>
        <div className="meeting-box m-b-0">
          <h3>Send an offer to {sellerTypeTBD == 'Guest' ? 'Lister' : sellerTypeTBD} </h3>
          <p>Contact {sellerTypeTBD == 'Guest' ? 'Lister' : sellerTypeTBD} to make an offer.</p>
          <Button className="btn-meeting" onClick={toggleSendOnlineOffer}>Send an offer to {sellerTypeTBD == 'Guest' ? 'Lister' : sellerTypeTBD}</Button>
        </div>
      </li>
      <li md={6}>

      </li>
    </ul>
  </div>
}

homeMeetings.propTypes = {
  toggleLenderContact: PropTypes.func.isRequired,
  toggleSendOnlineOffer: PropTypes.func.isRequired,
  toggleSendAppointment: PropTypes.func.isRequired,
  sellerTypeTBD: PropTypes.string.isRequired,
}

export default homeMeetings
