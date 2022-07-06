import React from 'react'
import { Button, Form, Alert } from 'reactstrap'
import { Field } from 'react-final-form'
import times from '../../data/times'
import DatePickerAdapter from '../DatePickerAdapter'
import SelectAdapter from '../SelectAdapter'
import { required } from '../../lib/validators'
import { alertStyle } from '../../components/modals/styles/Modal'
import { PHOTOGRAPHY_PACKAGES } from '../../static/data/constants'

const SchedulePhotographerForm = (props) => (
  <Form onSubmit={props.handleSubmit}>
    <hr className="dashed"/>
    {
      props.success !== '' &&
        <Alert color='success' style={alertStyle}>{props.success}</Alert>
    }
    <h5 className="text-center">Schedule a professional photographer</h5>
    <Field
      id="packageName"
      name="packageName"
      label="Select Available Package"
      type="select"
      component={SelectAdapter}
      validate={required}
      options={PHOTOGRAPHY_PACKAGES}
    />
    <small>Pricing applies to homes up to 2500 square feet, larger homes may be more. In outside areas a travel fee may apply. Photographer will contact you directly.</small>
    {props.submitFailed &&
    <div className="text-danger">{props.submitError}</div>
    }
    <div className="clearfix">
      <Button
        block
        size="lg"
        color="info"
        disabled={(props.submitting)}
        type="submit"
      >{props.submitting ? 'Submiting...' : 'Order Now'}</Button>
    </div>
    <style jsx>{`
      .clearfix{
        padding-top: 15px;
      }
      p{
        font-size:18px;
      }
    `}</style>
  </Form>
)

export default SchedulePhotographerForm
