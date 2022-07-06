import React from 'react'
import { Field } from 'react-final-form'
import { Form, Button } from 'reactstrap'
import { required } from '../../../lib/validators'
import ContactHomeOwnerIconSvg from '../../images/contact-home-owner-iconsvg'
import InputAdapter from '../../InputAdapter'
import DatePickerAdapter from '../../DatePickerAdapter'
import SelectAdapter from '../../SelectAdapter'
import { OFFER_TYPES } from '../../../static/data/constants'
import ReactTooltip from "react-tooltip";
import UnSignedInUser from '../../UnSignedInUser'
import ModalContainer from './ModalContainer'
import PropTypes from 'prop-types'

const SendOnlineOfferForm = props => {
  const {
    openSendOnlineOffer,
    toggleSendOnlineOffer,
    heading,
    isSignedIn,
    submitting,
    handleSubmit,
    submitFailed,
    submitError
  } = props;

  const isWeekday = (date) => {
    const day = date.day()
    return day !== 0 && day !== 6
  }

  return (
    <ModalContainer isOpen={openSendOnlineOffer} toggle={toggleSendOnlineOffer}>
      <div className="icon"><ContactHomeOwnerIconSvg /></div>
      <h4 className="modal-heading">{heading}</h4>
      {isSignedIn &&
        <Form onSubmit={handleSubmit} >
          <Field
            id="price"
            name="price"
            type="number"
            label="Offer Amount*"
            component={InputAdapter}
            validate={required}
            data-tip="Enter only numbers"
            placeholder="Enter Amount..."
          />
          <ReactTooltip effect="solid" backgroundColor="#E6E6DF" textColor="black"/>
          <Field
            id="offerType"
            name="offerType"
            label="Offer Type*"
            type="select"
            options={OFFER_TYPES}
            component = {SelectAdapter}
            validate={required}
          />
          <Field
            id="SuggestedClosingDate"
            name="SuggestedClosingDate"
            label="Suggested Closing Date*"
            component={DatePickerAdapter}
            minDate={new Date()}
            filterDate={isWeekday}
            className="form-control"
            validate={required}
          />
          <p><b>Note:</b> You are sending an offer, your name will be disclosed to them.</p>
          {submitFailed &&
            <div className="text-danger">{submitError}</div>
          }
          <Button
            block
            size="lg"
            color="secondary"
            disabled={submitting}
            type="submit"
          >{submitting ? 'Sending...' : 'Send Offer'}</Button>
        </Form>
      }

      {!isSignedIn &&
        <UnSignedInUser />
      }
    </ModalContainer>
  );
}

SendOnlineOfferForm.propTypes = {
  openSendOnlineOffer: PropTypes.bool.isRequired,
  toggleSendOnlineOffer: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool,
  submitError: PropTypes.object
}

export default SendOnlineOfferForm;
