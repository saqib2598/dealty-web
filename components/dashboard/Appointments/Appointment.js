import React, { useState } from 'react'
import moment from 'moment'
import { Button, Alert } from 'reactstrap'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import { capitalize } from 'lodash'
import { mapFinalFormErrors } from '../../../lib/utils'
import { updateAppointment } from '../../../modules/appointments'
import SendAppointmentForm from '../../buyer/home/SendAppointmentForm'
import { humanize } from '../../HumanizeText'
import { Link } from '../../../routes'

const mapErrors = mapFinalFormErrors('Failed to create account')
const mapDispatchToProps = { updateAppointment }

const appointment = ({appointment, type, ...props}) => {
  const [message, setMessage] = useState('')
  const [appointmentModal, setAppointmentModal] = useState(false)

  const handleAcceptance = async (state) =>{
    const { updateAppointment } = props

    let values = {}
    values['state'] = state
    if(appointment.doneBy.id !== props.user.id){
      if(appointment.senderTz && appointment.receiverTz == null){
        values['ReceiverTz'] = Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    }
    try{
      await updateAppointment(appointment.id, values)
      setMessage(`The showing has been ${state} successfully.`)
      closeAlertLater()
    }
    catch(error){
      return mapErrors(error)
    }
  }

  const submit = async (values) => {
    const { updateAppointment } = props

    values['id'] = appointment.id
    values['state'] = 'edited'
    if(values.AppointmentTime){
      values.AppointmentTime = new Date(values.AppointmentTime)
    }
    if(appointment.doneBy.id !== props.user.id){
      if(appointment.senderTz && appointment.receiverTz == null){
        values['ReceiverTz'] = Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    }
    try{
      await updateAppointment(appointment.id, values)
      setMessage(`The showing has been edited successfully.`)
      closeAlertLater()
      toggleAppointment()
    }
    catch(error){
      return mapErrors(error)
    }
  }

  const isDisabled = (state, button) => {
    if(['accepted', 'rejected', 'canceled'].includes(state)){
      return true
    }
    else if (button == 'edit'){
      return false
    }
    else if(appointment.doneBy.id == props.user.id){
      return button !== 'cancel'
    }
    else if(button === 'cancel'){
      return true
    }
    else{
      return false
    }
  }

  const closeAlertLater = () => {
    setTimeout(() => {
      setMessage('')
    },3000)
  }

  const toggleAppointment = () =>{
    setAppointmentModal(!appointmentModal)
  }

  return(
    <div className='card'>
    {message && <Alert>{message}</Alert>}
      <h5>{appointment.listing.address} {appointment.listing.address2}</h5>
      <h5>{appointment.listing.city} {appointment.listing.state} {appointment.listing.zip}</h5>
      <div>
        <div className="white-div">
          <div>Listing price</div><div>${appointment.listing.price}</div>
        </div>
        <div className="grey-div">
          <div>Showing Type</div><div>{humanize(appointment.appointmentType)}</div>
        </div>
        <div className="white-div">
          <div>Appointment Date</div><div>{moment(appointment.appointmentTime).format('MM/DD/YYYY h:mm a')} </div>
        </div>
        {appointment.link &&
          <div className="white-div">
            <div>Meeting Link</div><div>
              <Link route={appointment.link}>
                <a target="_blank">
                  <Button
                    size="sm"
                  >
                    Link
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        }
        {appointment.doneBy &&
          <>
            {appointment.state == 'initialized' ?
              <div className="text-muted mt-2"> Sent By: {appointment.doneBy.name}</div>
              :
              <div className="text-muted mt-2"> {capitalize(appointment.state)} By: {appointment.doneBy.name} </div>
            }
          </>
        }
        <Button className='edit' onClick={toggleAppointment} disabled={isDisabled(appointment.state,'edit')}>Edit Showing</Button>
        <div className='accept-reject'>
          <Button onClick={() => handleAcceptance('accepted')} disabled={isDisabled(appointment.state)}>
            Accept
          </Button>
          <Button className="btn-danger" onClick={() => handleAcceptance('rejected')} disabled={isDisabled(appointment.state)}>
            Reject
          </Button>
        </div>
        <Button className='edit btn-danger' onClick={() => handleAcceptance('canceled')} disabled={isDisabled(appointment.state,'cancel')}>Cancel</Button>
        <Form
          component={SendAppointmentForm}
          onSubmit={submit}
          openSendAppointment={appointmentModal}
          toggleSendAppointment={toggleAppointment}
          heading='Schedule Showing'
          message='editing a showing'
          isSignedIn={true}
          initialValues={{AppointmentTime: appointment.appointmentTime, AppointmentType: appointment.appointmentType}}
        />
      </div>
      <style>{`
        .white-div, .grey-div {
          display: flex;
          justify-content: space-around;
        }
        .grey-div {
          background: lightgrey;
        }
        .accept-reject {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
        }
        .accept-reject .btn {
          width: 49%;
        }
        .edit {
          width: 100%;
          margin-top: 10px;
        }
      `}</style>
    </div>
  )
}

appointment.propTypes = {
  appointment: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
}

export default connect(null, mapDispatchToProps)(appointment);
