import React from 'react'
import { Field } from 'react-final-form'
import { Button, Form } from 'reactstrap'
import InputAdapter from '../InputAdapter'
import { Link } from '../../routes'
import LogoSvg from '../images/logo-header'

const LoginForm = (props) => (
  <>
    <div className="text-center brand">
        <a className="brand-logo" href="/" title="Logo">
          <LogoSvg />
        </a>
    </div>
    <Form onSubmit={props.handleSubmit}>
      <Field
        id="email"
        name="email"
        label="Email"
        type="email"
        component={InputAdapter}
      />
      <Field
        id="password"
        name="password"
        label="Password"
        type="password"
        component={InputAdapter}
      />
      {props.submitFailed &&
        <div className="text-danger">{props.submitError}</div>
      }
      <div className="clearfix">
        <Button
          block
          size="lg"
          color="primary"
          disabled={props.submitting}
          type="submit"
        >{props.submitting ? 'Logging In...' : 'Login'}</Button>
      </div>
    </Form>
    <p className="text-center">Forgot your password? <Link route="forgot-password"><a>Reset Password?</a></Link></p>
    <p className="text-center">Don't have an account? <Link route="sign-up/index"><a>Register</a></Link></p>
    <style jsx="true">{`
      .brand{
        padding-bottom: 40px;
      }
      .brand-logo :global(svg){
        display:block;
        max-width: 100%;
        margin: 0 auto;
      }
      .clearfix{
        padding-top: 15px;
      }
      p{
        font-size: 14px;
        margin: 20px 0 0 0;
        text-align: center;
      }
      a:hover {
        color: #09c3cc;
      }
    `}</style>
  </>
)

export default LoginForm
