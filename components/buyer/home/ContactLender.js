import React from 'react'
import { Row, Col, Button } from 'reactstrap'
import { func} from 'prop-types'

ContactLender.propTypes = {
  toggleLenderContact: func.isRequired,
}

function ContactLender(props) {
  return (
    <div className="prequalified">
      <Row className="text-center text-md-left">
        <Col md="auto">
           <span className="contact__icon"><img src="../../static/images/PrequalificationIcon.jpeg" className="contact__img" alt="Contact Image"/></span>
        </Col>
        <Col>
          <Col>
            <h1 className="h5 contact__homeowner">Need to get Prequalified?</h1>
            <div className="contact__info">Contact a Lender</div>
            <Button className="mt-4 px-3" color="primary" onClick={props.toggleLenderContact}>Get prequalified?</Button>
          </Col>
        </Col>
      </Row>
    </div>
  )
}


export default ContactLender
