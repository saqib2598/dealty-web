import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

export const MultiCheckbox = ({
  filterText,
  optionsList,
  handleSubmit,
  fieldName
}) => {
  return (
    <Fragment>
      <p className='filter_title'>{filterText}</p>
      <ul id='checkbox-list'>
        {optionsList.map((option, index) => (
          <label key={index} type='submit' onClick={() => handleSubmit()}>
            <Field type='checkbox' name={fieldName} value={option.value} />
            {option.label}
          </label>
        ))}
      </ul>
    </Fragment>
  );
};

MultiCheckbox.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  optionsList: PropTypes.array.isRequired,
  filterText: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired
};
