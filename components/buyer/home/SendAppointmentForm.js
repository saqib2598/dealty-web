import React from 'react'
import { Field } from 'react-final-form'
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form
} from 'reactstrap'
import { required } from '../../../lib/validators'
import ContactHomeOwnerIconSvg from '../../images/contact-home-owner-iconsvg'
import InputAdapter from '../../InputAdapter'
import DatePickerAdapter from '../../DatePickerAdapter'
import SelectAdapter from '../../SelectAdapter'
import UnSignedInUser from '../../UnSignedInUser'
import { APPOINTMENT_TYPE } from '../../../static/data/constants'

const SendAppointmentForm = props => {
  const {
    heading,
    isSignedIn,
    submitting,
    handleSubmit,
    submitFailed,
    submitError,
    isWeekday,
    toggleSendAppointment,
    openSendAppointment,
    message
  } = props;

  return (
    <div className="modal-form">
      <Modal size="lg" isOpen={openSendAppointment} toggle={toggleSendAppointment}>
        <ModalHeader toggle={toggleSendAppointment}></ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <div className="icon"><ContactHomeOwnerIconSvg /></div>
              <h4 className="modal-heading">{heading}</h4>
              {isSignedIn &&
                <Form onSubmit={handleSubmit} >
                  <Field
                    id="AppointmentTime"
                    name="AppointmentTime"
                    label="Showing Date*"
                    minDate = {new Date()}
                    component = {DatePickerAdapter}
                    className="form-control"
                    validate={required}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat='MM/DD/YYYY h:mm a'
                  />
                  <Field
                    id="AppointmentType"
                    name="AppointmentType"
                    label="Showing Type*"
                    options = {APPOINTMENT_TYPE}
                    type="select"
                    className="form-control"
                    validate={required}
                    component = {SelectAdapter}
                  />
                  {submitFailed &&
                    <div className="text-danger">{submitError}</div>
                  }
                  <p><b>Note:</b> You are {message}, your name will be disclosed to them.</p>
                  <Button
                    block
                    size="lg"
                    color="secondary"
                    disabled={submitting}
                    type="submit"
                  >{submitting ? 'Sending...' : heading}</Button>
                </Form>
              }

              {!isSignedIn &&
                <UnSignedInUser />
              }
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      <style jsx>{`
      @import "styled-jsx-helper";
      :global(.modal-content){
        padding: 25px;
      }
      .modal-heading{
        font-size: 27px;
        text-align: center;
        color: $title-light-color;
        padding-top: 5px;
        padding-bottom:10px;
      }
      :global(.modal-header){
        border-bottom: none !important;
        margin-top: -58px;
        margin-bottom: -20px;
        margin-right: -54px;
      }
      :global(.modal-header .close){
        padding: 0;
        margin: 0px;
        opacity: 1;
        color: #fff;
        background: #009db2;
        width: 40px;
        height: 40px;
        outline: none;
      }
      :global(.modal-header .close:hover){
        opacity: 1 !important;
        color: #fff !important;
      }
      :global(.modal-header .close span){
        text-shadow: none
      }
      :global(.close){
        border-radius: 50%;
      }
      :global(.invalid-feedback){
        display: block !important;
      }
      .icon{
        text-align: center;
        padding-top: 35px;
      }
    `}</style>
    </div>
  );
}

export default SendAppointmentForm;
