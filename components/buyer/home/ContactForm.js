import React from 'react'
import { Field } from 'react-final-form'
import {
  FormGroup,
  Row,
  Col,
  Button,
  Form
} from 'reactstrap'
import { required } from '../../../lib/validators'
import InputAdapter from '../../InputAdapter'

const ContactForm = ({
  heading,
  submitting,
  handleSubmit,
}) => (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <div className="icon"><img
            alt="Contact"
            title="Contact"
            width="53"
            src="/static/images/how-it-works-a-icon.svg"
          />
            <h4 className="modal-heading">{heading}</h4>
          </div>
          <FormGroup>
            <Field
              className="form-control"
              id="reason"
              name="reason"
              component="select"
              validate={required}
            >
              <option>Reason for contact...</option>
              <option>Problem with a listing</option>
              <option>Buying inquiry</option>
              <option>Have a question</option>
              <option>Other</option>
            </Field>
          </FormGroup>
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
            id="message"
            name="message"
            hideLabel
            component={InputAdapter}
            validate={required}
            type="textarea"
            rows={10}
            placeholder="Enter your message here..."
          />
          <Button
            block
            size="lg"
            color="secondary"
            disabled={submitting}
            type="submit"
          >{submitting ? 'Sending...' : 'Send Message'}</Button>
        </Col>
      </Row>
      <style jsx>{`
        @import "styled-jsx-helper";
        .modal-heading {
          line-height: 1.89;
        }
      `}</style>
    </Form>
  )

export default ContactForm;
