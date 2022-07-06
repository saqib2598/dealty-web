import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap'

const modalContainer = (props) => (
  <div className="modal-form">
    <Modal size="lg" isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}></ModalHeader>
      <ModalBody>
        <Row>
          <Col>
            {props.children}
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  </div>
)

modalContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element
  ]).isRequired
}

export default modalContainer
