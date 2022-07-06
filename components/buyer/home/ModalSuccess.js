import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap'
import '../../../styles/_modal-success.scss'

const modalSuccess = (props) => {
  return (
    <div className="modal-form">
      <Modal size="lg" isOpen={props.isOpen} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}></ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              {props.home === undefined ?
                <h4>Your message has been submitted successfully. <span className="user-firstname">{props.user.firstName[0].toUpperCase() + props.user.firstName.slice(1)}</span> will be in contact with you soon.</h4>
                :
                <h4>Your message has been submitted successfully. <span className="user-firstname">{props.home.owner.firstName[0].toUpperCase() + props.home.owner.firstName.slice(1)}</span> will be in contact with you soon.</h4>
              }
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

modalSuccess.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element
  ]).isRequired,
  home: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default modalSuccess;
