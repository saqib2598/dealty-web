import React from 'react'
import {
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  Col,
  Row
} from 'reactstrap'
import {
  Field
} from 'react-final-form'
import DatePickerAdapter from '../DatePickerAdapter'

const CustomDateRange = props => {
  const {
    toggleOpenDateRange,
    openDateRange
  } = props;

  return (
    <div className="modal-form">
      <Modal isOpen={ openDateRange } toggle={toggleOpenDateRange}>
        <ModalHeader toggle={toggleOpenDateRange}></ModalHeader>
        <ModalBody>
          <h4 style={{textAlign: 'center'}} className="modal-heading">Custom Date Range</h4>
          <Form>
            <div className="row form-group">
              <Row>
                <Col className='col-md-6'>
                  <Field
                    id="startDate"
                    name="StartDate"
                    label="Open House Date*"
                    className="form-control"
                    minDate = {new Date()}
                    component={DatePickerAdapter}
                    placeholderText="Select Start Date..."
                  />
                </Col>
                <Col className='col-md-6'>
                  <Field
                    id="endDate"
                    name="EndDate"
                    label="Open House Date*"
                    className="form-control"
                    minDate = {new Date()}
                    placeholderText="Select End Date..."
                    component={DatePickerAdapter}
                  />
                </Col>
              </Row>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default CustomDateRange
