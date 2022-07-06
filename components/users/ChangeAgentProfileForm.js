import React from 'react'
import { Button, Form, Alert, Row, Col } from 'reactstrap'
import { Field } from 'react-final-form'
import { required } from '../../lib/validators'
import InputAdapter from '../InputAdapter'
import SelectAdapter from '../SelectAdapter'
import { STATES } from '../../static/data/constants'

const ChangeAgentProfileForm = ({alert, user, ...props}) => (
  <Form onSubmit={props.handleSubmit}>
    {props.submitError &&
      <Alert color="danger" >{props.submitError}</Alert>
    }
    {props.submitSucceeded &&
      <Alert color="success" isOpen={props.visible}>Your Profile updated successfully!</Alert>
    }
    <Row>
      <Col className='col-md-6'>
        <Field
          id="state"
          name="state"
          type="select"
          component={SelectAdapter}
          options={STATES}
          label="State*"
          validate={required}
        />
      </Col>
      <Col className="col-md-6">
        <Field
          id="agentLicenseNumber"
          name="AgentLicenseNumber"
          label="License Number*"
          type="text"
          placeholder="Enter License Num..."
          component={InputAdapter}
          validate={required}
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
      >{props.submitting ? 'Updating Profile...' : 'Update Profile'}</Button>
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
      }
    `}</style>
  </Form>
)

export default ChangeAgentProfileForm
