import React, { useState } from 'react'
import { Alert, Button, Row, Col, Form } from 'reactstrap'
import { Field } from 'react-final-form'
import InputAdapter from '../InputAdapter'
import { match, required } from '../../lib/validators'
import LogoSvg from '../images/logo-header'
import PhoneInputAdapter from '../PhoneInputAdapter'
import SelectAdapter from '../SelectAdapter'
import { USER_TYPES, SELLER_TYPES, SURVEY_QUESTIONS, STATES } from '../../static/data/constants'
import SellerRegistrationFields from '../signup/SellerRegistrationFields'
import BuyerRegistrationFields from '../signup/BuyerRegistrationFields'
import LoanOfficerRegistrationFields from '../signup/LoanOfficerRegistrationFields'
import '../../styles/_register-form.scss'

const RegisterForm = (props) => {
  const userType = document.getElementById('userType')

  return (
    <Form onSubmit={props.handleSubmit}>
      <div className="text-center brand">
          <a className="brand-logo"  href="/" title="Logo">
            <LogoSvg />
          </a>
      </div>
      <h1 className="h2">Sign Up</h1>
      <hr className="dashed" />
      <Field
        id="email"
        name="email"
        label="Email Address*"
        type="email"
        component={InputAdapter}
        validate={required}
      />
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
      <Field
        id="phone"
        name="phone"
        label="Phone Number*"
        placeholder="+1 (___) ___-____"
        type="tel"
        className="form-control"
        component={PhoneInputAdapter}
        validate={required}
      />
      <Field
        id="userType"
        name="userType"
        type="select"
        component={SelectAdapter}
        options={USER_TYPES}
        label="Signing Up As"
        selectedType={userType}
        validate={required}
      />
      {userType ?
        userType.value === "buyer" ? <BuyerRegistrationFields {...props} />
          : userType.value === "seller" ? <SellerRegistrationFields {...props} />
          : userType.value === "loan-officer" ? <LoanOfficerRegistrationFields {...props} />
          : null
        : null
      }
      <hr className="dashed" />
      <Button
        block
        size="lg"
        color="primary"
        disabled={props.submitting}
        type="submit"
      >{props.submitting ? 'Saving...' : 'Continue'}</Button>
      <p className="terms">By continuing above you agree to our <a href="/terms" target="_blank">Terms & Services</a>.</p>
    </Form>
  )
}

export default RegisterForm
