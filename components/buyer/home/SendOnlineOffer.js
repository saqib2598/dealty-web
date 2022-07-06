import React from 'react'
import { Row, Col, Button } from 'reactstrap'
import PropTypes from 'prop-types'

const sendOnlineOffer = (props) => (
  <div className="send-offer">
    <Row className="text-center text-md-left">
      <Col md="auto">
        <span className="contact__icon"><img src="../../static/images/SendOfferIcon.jpeg" className="contact__img" alt="Contact Image"/></span>
      </Col>
      <Col>
        <Col>
          <h1 className="h5 contact__homeowner">Send an offer to {props.sellerTypeTBD}</h1>
          <div className="contact__info">Contact {props.sellerTypeTBD} to make an offer.</div>
          <Button className="mt-4 px-3" color="primary" onClick={props.toggleSendOnlineOffer} disabled={props.sentOffer && true}>
            {props.sentOffer ? 'Offer sent' : `Send Offer to Listing ${props.sellerTypeTBD}`}
          </Button>
        </Col>

      </Col>
    </Row>
  </div>
)

sendOnlineOffer.propTypes = {
  sentOffer: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ]),
  sellerTypeTBD: PropTypes.string.isRequired,
  toggleSendOnlineOffer: PropTypes.func.isRequired
}

export default sendOnlineOffer;
