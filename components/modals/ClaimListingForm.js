import { Alert, Form, Button, ModalBody, ModalHeader, ModalFooter, Input } from 'reactstrap'
import { required } from '../../lib/validators'
import InputAdapter from '../InputAdapter'
import { Field } from 'react-final-form'
import { alertStyle } from '../../containers/dashboard/styles/Modal'
import Countdown from 'react-countdown-now';

const ClaimListingForm = (props) => {
  const { resendCode } = props
  return(
      <Form onSubmit={props.handleSubmit}>
        <ModalHeader className="text-center">Claim Listing</ModalHeader>
        <ModalBody>
          {props.submitFailed &&
            <div className="text-danger">{props.submitError}</div>
          }

          {props.listing_claimed &&
            <Alert color="success" style={alertStyle}>You have claimed listing successfully</Alert>
          }
          <div>Verification code has been sent to owner's phone
            <strong>{props.listing.contact}</strong>
          </div>
          <Input
            id="code"
            name="code"
            type="text"
            maxLength={6}
            validate={required}
            className="mb-3"
            onChange={props.handleChange}
            placeholder="Enter Verification Code"
          />
          {!props.listing_claimed &&
            <Countdown date={Date.now() + props.seconds} onTick={props.handleTick} key={props.restart}
             renderer={props => <div>{props.completed ?
                <Button color="primary" onClick={resendCode}>Resend Code</Button>
                :
                <div>Resend Code in:
                  <strong> {props.seconds} Seconds</strong>
                </div>}</div>
              }
            />
          }
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" disabled={props.listing_claimed}>Verify</Button>
          <Button color="gray-light" onClick={props.toggleModal} disabled={props.listing_claimed}>Cancel</Button>
        </ModalFooter>
      </Form>
  )
}

export default ClaimListingForm
