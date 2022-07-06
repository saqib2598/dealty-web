import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu, Button } from 'reactstrap';
import { useFormikContext, Formik, Field, Form } from 'formik';

import { homeTypeList } from '../../../../static/data/filter_constants';
import { getHomeText, getHomeTypeInitialValues } from './helpers/utils';
import { FilterCollapseButton } from './common/FilterButtons';
import { MultiCheckbox } from './common/MultiCheckbox';
import { homeText } from '../../../../static/data/filter_constants';
import { FilterRevealButton } from './common/FilterButtons';

const AutoSubmitToken = ({ updateText }) => {
  const { values, submitForm } = useFormikContext();
  useEffect(() => {
    updateText(getHomeText(values.homeType));
  }, [values, submitForm]);
  return null;
};

export const HomeTypeFilter = ({ updateFilters, filters }) => {
  const defaultText = 'Home Type';
  const [dropDown, setDropDown] = useState(false);
  const [filterText, setFilterText] = useState(defaultText);
  const toggleDropDown = () => setDropDown((prevState) => !prevState);

  return (
    <Dropdown isOpen={dropDown} toggle={toggleDropDown}>
      <DropdownToggle tag='span'>
        <FilterRevealButton filterText={filterText} defaultText={homeText} />
      </DropdownToggle>
      <DropdownMenu id='bedbath_dropdown'>
        <Formik
          enableReinitialize
          initialValues={getHomeTypeInitialValues(filters)}
          onSubmit={async (values) => {
            updateFilters(values);
            setFilterText(getHomeText(values.homeType));
          }}
        >
          {({ handleSubmit }) => (
            <Form>
              <MultiCheckbox
                filterText={homeText}
                optionsList={homeTypeList}
                handleSubmit={handleSubmit}
                fieldName='homeType'
              />
              <FilterCollapseButton hideDropdown={toggleDropDown} />
              <AutoSubmitToken updateText={setFilterText} />
            </Form>
          )}
        </Formik>
      </DropdownMenu>
    </Dropdown>
  );
};

HomeTypeFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  updateFilters: PropTypes.func.isRequired
};
