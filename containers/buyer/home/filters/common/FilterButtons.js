import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { isMobile } from 'react-device-detect';

import { truncateText } from '../helpers/utils';

export const FilterCollapseButton = ({ hideDropdown }) => {
  return (
    <Fragment>
      {!isMobile && (
        <Button id='filters_bottom_button' onClick={hideDropdown}>
          Done
        </Button>
      )}
    </Fragment>
  );
};

export const ModalRevealButton = ({ toggle, filterText, defaultText }) => {
  return (
    <Button
      color="#fff"
      onClick={toggle}
      className={`filter_style ${filterText !== defaultText && 'active'}`}
    >
      {truncateText(filterText, 19)}
    </Button>
  );
};

export const FilterRevealButton = ({ filterText, defaultText }) => {
  return (
    <Button
      color='#fff'
      className={`filter_style ${filterText !== defaultText && 'active'}`}
    >
      {truncateText(filterText, 19)}
    </Button>
  );
};

FilterCollapseButton.propTypes = {
  hideDropdown: PropTypes.func.isRequired
};

FilterRevealButton.propTypes = {
  filterText: PropTypes.string.isRequired,
  defaultText: PropTypes.string.isRequired
};

ModalRevealButton.propTypes = {
  toggle: PropTypes.func,
  filterText: PropTypes.string.isRequired,
  defaultText: PropTypes.string.isRequired
};
