import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { alertStyle, customStyles } from './styles/Modal'
import DatePicker from 'react-datepicker'
import '../../styles/react-datepicker.scss'
import { Alert,
  Form,
  FormGroup,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Label,
  Input,
  Col } from 'reactstrap'

const updateListingStatusModal = (
  { isOpen,
    success,
    selectedListingStatus,
    handleChange,
    selectedSoldPrice,
    selectedSoldDate,
    handlePriceChange,
    handleDateChange,
    handleUpdate,
    updateSubmitter,
    toggleUpdateListingStatusModal
  }) =>(
  <Modal isOpen={ isOpen } >
    <ModalHeader className="text-center" style = { customStyles }>Listing Status</ModalHeader>
    <ModalBody>
      {
        success !== '' &&
          <Alert color={success == 'Status Updated Successfully' ? 'success' : 'danger'} style={alertStyle}>{success}</Alert>
      }
      <Form>
        <FormGroup row>
          <Label sm={2} size="lg">Status</Label>
          <Col sm={10}>
            <Input value={selectedListingStatus} onChange={handleChange} type="select">
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="sold">Sold</option>
              <option value="off_market">Off Market</option>
            </Input>
          </Col>
        </FormGroup>
        { selectedListingStatus === 'sold' &&
          <FormGroup>
            <div className="row form-group">
              <Label sm={2} size="lg">Price</Label>
              <Col sm={10}>
                <Input
                  value={selectedSoldPrice}
                  type="number"
                  onChange={handlePriceChange}
                  placeholder="Price"
                />
              </Col>
            </div>
            <div className="row form-group">
              <Label sm={2} size="lg">Date</Label>
              <Col sm={10}>
                <DatePicker
                  selected = { moment(selectedSoldDate) }
                  className = "form-control"
                  onChange = { handleDateChange }
                  placeholderText="Select Date..."
                  maxDate= {moment(new Date())}
                  dateFormat="MM/DD/YYYY"
                />
              </Col>
            </div>
          </FormGroup>
        }
      </Form>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" type="submit" onClick={handleUpdate} disabled={updateSubmitter}>Update</Button>
      <Button color="gray-light" onClick={toggleUpdateListingStatusModal}>Cancel</Button>
    </ModalFooter>
  </Modal>
)

updateListingStatusModal.propTypes = {
  isOpen: PropTypes.bool,
  success: PropTypes.any,
  selectedListingStatus: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  selectedSoldPrice: PropTypes.string,
  selectedSoldDate: PropTypes.object,
  handlePriceChange: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  updateSubmitter: PropTypes.bool.isRequired,
  toggleUpdateListingStatusModal: PropTypes.func.isRequired
}

export default updateListingStatusModal
