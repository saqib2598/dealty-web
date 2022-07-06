import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

export const SingleInputField = ({
  title,
  placeHolder,
  fieldName,
  handleBlur,
  submitForm,
}) => {
  return (
    <div className='more_filters_row'>
      <p className='more_filter_title more_filters_col'>{title}</p>
      <div className='more_filters_col more_filters_select'>
        <Field
          id='single_input'
          placeholder={placeHolder}
          name={fieldName}
          onBlur={(e) => {
            handleBlur(e);
            submitForm();
          }}
        />
      </div>
    </div>
  );
};

SingleInputField.propTypes = {
  title: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  handleBlur: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
};
