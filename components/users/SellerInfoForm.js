import React  from 'react'
import { Button, Form, Alert } from 'reactstrap'
import { Field } from 'react-final-form'
import InputAdapter from '../InputAdapter'
import { required } from '../../lib/validators'
import SelectAdapter from '../SelectAdapter'
import { SELLER_TYPES, SURVEY_QUESTIONS, STATES } from '../../static/data/constants'

const SellerInfoForm = (props) => (
  <Form onSubmit={props.handleSubmit}>
    <h1>Welcome To Dealty</h1>
    <h2>Complete Your Profile</h2>
    <hr className="dashed" />
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

    {props.submitError &&
      <Alert color="danger" >{props.submitError}</Alert>
    }
    <hr className="dashed" />
    {props.submitError &&
      <Alert color="danger" >{props.submitError}</Alert>
    }
    <Button
      block
      size="lg"
      color="secondary"
      disabled={props.submitting}
      type="submit"
    >{props.submitting ? 'Saving...' : 'Continue'}</Button>
    <style jsx>{`
    @import "styled-jsx-helper";
      .brand{
        padding: 0 0 20px 0;
        &-logo{
          color: $brand-darker-teal;
        }
      }
      p{
        font-size: 14px;
        text-align: center;
      }
      h1{
        margin:0 auto;
        text-align: center;
        color: $title-light-color;
      }
      @include media-breakpoint-up(md) {
        .brand{
          padding: 90px 0 20px 0;
        }
        h1{
          margin: 40px auto 0 auto;
        }
      }
    `}</style>
  </Form>

)

export default SellerInfoForm
