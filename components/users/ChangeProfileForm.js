import React from 'react'
import { Button, Form, Alert } from 'reactstrap'
import { Field } from 'react-final-form-html5-validation'
import InputAdapter from '../InputAdapter'
import PhoneInputAdapter from '../PhoneInputAdapter'
import { required } from '../../lib/validators'
import PropTypes from 'prop-types'
import SelectAdapter from '../SelectAdapter'
import { SELLER_TYPES } from '../../static/data/constants'

const ChangeProfileForm = ({user, handleSubmit, ...props}) => (
  <Form onSubmit={handleSubmit} id="change-profile-form">
    <h3 className="wrap-text">{user.firstName + ' ' + user.lastName}</h3>
    <p>{user.email}</p>
    {props.submitError &&
      <Alert color="danger" >{props.submitError}</Alert>
    }
    {props.submitSucceeded &&
      <Alert color="success" isOpen={props.visible}>Your Profile updated successfully!</Alert>
    }
    <Field
      id="firstName"
      name="user[first_name]"
      label="First Name *"
      type="text"
      validate={required}
      component={InputAdapter}
    />
    <Field
      id="lastName"
      name="user[last_name]"
      label="Last Name *"
      type="text"
      validate={required}
      component={InputAdapter}
    />
    <Field
      id="phone"
      name="user[phone]"
      label="Phone *"
      type="tel"
      className= "form-control"
      placeholder="+1 (___) ___-____"
      validate={required}
      component={PhoneInputAdapter}
    />
    <Field
      id="email"
      name="user[email]"
      label="Email *"
      type="text"
      validate={required}
      component={InputAdapter} >
        <small>Email will be changed once you confirm it through received email</small>
    </Field>
    {user.seller && 
      <Field
        id="sellerType"
        name="user[seller_attributes][sellerType]"
        type="select"
        component={SelectAdapter}
        options={SELLER_TYPES}
        label={`I am ${user.seller.sellerType}`}
      />
    }
    {user.seller && (props.values.user.seller_attributes.sellerType === 'agent') &&
      <Field
        id="brokerageName"
        name="user[seller_attributes][brokerage_name]"
        label="Brokerage Name *"
        type="text"
        validate={required}
        component={InputAdapter}
      />
    }
    {user.seller && ['agent', 'investor'].includes(props.values.user.seller_attributes.sellerType) &&
      <Field
        id="bio"
        name="user[seller_attributes][bio]"
        label="Bio"
        type="textarea"
        maxLength={250}
        component={InputAdapter} >
          <small>You can write upto 250 chracters</small>
      </Field>
    }

    <div className="clearfix">
      <Button
        block
        size="lg"
        color="secondary"
        disabled={(props.submitting )}
        type="submit"
      >{props.submitting ? 'Saving...' : 'Save'}</Button>
    </div>
    <style jsx>
      {`
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
        @media only screen and (max-width: 767px)
        {
          .wrap-text{
            overflow-wrap: break-word;
          }
        }
      `}
    </style>
  </Form>
)

ChangeProfileForm.propTypes = {
  user: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitError: PropTypes.any,
  submitSucceeded: PropTypes.bool,
  visible: PropTypes.bool,
  submitting: PropTypes.bool,
}

export default ChangeProfileForm
