import React from 'react';
import {Field, FormSpy} from 'react-final-form';
import {Form} from 'reactstrap';

import SearchSvg from '../../images/search';
import AddressAdapter from '../../AddressAdapter';
import PropTypes from 'prop-types';

const FilterForm = ({handleSubmit, handleSelect, place, handleFilters}) => {
  const onChange = async (formState) => {
    const values = formState.values;
    handleFilters(values);
  };
  return (
    <Form onSubmit={handleSubmit} className="filter-form">
      <FormSpy onChange={(state) => onChange(state)} />
      <div className="no-gutters">
        <div className="filter-cols filter-row border-bottom border-light">
          <div className="search__content">
            <span className="search__input-icon">
              <SearchSvg size="12" />
            </span>
            <Field
              id="place"
              name="place"
              type="text"
              placeholder="Search ..."
              keyword={place}
              component={AddressAdapter}
              handleSelect={handleSelect}
            />
          </div>
        </div>
      </div>
    </Form>
  );
};

FilterForm.propTypes = {
  handleSubmit: PropTypes.func,
  handleFilters: PropTypes.func,
  onChange: PropTypes.func,
  handleSelect: PropTypes.func,
  place: PropTypes.string,
  openDateRange: PropTypes.func,
  reset: PropTypes.bool,
  values: PropTypes.array,
};

export default FilterForm;
