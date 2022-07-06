import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

const CustomField = ({
  fieldName,
  handleBlur,
  submitForm,
  placeHolder,
  errors,
  touched,
}) => {
  return (
    <div className='more_filters_col'>
      <Field
        id='min_price_input'
        placeholder={placeHolder}
        name={fieldName}
        onBlur={(e) => {
          handleBlur(e);
          submitForm();
        }}
        className={
          errors.hasOwnProperty(fieldName) &&
          touched.hasOwnProperty(fieldName) &&
          'input_error'
        }
      />
    </div>
  );
};

export const TwoFieldsInput = ({
  title,
  name1,
  name2,
  handleBlur,
  submitForm,
  errors,
  touched,
}) => {
  return (
    <div className='more_filters_row'>
      <p className='more_filter_title more_filters_col'>{title}</p>
      <div className='more_filters_inner_row'>
        <CustomField
          fieldName={name1}
          handleBlur={handleBlur}
          submitForm={submitForm}
          placeHolder='Min'
          errors={errors}
          touched={touched}
        />
        <span className='price_dash'>-</span>
        <CustomField
          fieldName={name2}
          handleBlur={handleBlur}
          submitForm={submitForm}
          placeHolder='Max'
          errors={errors}
          touched={touched}
        />
      </div>
    </div>
  );
};

TwoFieldsInput.propTypes = {
  title: PropTypes.string.isRequired,
  name1: PropTypes.string.isRequired,
  name2: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  handleBlur: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
};

CustomField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  handleBlur: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  placeHolder: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
};
