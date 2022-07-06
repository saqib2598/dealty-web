import React from 'react'
import { Button, Row, Col, Form } from 'reactstrap'
import { Field } from 'react-final-form'
import InputAdapter from '../InputAdapter'
import PropTypes from 'prop-types'
import { match, required } from '../../lib/validators'
import { Alert } from 'reactstrap'

const MyAccountUpdateForm = ({alert, confirmation, ...props}) => (
  <Form onSubmit={props.handleSubmit}>
    <h3>Account Info</h3>
    {confirmation && <Alert color="success" className="text-center mt-4">{confirmation}</Alert>}
    <Field
      id="email"
      name="email"
      label="Email Address*"
      type="email"
      component={InputAdapter}
      validate={required} >
      <small>Confirmation email will be sent to this address, Please confirm to continue</small>
    </Field>
    <Field
      id="password"
      name="password"
      label="Password*"
      type="password"
      component={InputAdapter}
      validate={required}
    />
    <Field
      id="passwordConfirmation"
      name="passwordConfirmation"
      label="Confirm Password*"
      type="password"
      component={InputAdapter}
      validate={match('password', 'Passwords')}
    />
    <Row>
      <Col xs="12" sm="6">
        <Field
          id="firstName"
          name="firstName"
          label="First Name*"
          type="text"
          component={InputAdapter}
          validate={required}
        />
      </Col>
      <Col xs="12" sm="6">
        <Field
          id="lastName"
          name="lastName"
          label="Last Name*"
          type="text"
          component={InputAdapter}
          validate={required}
        />
      </Col>
    </Row>
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
      >{props.submitting ? 'Saving Info...' : 'Update Account Info'}</Button>
    </div>
    {alert && <Alert color="success" className="text-center mt-4">{alert}</Alert>}
    <style jsx>{`
      .clearfix{
        padding-top: 15px;
      }
      h3{
        margin: 0 auto 20px auto;
        text-align:center;
      }
    `}</style>
  </Form>
)

MyAccountUpdateForm.propTypes = {
  alert: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  submitError: PropTypes.any,
  submitFailed: PropTypes.bool,
  submitting: PropTypes.bool,
  confirmation: PropTypes.string
}

export default MyAccountUpdateForm
