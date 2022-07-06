import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

export const RadioGroup = ({
  filterText,
  optionsList,
  handleSubmit,
  fieldName
}) => {
  return (
    <Fragment>
      <p className='filter_title'>{filterText}</p>
      <ul id='radio-buttons-list'>
        {optionsList.map((option) => (
          <div role='group' key={option.label}>
            <label type='submit' onClick={() => handleSubmit()}>
              <Field type='radio' name={fieldName} value={option.value} />
              {option.label}
            </label>
          </div>
        ))}
      </ul>
    </Fragment>
  );
};

RadioGroup.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  optionsList: PropTypes.array.isRequired,
  filterText: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired
};
