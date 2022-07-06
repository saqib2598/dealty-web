import React from 'react'
import { Button, Form, Input, Label } from 'reactstrap'
import { Field } from 'react-final-form'
import AddressAdapter from '../AddressAdapter'
import InputAdapter from '../InputAdapter'
import { required } from '../../lib/validators'

const AddressForm = ({handleSubmit, handleSelect, submitError, submitFailed, submitting, onClick, handleChange, err, address2 }) =>
(
  <Form onSubmit={handleSubmit}>
    <Field
      id="address"
      name="address"
      label="Your Property Address*"
      placeholder="Your Property Address"
      type="text"
      component={AddressAdapter}
      addProperty={true}
      handleSelect={handleSelect}
      validate={required}
    />
    <Label>Address 2</Label>
    <Input
      id="address2"
      name="address2"
      type="text"
      placeholder="Apartment, suite, other"
      onChange={handleChange}
      value={address2}
      component={InputAdapter}
    />
    <hr className="dashed" />
    {err &&
      <div className="text-danger">{err}</div>
    }
    <Button
      block
      size="lg"
      color="info"
      disabled={submitting}
      type="submit"
      onClick={onClick}
    >{submitting ? 'Saving...' : 'Continue'}</Button>
    <p>By continuing above you agree to our <a href="/terms" target="_blank">Terms & Services</a>.</p>
    <style jsx>{`
      p{
        font-size: 14px;
        text-align: center;
      }
    `}</style>
  </Form>
)

export default AddressForm
