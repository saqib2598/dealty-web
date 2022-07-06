import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Modal,
  ModalBody
} from 'reactstrap';

import { CustomButtonGroup } from './common/ButtonGroup';
import { MoreFiltersContent } from './common/MoreFiltersContent';
import { FilterRevealButton, ModalRevealButton } from './common/FilterButtons';
import { moreText } from '../../../../static/data/filter_constants';

export const MoreFilters = ({ updateFilters, filters }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterText, setFilterText] = useState('More');
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const toggleDropDown = () => setShowDropdown(!showDropdown);
  const resetFilters = () => {
    updateFilters(null);
    setFilterText('More');
  };

  const CustomDropDown = () => {
    return (
      <Dropdown isOpen={showDropdown} toggle={toggleDropDown}>
        <DropdownToggle tag="span">
          <FilterRevealButton filterText={filterText} defaultText={moreText} />
        </DropdownToggle>
        <DropdownMenu align="center">
          <MoreFiltersContent
            filters={filters}
            updateFilters={updateFilters}
            toggleDropDown={toggleDropDown}
            resetFilters={resetFilters}
            setFilterText={setFilterText}
          />
        </DropdownMenu>
      </Dropdown>
    );
  };

  const CustomModal = () => {
    return (
      <Fragment>
        <ModalRevealButton
          toggle={toggleModal}
          filterText={filterText}
          defaultText={moreText}
        />
        <Modal isOpen={showModal} toggle={toggleModal}>
          <CustomButtonGroup
            btnId="modal_top_btns"
            toggle={toggleModal}
            resetFilters={resetFilters}
          />
          <ModalBody>
            <MoreFiltersContent
              filters={filters}
              updateFilters={updateFilters}
              resetFilters={resetFilters}
              setFilterText={setFilterText}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  };

  return (
    <Fragment>{!isMobile ? <CustomDropDown /> : <CustomModal />}</Fragment>
  );
};

MoreFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  updateFilters: PropTypes.func.isRequired
};
