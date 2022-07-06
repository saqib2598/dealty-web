import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { retrieveAppointments } from '../../../modules/appointments'
import Appointment from './Appointment'

const mapStateToProps = state => ({
  appointments: state.appointments.appointments
})

const mapDispatchToProps = { retrieveAppointments }

const AppointmentsComponent = (props) => {

   useEffect(() => {
    const { retrieveAppointments, type} = props
    retrieveAppointments(type)
  },[])

  return(
    <Row className="pt-4 appointments">
      {props.appointments.length == 0 &&
        <div align="center" style={{width: '100%'}}><h3>{
          props.type === 'sent' ? "You haven't made any showing yet" : "Please create a listing to schedule showings"}
        </h3></div>
      }
      {props.appointments && props.appointments.map(appointment =>
        <Col xs="12" sm="6" lg="4" key={appointment.id} className="d-flex align-items-stretch mt-4">
          <Appointment appointment={appointment} type={props.type} user={props.user} />
        </Col>
      )}
    </Row>
  )
}

AppointmentsComponent.propTypes = {
  retrieveAppointments: PropTypes.func.isRequired,
  appointments: PropTypes.array,
  type: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentsComponent)
