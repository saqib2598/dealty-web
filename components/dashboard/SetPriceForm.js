import React from 'react'
import { Field } from 'react-final-form'
import { required } from '../../lib/validators'
import InputAdapter from '../InputAdapter'
import { Form, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import PropTypes from 'prop-types'

const customStyles = {
  marginTop: '1px'
};
const SetPriceForm = (props) => (
    <Form onSubmit={props.handleSubmit} style={{maxWidth: 'fit-content', margin: 'auto'}}>
      <Modal isOpen={props.setPriceModalVisible} toggle={props.toggleSetPriceModal} >
        <ModalHeader className="text-center" style = { customStyles }>Confirm Your Price</ModalHeader>
        <ModalBody>
          Are you sure you&apos;re ready to list?
          <h4>${props.values.price && props.values.price.toLocaleString()}</h4>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" onClick={props.form.submit}>Set Price</Button>
          <Button color="gray-light" onClick={props.toggleSetPriceModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <div className="list-text text-center">
        <h2><img alt="Value Icon" src='/static/images/icon-value.svg' /> List Your home</h2>
      </div>
      <Field
        id="price"
        name="price"
        label="Enter numbers only"
        placeholder="Enter Your Asking Price..."
        type="number"
        component={InputAdapter}
        validate={required}
        onKeyPress={props.handleKeyPress}
      />
      {props.submitFailed &&
      <div className="text-danger">{props.submitError}</div>
      }
      <div className="clearfix">
        <Button
          block
          size="lg"
          color="primary"
          onClick={props.toggleSetPriceModal}
        >Submit Price</Button>
      </div>

    <p className="text-center">By submitting above you agree to our <a href="https://termsfeed.com/terms-conditions/26fa9f62852b149b587864a73d1ee809" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>.</p>
    <style jsx>{`
    @import "styled-jsx-helper";

      h2{
        text-align:center;
        margin: 0 0 30px 0;
        font-size:30px;
      }
      .clearfix{
        padding-top: 10px;
      }
      p{
        font-size: 14px;
        text-align: center;
      }
      @include media-breakpoint-up(sm) {
        h2{
          font-size:40px;
        }
      }
    `}</style>
    </Form>
)

SetPriceForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setPriceModalVisible: PropTypes.bool.isRequired,
  toggleSetPriceModal: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool,
  submitError: PropTypes.any
}

export default SetPriceForm
