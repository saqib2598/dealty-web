import React  from 'react'
import { Button, Form, Alert } from 'reactstrap'
import { Field } from 'react-final-form'
import LogoSvg from '../images/logo-header'
import InputAdapter from '../InputAdapter'

const ResetPasswordForm = (props) => (
  <Form onSubmit={props.handleSubmit}>
    <div className="text-center brand">
        <a className="brand-logo" href="/" title="Logo">
          <LogoSvg />
        </a>
    </div>
    <h1 className="text-center">Reset Password</h1>
    <Field
      id="password"
      name="password"
      label="Password"
      type="password"
      component={InputAdapter}
    />
    <Field
      id="passwordConfirmation"
      name="passwordConfirmation"
      label="Confirm Password"
      type="password"
      component={InputAdapter}
    />
    {props.submitFailed &&
      <Alert color="danger">{props.submitError}</Alert>
    }
    <div className="clearfix">
        <Button
          block
          size="lg"
          color="primary"
          type="submit"
          disabled={props.submitting}
        >Save New Password</Button>
    </div>
    <style jsx>{`
      .brand{
        padding-bottom: 20px;
      }
      .brand-logo :global(svg){
        display:block;
        max-width: 100%;
        margin: 0 auto;
      }
      .clearfix{
        padding-top: 15px;
      }
      h1{
        font-size: 36px;
        margin: 0 auto 30px auto;
      }
    `}</style>
  </Form>
)

export default ResetPasswordForm
