import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button } from 'reactstrap';

export const CustomButtonGroup = ({ btnId, toggle, resetFilters }) => {
  return (
    <ButtonGroup id={btnId} size="sm" className="mb-2">
      <Button id="done_btn" onClick={toggle}>
        Done
      </Button>
      <Button id="clear_btn" onClick={resetFilters}>
        Reset
      </Button>
    </ButtonGroup>
  );
};

CustomButtonGroup.propTypes = {
  btnId: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired
};
