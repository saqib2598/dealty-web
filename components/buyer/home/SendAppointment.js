import React from 'react'
import { Row, Col, Button } from 'reactstrap'

function SendAppointment(props) {
  return (
    <div className="send-appointment">
      <Row className="text-center text-md-left">
        <Col md="auto">
           <span className="contact__icon"><img src="../../static/images/appointment.jpeg" className="contact__img" alt="Contact Image"/></span>
        </Col>
        <Col>
          <Col>
            <h1 className="h5 contact__homeowner">Schedule a Showing</h1>
            <div className="contact__info">Virtual or In Person</div>
            <Button className="mt-4 px-3" color="primary" onClick={props.toggleSendAppointment}>Schedule Showing</Button>
          </Col>
        </Col>
      </Row>
    </div>
  )
}


export default SendAppointment
