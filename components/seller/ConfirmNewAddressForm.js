import React from 'react'
import { Button, Form, Collapse } from 'reactstrap'
import { Field } from 'react-final-form'
import AddressAdapter from '../AddressAdapter'
import { required } from '../../lib/validators'
import GoogleMapImage from '../GoogleMapImage'
import InputAdapter from '../InputAdapter'

const ConfirmAddressForm = (props) => (
  <Form onSubmit={props.handleSubmit}>
    {!props.addressFieldVisible &&
    <p className="lead text-center">{props.registrationAddress.formatted_address}</p>
    }
    <Collapse isOpen={props.addressFieldVisible}>
      <Field
        id="address"
        name="address"
        label="Enter New Address*"
        type="text"
        component={AddressAdapter}
        handleSelect={(address)=>{}}
        validate={required}
      />
      <Field
        id="address2"
        name="address2"
        label="Address 2"
        placeholder="Apartment, suite, other"
        type="text"
        component={InputAdapter}
      />
    </Collapse>
    {!props.addressFieldVisible &&
    <div className="map-image">
      <GoogleMapImage
        lat={props.registrationAddress.geometry.location.lat()}
        lng={props.registrationAddress.geometry.location.lng()}
      />
    </div>
    }
    <p className="text-center lead">If this address and view are correct, please click “confirm” to continue. If it isn’t, please edit your address information now.
    </p>
    <hr className="dashed" />
    {props.submitFailed &&
      <div align="center">
        <div className="text-danger">{props.submitError}</div>
        <div className="claim-listing">Do you want to claim your listing? <span className="text-primary claim" onClick={props.toggleModal}>Claim it Now!</span></div>
      </div>
    }
    <Button
      block
      size="lg"
      color="info"
      disabled={props.submitting}
      type="submit"
    >{props.submitting ? 'Saving...' : 'Confirm'}</Button>
    {!props.addressFieldVisible &&
      <Button
        block
        outline
        size="lg"
        color="info"
        className="edit"
        style={{backgroundColor: '#EFEFEF'}}
        onClick={props.toggleAddressField}
      >This Is Not Correct, Edit Address</Button>
    }
    <style jsx>{`
      .map-image{
        display:block;
        height: 265px;
        width: 100%;
        margin: 0 0 35px 0;
        overflow:hidden;
      }

      .claim-listing{
        margin-bottom: 20px;
        font-weight: bold;

        .claim{
          cursor: pointer;
          text-decoration: underline;
        }
      }

      :global(.edit) {
        background-color: #EFEFEF !important;
        &:hover {
          background-color: #0098a8 !important;
        }
      }
    `}</style>
  </Form>
)

export default ConfirmAddressForm
