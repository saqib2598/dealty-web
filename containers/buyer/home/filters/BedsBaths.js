import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { useFormikContext, Formik, Form } from "formik";
import { isMobile } from 'react-device-detect';

import { HorizontalBlocks } from './common/HorizontalBlocks';
import { FilterRevealButton } from './common/FilterButtons';
import { bedBathText } from '../../../../static/data/filter_constants';
import { getBedsBathsInitialValues, getBedsText } from './helpers/utils';
import { FilterCollapseButton } from './common/FilterButtons';

const AutoSubmitToken = ({ updateText }) => {
  const { values, submitForm } = useFormikContext();
  useEffect(() => {
    !isMobile && updateText(getBedsText(values.beds, values.baths));
  }, [values, submitForm]);
  return null;
};

export const BedsBathsFilter = ({ updateFilters, filters }) => {
  const [dropDown, setDropDown] = useState(false);
  const [filterText, setFilterText] = useState(bedBathText);
  const toggleDropDown = () => setDropDown((prevState) => !prevState);

  return (
    <Dropdown isOpen={dropDown} toggle={toggleDropDown}>
      <DropdownToggle tag="span">
        <FilterRevealButton filterText={filterText} defaultText={bedBathText} />
      </DropdownToggle>
      <DropdownMenu id="bedbath_dropdown">
        <Formik
          enableReinitialize
          initialValues={getBedsBathsInitialValues(filters)}
          onSubmit={async (values) => {
            updateFilters(values);
          }}
        >
          {({ values, setFieldValue, handleSubmit }) => (
            <Form>
              <HorizontalBlocks values={values} setFieldValue={setFieldValue} handleSubmit={handleSubmit}/>
              <FilterCollapseButton hideDropdown={toggleDropDown} />
              <AutoSubmitToken updateText={setFilterText} />
            </Form>
          )}
        </Formik>
      </DropdownMenu>
    </Dropdown>
  );
};

BedsBathsFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  updateFilters: PropTypes.func.isRequired
};
