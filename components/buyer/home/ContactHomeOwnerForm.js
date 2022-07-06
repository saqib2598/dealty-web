import React from 'react'
import { Field } from 'react-final-form'
import { Button, Form } from 'reactstrap'
import { required } from '../../../lib/validators'
import ContactHomeOwnerIconSvg from '../../images/contact-home-owner-iconsvg'
import InputAdapter from '../../InputAdapter'
import PhoneInputAdapter from '../../PhoneInputAdapter'
import UnSignedInUser from '../../UnSignedInUser'
import ModalContainer from './ModalContainer'
import PropTypes from 'prop-types'

const ContactHomeOwnerForm = props => {
  const {
    openContactHomeownerMessage,
    toggleHomeownerContact,
    heading,
    isSignedIn,
    home,
    note,
    submitting,
    handleSubmit,
    submitFailed,
    submitError
  } = props;

  return (
    <ModalContainer isOpen={openContactHomeownerMessage} toggle={toggleHomeownerContact}>
      <div className="icon"><ContactHomeOwnerIconSvg /></div>
      <h4 className="modal-heading">{heading}</h4>
      {isSignedIn &&
        <Form onSubmit={handleSubmit} >
          <Field
            id="email"
            name="email"
            label="Email Address*"
            type="email"
            component={InputAdapter}
            validate={required}
          />
          <Field
            id="phone"
            name="phone"
            label="Phone No*"
            placeholder="+1 (___) ___-____"
            type="tel"
            className= "form-control"
            validate={required}
            component={PhoneInputAdapter}
          />
          {home.owner.signInCount <= 0 &&
            note
          }

          <Field
            id="message"
            name="message"
            hideLabel
            component={InputAdapter}
            validate={required}
            type="textarea"
            rows={8}
            placeholder="Enter your message here..."
          />
          {submitFailed &&
            <div className="text-danger">{submitError}</div>
          }
          <Button
            block
            size="lg"
            color="secondary"
            disabled={submitting}
            type="submit"
          >{submitting ? 'Sending...' : 'Send Message'}</Button>
        </Form>
      }

      {!isSignedIn &&
        <UnSignedInUser />
      }
    </ModalContainer>
  );
}

ContactHomeOwnerForm.propTypes = {
  openContactHomeownerMessage: PropTypes.bool.isRequired,
  toggleHomeownerContact: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  home: PropTypes.object.isRequired,
  note: PropTypes.string.isRequired,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool,
  submitError: PropTypes.string
}

export default ContactHomeOwnerForm;
