import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

export const SelectFilter = ({
  title,
  name,
  optionsList,
  handleChange,
  submitForm,
}) => {
  return (
    <div className='more_filters_row'>
      <p className='more_filter_title more_filters_col'>{title}</p>
      <div className='more_filters_col more_filters_select'>
        <Field
          id='home_builder_select'
          as='select'
          placeholder='Any'
          name={name}
          onChange={(e) => {
            handleChange(e);
            submitForm();
          }}
        >
          {optionsList.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      </div>
    </div>
  );
};

SelectFilter.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  optionsList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};
