import React from 'react'
import { Button, Form, Collapse } from 'reactstrap'
import { Field } from 'react-final-form'
import AddressAdapter from '../AddressAdapter'
import { required } from '../../lib/validators'
import GoogleMapImage from '../GoogleMapImage'
import LogoSvg from '../images/logo-header'
import InputAdapter from '../InputAdapter'

const ConfirmAddressForm = (props) => (
  <Form onSubmit={props.handleSubmit}>
    <div className="text-center brand">
      <LogoSvg />
    </div>
    <h1 className="h2">Confirm Address</h1>
    <hr className="dashed" />
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
      <div className="text-danger">{props.submitError}</div>
    }
    <Button
      block
      size="lg"
      color="primary"
      disabled={props.submitting}
      type="submit"
    >{props.submitting ? 'Saving...' : 'Confirm'}</Button>
    {!props.addressFieldVisible &&
      <Button
        block
        outline
        size="lg"
        color="primary"
        onClick={props.toggleAddressField}
      >This Is Not Correct, Edit Address</Button>
    }
    <style jsx>{`
    @import "styled-jsx-helper";
      .brand{
        padding:0 0 20px 0;
      }
      h1{
        margin:0 auto;
        text-align:center;
      }
      .map-image{
        display:block;
        height: 265px;
        width: 100%;
        margin: 0 0 35px 0;
        overflow:hidden;
      }
      @include media-breakpoint-up(md) {
        .brand{
          padding:90px 0 20px 0;
        }
        h1{
          margin:40px auto 0 auto;
        }
      }
    `}</style>
  </Form>
)

export default ConfirmAddressForm
