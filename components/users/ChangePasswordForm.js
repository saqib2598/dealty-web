import React from 'react'
import { Button, Form, Alert } from 'reactstrap'
import { Field } from 'react-final-form'
import InputAdapter from '../InputAdapter'

const ChangePasswordForm = ({alert, user, ...props}) => (
  <Form onSubmit={props.handleSubmit}>
    {props.submitError &&
      <Alert color="danger" >{props.submitError}</Alert>
    }
    {props.submitSucceeded &&
      <Alert color="success" isOpen={props.visible}>Your Password updated successfully!</Alert>
    }
    <Field
      id="currentPassword"
      name="currentPassword"
      label="Current Password *"
      placeholder="Current Password"
      type="password"
      component={InputAdapter}
    />
    <Field
      id="password"
      name="password"
      label="New Password *"
      placeholder="New Password"
      type="password"
      component={InputAdapter}
    />
    <Field
      id="passwordConfirmation"
      name="passwordConfirmation"
      label="Confirm New Password *"
      placeholder="Confirm New Password"
      type="password"
      component={InputAdapter}
    />
    <div className="clearfix">
      <Button
        block
        size="lg"
        color="secondary"
        disabled={(props.submitting)}
        type="submit"
      >{props.submitting ? 'Changing Password...' : 'Change Password'}</Button>
    </div>
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
export default ChangePasswordForm
