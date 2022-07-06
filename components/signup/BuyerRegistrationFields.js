import React from 'react'
import { Field } from 'react-final-form'
import { Alert } from 'reactstrap'
import InputAdapter from '../InputAdapter'
import { required } from '../../lib/validators'
import SelectAdapter from '../SelectAdapter'
import { SURVEY_QUESTIONS } from '../../static/data/constants'

const BuyerRegistrationFields = (props) => {
  return (
    <>
      <hr className="dashed" />
      <h2>Buyer</h2>
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
    {props.submitError &&
      <Alert color="danger" >{props.submitError}</Alert>
    }
    </>
  )
}

export default BuyerRegistrationFields
