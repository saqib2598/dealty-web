import React from 'react'
import {
  Alert,
  Form,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Label,
  Col,
  Input,
  Row
} from 'reactstrap'
import { required } from '../../lib/validators'
import { alertStyle } from './styles/Modal'
import UnSignedInUser from '../UnSignedInUser'

const EmailFlyerForm = props => {
  const {
    success,
    submitting,
    toggleEmailFlyer,
    openEmailFlyer,
    selectedEmail,
    handleChange,
    handleUpdate,
    isSignedIn
  } = props;

  return (
    <div className="modal-form">
      <Modal isOpen={ openEmailFlyer } toggle={toggleEmailFlyer}>
        <ModalHeader toggle={toggleEmailFlyer}></ModalHeader>
        <ModalBody>
          <h4 style={{textAlign: 'center'}} className="modal-heading">Email Flyer</h4>
          {
            success !== '' &&
              <Alert color={success == 'Listing Flyer Sent Successfully!!!' ? 'success' : 'danger'} style={alertStyle}>{success}</Alert>
          }
          {isSignedIn &&
            <Form>
              <div className="row form-group">
                <Label sm={2} size="lg">Email*</Label>
                <Col sm={10}>
                  <Input
                    type="email"
                    onChange={handleChange}
                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                    placeholder="Email"
                    validate={required}
                  />
                </Col>
              </div>
            </Form>
          }
          {!isSignedIn &&
            <UnSignedInUser />
          }
        </ModalBody>
        {isSignedIn &&
          <ModalFooter>
            <Button color="primary" type="submit" onClick={handleUpdate}>Email Flyer</Button>
          </ModalFooter>
        }
      </Modal>
    </div>
  )
}

export default EmailFlyerForm
