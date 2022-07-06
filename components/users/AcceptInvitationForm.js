import React from 'react'
import { Row, Col, Alert, Button, Form } from 'reactstrap'
import { Field } from 'react-final-form'
import { match, required, } from '../../lib/validators'
import InputAdapter from '../InputAdapter'
import PhoneInputAdapter from '../PhoneInputAdapter'
import PropTypes from 'prop-types'
import SelectAdapter from '../SelectAdapter'
import { SELLER_TYPES, STATES } from '../../static/data/constants'

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitError: PropTypes.any,
  submitting: PropTypes.bool.isRequired,
  submitFailed: PropTypes.bool
}

const AcceptInvitationForm = (props) => (
  <Form onSubmit={props.handleSubmit}>
    <Field
      id="email"
      name="email"
      label="Email Address*"
      type="email"
      component={InputAdapter}
      validate={required}
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
    <Field
      id="sellerType"
      name="sellerType"
      type="select"
      component={SelectAdapter}
      options={SELLER_TYPES}
      label="I am"
      validate={required}
    />

    { props.values.sellerType === 'agent' &&
      <>
        <Field
            id="brokerageName"
            name="brokerageName"
            label="Brokerage Name*"
            type="text"
            component={InputAdapter}
            validate={required}
        />
        <Field
          id="state"
          name="state"
          type="select"
          component={SelectAdapter}
          options={STATES}
          label="State*"
          validate={required}
        />
        <Field
          id="agentLicenseNumber"
          name="agentLicenseNumber"
          label="Agent's License Number*"
          type="text"
          component={InputAdapter}
          validate={required}
        />
      </>
    }

    {props.submitFailed &&
    <Alert color="danger" className="text-center">{props.submitError}</Alert>
    }
    <div className="account-actions">
      <Button
        block
        size="lg"
        color="primary"
        disabled={props.submitting}
        type="submit"
      >{props.submitting ? 'Setting Account...' : 'Set Account'}</Button>
    </div>
  </Form>
)
AcceptInvitationForm.propTypes = propTypes

export default AcceptInvitationForm
