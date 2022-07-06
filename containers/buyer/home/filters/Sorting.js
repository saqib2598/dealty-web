import React from 'react';
import { Formik, Field, Form } from 'formik';
import PropTypes from 'prop-types';

export const SortingFilter = ({ filters, updateFilters, optionsList }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        sortBy: filters.sortBy
      }}
      onSubmit={async (values) => {
        updateFilters(values);
      }}
    >
      {({ handleChange, submitForm }) => (
        <Form>
          <div id="sort_by_selector">
            <p className="sort_by_text">Sort By: </p>
            <div>
              <Field
                className="sort_by_input"
                as="select"
                name="sortBy"
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
        </Form>
      )}
    </Formik>
  );
};

SortingFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  updateFilters: PropTypes.func.isRequired,
  optionsList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired
};
