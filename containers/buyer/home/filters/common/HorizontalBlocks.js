import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { ButtonGroup } from 'reactstrap';

import {
  bedsList,
  bathsList,
} from '../../../../../static/data/filter_constants';

const CustomField = ({
  optionsList,
  fieldName,
  setFieldValue,
  selectedValue,
  handleSubmit
}) => {
  return (
    <div className='price-filter-elements'>
      <ButtonGroup>
        {optionsList.map((option, index) => (
          <Field
            type='submit'
            id='radio_button'
            color='#fff'
            key={index}
            className={selectedValue === option.value && 'selected_button'}
            name={fieldName}
            onClick={() => {
              setFieldValue(fieldName, option.value)
              handleSubmit()
            }}
            value={option.label}
          />
        ))}
      </ButtonGroup>
    </div>
  );
};

export const HorizontalBlocks = ({
  setFieldValue,
  values,
  handleSubmit,
}) => {
  return (
    <Fragment>
      <p className="filter_title bath_title">Bedrooms</p>
      <CustomField
        optionsList={bedsList}
        fieldName="beds"
        setFieldValue={setFieldValue}
        selectedValue={values.beds}
        handleSubmit={handleSubmit}
      />
      <p className="filter_title bath_title">Bathrooms</p>
      <CustomField
        optionsList={bathsList}
        fieldName="baths"
        setFieldValue={setFieldValue}
        selectedValue={values.baths}
        handleSubmit={handleSubmit}
      />
    </Fragment>
  );
};

HorizontalBlocks.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired
};

CustomField.propTypes = {
  optionsList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  fieldName: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  selectedValue: PropTypes.number.isRequired,
};
