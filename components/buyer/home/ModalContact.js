import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap'

const modalContact = (props) => (
  <div className="modal-form">
    <Modal size="md" isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}></ModalHeader>
      <ModalBody>
        <Row>
          <Col>
            {props.children}
          </Col>
        </Row>
      </ModalBody>
    </Modal>
    <style jsx>{`
      @import "styled-jsx-helper";
      :global(.modal-content){
        padding: 25px;
      }
      :global(.modal-heading){
        font-size: 27px;
        text-align: center;
        color: $title-light-color;
        padding-top: 5px;
        padding-bottom:10px;
      }
      :global(.modal-header){
        border-bottom: none !important;
        margin-top: -58px;
        margin-bottom: -20px;
        margin-right: -54px;
      }
      :global(.close){
        border-radius: 50%;
      }
      :global(.icon){
        text-align: center;
        padding-top: 35px;
      }
      :global(.modal-header .close){
        padding: 0;
        margin: 0px;
        opacity: 1;
        color: $white;
        background: $contact-homeowner-model-close;
        width: 40px;
        height: 40px;
        outline: none;
      }
      :global(.modal-header .close:hover,
        .modal-header .close:focus){
        opacity: 1 !important;
        color: $white !important;
      }
      :global(.modal-header .close span){
        text-shadow: none;
      }
    `}</style>
  </div>
)

modalContact.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element
  ]).isRequired
}

export default modalContact;
