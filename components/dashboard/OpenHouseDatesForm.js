import React from 'react'
import { Button, Form, Alert, Row, Col } from 'reactstrap'
import { Field } from 'react-final-form'
import { required } from '../../lib/validators'
import DatePickerAdapter from '../DatePickerAdapter'
import InputAdapter from '../InputAdapter'
import { alertStyle } from '../../components/modals/styles/Modal'

const OpenHouseDatesForm = ({user, ...props}) => (
  <Form onSubmit={props.handleSubmit}>
    {
      props.success !== '' &&
        <Alert color={props.success == 'Open House Date Added Successfully!!!' ? 'success' : 'danger'} style={alertStyle}>{props.success}</Alert>
    }
    <Row>
      <Col className='col-md-4'>
        <Field
          id="openDate"
          name="OpenDate"
          label="Open Date*"
          className="form-control"
          minDate = {new Date()}
          component={DatePickerAdapter}
          validate={required}
        />
      </Col>
      <Col className='col-md-4'>
        <Field
          id="StartTime"
          name="StartTime"
          label="Start Time*"
          placeholderText="Select Time..."
          component = {DatePickerAdapter}
          validate={required}
          className="form-control"
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeFormat="HH:mm"
          timeCaption="time"
          dateFormat='h:mm a'
        />
      </Col>
      <Col className='col-md-4'>
        <Field
          id="EndTime"
          name="EndTime"
          label="End Time*"
          placeholderText="Select Time..."
          component = {DatePickerAdapter}
          validate={required}
          className="form-control"
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeFormat="HH:mm"
          timeCaption="time"
          dateFormat='h:mm a'
        />
      </Col>
    </Row>
    <div className="clearfix">
      <Button
        block
        size="lg"
        color="secondary"
        disabled={(props.submitting)}
        type="submit"
      >{props.submitting ? 'Updating ...' : 'Update'}</Button>
    </div>
    <hr/>

    <style jsx>{`
      .clearfix{
        padding-top: 15px;
      }
      h3{
        margin: 0 auto 0px auto;
        text-align: center;
      }
      p{
        text-align: center;
      }
      .icon-style{
        text-align: center;
      }
      @media only screen and (max-width: 767px)
      {
        .wrap-text{
          overflow-wrap: break-word;
        }
        :global(.row){
          flex-direction: column;
        }
      }
    `}</style>
  </Form>
)

export default OpenHouseDatesForm
