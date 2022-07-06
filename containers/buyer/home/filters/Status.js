import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useFormikContext, Formik, Form } from 'formik';

import { listingTypeList, statusList, statusText, typeText } from '../../../../static/data/filter_constants';
import { getStatusText, getStatusInitialValues } from './helpers/utils';
import { FilterRevealButton } from './common/FilterButtons';
import { RadioGroup } from './common/RadioGroup';
import { FilterCollapseButton } from './common/FilterButtons';

const AutoSubmitToken = ({ updateText }) => {
  const { values, submitForm } = useFormikContext();
  useEffect(() => {
    updateText(getStatusText(values.status, values.listingType));
  }, [values, submitForm]);
  return null;
};

export const StatusFilter = ({ updateFilters, filters }) => {
  const defaultText = statusText;
  const [dropDown, setDropDown] = useState(false);
  const [filterText, setFilterText] = useState(defaultText);
  const toggleDropDown = () => setDropDown((prevState) => !prevState);

  return (
    <Dropdown isOpen={dropDown} toggle={toggleDropDown}>
      <DropdownToggle tag='span'>
        <FilterRevealButton filterText={filterText} defaultText={statusText} />
      </DropdownToggle>
      <DropdownMenu id='status_dropdown'>
        <Formik
          enableReinitialize
          initialValues={getStatusInitialValues(filters)}
          onSubmit={async (values) => {
            updateFilters(values);
            setFilterText(getStatusText(values.status, values.listingType));
          }}
        >
          {({ handleSubmit }) => (
            <Fragment>
              <Form>
                <RadioGroup
                  filterText={typeText}
                  optionsList={listingTypeList}
                  handleSubmit={handleSubmit}
                  fieldName='listingType'
                />
                <AutoSubmitToken updateText={setFilterText} />
              </Form>
              <DropdownItem className='status-divider' divider />
              <Form>
                <RadioGroup
                  filterText={statusText}
                  optionsList={statusList}
                  handleSubmit={handleSubmit}
                  fieldName='status'
                />
                <AutoSubmitToken updateText={setFilterText} />
              </Form>
              <FilterCollapseButton hideDropdown={toggleDropDown} />
            </Fragment>
          )}
        </Formik>
      </DropdownMenu>
    </Dropdown>
  );
};

StatusFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  updateFilters: PropTypes.func.isRequired
};
