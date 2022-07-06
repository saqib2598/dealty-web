import React, { useState, useEffect } from 'react';
import { useFormikContext, Formik, Field, Form } from "formik";
import { isMobile } from 'react-device-detect';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu, Button } from 'reactstrap';

import {
  minPriceList,
  maxPriceList
} from '../../../../static/data/filter_constants';
import { getPriceInitialValues, getPriceText } from './helpers/utils';
import { priceValidation } from './helpers/validators';
import { priceText } from '../../../../static/data/filter_constants';
import { FilterRevealButton } from './common/FilterButtons';

const CustomField = ({
  fieldName,
  placeHolder,
  id,
  toggleOptions,
  updateInput,
  setFieldValue,
  selected,
  optionsList,
  errors
}) => {
  return (
    <div id="price_col">
      <Field
        id={id}
        placeholder={placeHolder}
        name={fieldName}
        onClick={toggleOptions}
        className={errors.hasOwnProperty(fieldName) && 'input_error'}
      />
      <ul className="price_list">
        {!isMobile &&
          selected &&
          optionsList.map((option, index) => (
            <li
              onClick={() => updateInput(option.value, setFieldValue)}
              className="price_values"
              key={index}
              type="button"
            >
              {option.label}
            </li>
          ))}
      </ul>
    </div>
  );
};

const UpdateFilterText = ({updateText}) => {
  const { values, submitForm } = useFormikContext();
  useEffect(() => {
    updateText(getPriceText(values.minPrice, values.maxPrice));
  }, [values, submitForm]);
  return null;
};

export const PriceFilter = ({ updateFilters, filters }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const togglePrice = () => setShowDropdown(!showDropdown);
  const [minSelected, setMinSelected] = useState(true);
  const [maxSelected, setMaxSelected] = useState(false);
  const [filterText, setFilterText] = useState('Price');
  const updateMinInput = (value, setFieldValue) => {
    setFieldValue('minPrice', value);
    toggleMaxOptions();
  };
  const updateMaxInput = (value, setFieldValue) => {
    setFieldValue('maxPrice', value);
  };
  const toggleMinOptions = () => {
    setMinSelected(true);
    setMaxSelected(false);
  };
  const toggleMaxOptions = () => {
    setMinSelected(false);
    setMaxSelected(true);
  };

  return (
    <Dropdown
      isOpen={showDropdown}
      toggle={togglePrice}
      id="disable_global_css"
    >
      <DropdownToggle tag="span">
        <FilterRevealButton filterText={filterText} defaultText={priceText} />
      </DropdownToggle>
      <DropdownMenu id="price_dropdown">
        <Formik
          enableReinitialize
          initialValues={getPriceInitialValues(filters)}
          onSubmit={async (values) => {
            updateFilters(values);
            togglePrice();
          }}
          validationSchema={priceValidation}
        >
          {({ setFieldValue, errors }) => (
            <Form>
              <p className="filter_title"> Price Range</p>
              <div className="price-filter-elements">
                <div className="price_row">
                  <CustomField
                    fieldName="minPrice"
                    placeHolder="Min"
                    id="min_price_input"
                    toggleOptions={toggleMinOptions}
                    updateInput={updateMinInput}
                    setFieldValue={setFieldValue}
                    selected={minSelected}
                    optionsList={minPriceList}
                    errors={errors}
                  />
                  <span className="price_dash">-</span>
                  <CustomField
                    fieldName="maxPrice"
                    placeHolder="Max"
                    id="max_price_input"
                    toggleOptions={toggleMaxOptions}
                    updateInput={updateMaxInput}
                    setFieldValue={setFieldValue}
                    selected={maxSelected}
                    optionsList={maxPriceList}
                    errors={errors}
                  />
                </div>
              </div>
              <Button id="filters_bottom_button" type="submit">
                Apply Filter
              </Button>
              <UpdateFilterText updateText = {setFilterText}/>
            </Form>
          )}
        </Formik>
      </DropdownMenu>
    </Dropdown>
  );
};

PriceFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  updateFilters: PropTypes.func.isRequired
};

CustomField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  toggleOptions: PropTypes.func.isRequired,
  updateInput: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
  optionsList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ).isRequired,
  errors: PropTypes.object.isRequired
};
