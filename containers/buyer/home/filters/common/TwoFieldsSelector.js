import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

const CustomField = ({ optionsList, fieldName, handleChange, submitForm }) => {
  return (
    <div className='more_filters_col'>
      <Field
        id='home_builder_2select'
        as='select'
        placeholder='Any'
        type='text'
        name={fieldName}
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
  );
};

export const TwoFieldsSelector = ({
  title,
  name1,
  name2,
  optionsList1,
  optionsList2,
  handleChange,
  submitForm,
}) => {
  return (
    <div className='more_filters_row'>
      <p className='more_filter_title more_filters_col'>{title}</p>
      <div className='more_filters_inner_row'>
        <CustomField
          optionsList={optionsList1}
          fieldName={name1}
          handleChange={handleChange}
          submitForm={submitForm}
        />
        <span className='price_dash'>-</span>
        <CustomField
          optionsList={optionsList2}
          fieldName={name2}
          handleChange={handleChange}
          submitForm={submitForm}
        />
      </div>
    </div>
  );
};

TwoFieldsSelector.propTypes = {
  title: PropTypes.string.isRequired,
  name1: PropTypes.string.isRequired,
  name2: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  optionsList1: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  optionsList2: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

CustomField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  optionsList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};
