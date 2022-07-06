import React from 'react'
import { Button, Form, Alert } from 'reactstrap'
import { Field } from 'react-final-form'
import LogoSvg from '../images/logo-header'
import InputAdapter from '../InputAdapter'

const ForgotPasswordForm = (props) => (
  <Form onSubmit={props.handleSubmit}>
    <div className="text-center brand">
        <a className="brand-logo" href="/" title="Logo">
          <LogoSvg />
        </a>
    </div>
    <h1 className="text-center">Forgot Password</h1>
    {props.alert &&
      <Alert color="success">{props.alert}</Alert>
    }


    <Field
      id="email"
      name="email"
      label="Email"
      type="email"
      component={InputAdapter}
    />
    <div className="clearfix">
        <Button
          block
          size="lg"
          color="primary"
          disabled={props.submitting}
          type="submit"
        >{props.submitting ? 'Sending...' : 'Request Reset'}</Button>
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

export default ForgotPasswordForm
