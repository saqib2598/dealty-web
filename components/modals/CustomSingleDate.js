import React from 'react'
import {
  Form,
  Modal,
  ModalBody,
  ModalHeader
} from 'reactstrap'
import {
  Field
} from 'react-final-form'
import DatePickerAdapter from '../DatePickerAdapter'

const CustomSingleDate = props => {
  const {
    toggleSingleDate,
    openSingleDate
  } = props;

  return (
    <div className="modal-form">
      <Modal isOpen={ openSingleDate } toggle={toggleSingleDate}>
        <ModalHeader toggle={toggleSingleDate}></ModalHeader>
        <ModalBody>
          <h4 style={{textAlign: 'center'}} className="modal-heading">Single Custom Date</h4>
          <Form>
            <div className="row form-group">
              <Field
                id="openDate"
                name="OpenDate"
                label="Open House Date*"
                className="form-control"
                minDate = {new Date()}
                component={DatePickerAdapter}
                placeholderText="Select Date..."
              />
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default CustomSingleDate
