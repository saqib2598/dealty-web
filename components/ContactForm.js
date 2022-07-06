import React from 'react'
import { Button, Form } from 'reactstrap'
import { Field } from 'react-final-form'
import { required } from '../lib/validators'
import InputAdapter from './InputAdapter'
import { reasons } from '../data/reasons'
import SelectAdapter from './SelectAdapter'

const ContactForm = (props) => (
  <Form onSubmit={props.handleSubmit}>
    <Field
      id="yourName"
      name="name"
      label="Your Name*"
      type="text"
      component={InputAdapter}
      validate={required}
    />
    <Field
      id="email"
      name="email"
      label="Email Address*"
      type="email"
      component={InputAdapter}
      validate={required}
    />
    <Field
      id="address"
      name="address"
      label="Your Address*"
      type="text"
      component={InputAdapter}
      validate={required}
    />
    <Field
      id="reason"
      name="reason"
      label="Select Reason For Contacting Us*"
      type="select"
      component={SelectAdapter}
      validate={required}
      options={reasons}
      placeholder="Select Reason For Contacting Us..."
    />
    <Field
      id="message"
      name="message"
      hideLabel
      component={InputAdapter}
      validate={required}
      type="textarea"
      placeholder="Enter your message here..."
    />
    {props.submitFailed &&
    <div className="text-danger">{props.submitError}</div>
    }
    <div className="clearfix">
    <Button
      block
      size="lg"
      color="secondary"
      disabled={props.submitting}
      type="submit"
    >{props.submitting ? 'Sending...' : 'Submit'}</Button>
    </div>
    <style jsx>{`
      form{
        width:100%;
      }
      .clearfix{
        padding-top:15px;
      }
    `}</style>
  </Form>
)

export default ContactForm
