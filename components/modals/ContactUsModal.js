import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import { Link } from '../../routes';

export const ContactUsModal = ({ isOpen, toggleContactUsModal }) => (
  <Modal className='dashboard-modal' isOpen={isOpen}>
    <ModalHeader toggle={toggleContactUsModal}></ModalHeader>
    <ModalBody>
      The property can be updated through MLS or if there is an error on your
      listing, please
      <Link to='/contact'>
        <a> Contact Us</a>
      </Link>.
    </ModalBody>
  </Modal>
);

ContactUsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleContactUsModal: PropTypes.func.isRequired,
};
