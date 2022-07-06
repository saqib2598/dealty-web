import React from 'react'
import { Field } from 'react-final-form'
import { Alert } from 'reactstrap'
import InputAdapter from '../InputAdapter'
import { required } from '../../lib/validators'
import SelectAdapter from '../SelectAdapter'
import { SURVEY_QUESTIONS } from '../../static/data/constants'

const LoanOfficerRegistrationFields = (props) => {
  return (
    <>
      <hr className="dashed" />
      <h2>Loan Officer</h2>
      <Field
      id="company"
      name="company"
      label="Add your Company*"
      type="text"
      component={InputAdapter}
      validate={required}
      />
      <Field
        id="lisence"
        name="lisence"
        label="Lisence Number*"
        type="text"
        component={InputAdapter}
        validate={required}
      />
      <Field
        id="bio"
        name="bio"
        label="Add your Bio*"
        type="textarea"
        rows={5}
        component={InputAdapter}
        validate={required}
      />
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

export default LoanOfficerRegistrationFields
