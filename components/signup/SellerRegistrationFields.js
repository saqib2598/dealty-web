import React from 'react'
import { Alert } from 'reactstrap'
import { Field } from 'react-final-form'
import SelectAdapter from '../SelectAdapter'
import { SELLER_TYPES, SURVEY_QUESTIONS, STATES } from '../../static/data/constants'
import InputAdapter from '../InputAdapter'
import { required } from '../../lib/validators'

const SellerRegistrationFields = (props) => {
  return (
    <>
      <hr className="dashed" />
      <h2>Seller</h2>
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

export default SellerRegistrationFields
