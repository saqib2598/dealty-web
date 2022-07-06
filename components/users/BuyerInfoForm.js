import React  from 'react'
import { Button, Form, Alert } from 'reactstrap'
import { Field } from 'react-final-form'
import InputAdapter from '../InputAdapter'
import { required } from '../../lib/validators'
import SelectAdapter from '../SelectAdapter'
import { SURVEY_QUESTIONS } from '../../static/data/constants'

const BuyerInfoForm = (props) => (
  <Form onSubmit={props.handleSubmit}>
    <h1>Welcome To Dealty</h1>
    <h2>Complete Your Profile</h2>
    <hr className="dashed" />
    <div className="position-relative form-group">
      <label>Are you prequalified with a lender?*</label>
      <div>
        <Field
          className="form-control"
          id="lenderPrequalified"
          name="lenderPrequalified"
          component="select"
          validate={required}
        >
          <option value="">select...</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </Field>
      </div>
    </div>
    {props.values.lenderPrequalified === "true" &&
      <>
        <Field
          id="lenderName"
          name="lenderName"
          label="Lender’s Name*"
          type="text"
          component={InputAdapter}
          validate={required}
        />
        <Field
          id="lenderContact"
          name="lenderContact"
          label="Lender’s Contact*"
          placeholder="Enter Lender’s Phone Number or Email…"
          type="text"
          className="form-control"
          component={InputAdapter}
          validate={required}
        />
      </>
    }
    <Field
      id="marketedBy"
      name="marketedBy"
      type="select"
      component={SelectAdapter}
      options={SURVEY_QUESTIONS}
      label="How you heard about us ? "
      validate={required}
    />
    { props.values.marketedBy === 'other' &&
      <>
        <Field
          id="marketedSource"
          name="marketedSource"
          label="Came to know by"
          placeholder="Mention Source"
          component={InputAdapter}
          validate={required}
        />
      </>
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

export default BuyerInfoForm
