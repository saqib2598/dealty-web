import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

export const SingleCheckbox = ({
  title,
  text,
  fieldName,
  handleChange,
  submitForm,
}) => {
  return (
    <div className='more_filters_row'>
      <p className='more_filter_title more_filters_col'>{title}</p>
      <div className='more_filters_col more_filters_checkbox'>
        <label
          onChange={(e) => {
            handleChange(e);
            submitForm();
          }}
        >
          <Field type='checkbox' name={fieldName} />
          {text}
        </label>
      </div>
    </div>
  );
};

SingleCheckbox.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
};
