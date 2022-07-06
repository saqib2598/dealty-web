import React, { Fragment, useEffect } from 'react';
import { useFormikContext, Formik, Form } from 'formik';
import { DropdownItem } from 'reactstrap';
import { isMobile } from 'react-device-detect';
import PropTypes from 'prop-types';

import { MultiCheckbox } from './MultiCheckbox';
import { HorizontalBlocks } from './HorizontalBlocks';
import { SelectFilter } from './SelectFilter';
import { TwoFieldsInput } from './TwoFieldsInput';
import { TwoFieldsSelector } from './TwoFieldsSelector';
import { yearValidation } from '../helpers/validators';
import {
  getMoreFilterInitialValues,
  getMoreFilterInitialValues2,
  filtersCount
} from '../helpers/utils';
import { SingleCheckbox } from './SingleCheckbox';
import { SingleInputField } from './SingleInputField';
import { filterMinList, filterMaxList } from '../helpers/utils';
import { CustomButtonGroup } from './ButtonGroup';
import {
  saleByList,
  daysOnDealtyList,
  maxHoaList,
  parkingSpotsList,
  lotSizeList,
  sqftList,
  homeTypeList,
  homeText,
} from '../../../../../static/data/filter_constants';

const UpdateFilterText = ({ updateText }) => {
  const { values } = useFormikContext();
  useEffect(() => {
    const len = filtersCount(values);
    updateText(len > 0 ? `More:  ${len}` : 'More')
  }, values);
  return null;
};

export const MoreFiltersContent = ({
  filters,
  updateFilters,
  toggleDropDown,
  resetFilters,
  setFilterText,
}) => {
  return (
    <Fragment>
      <Formik
        enableReinitialize
        initialValues={
          isMobile
            ? getMoreFilterInitialValues2(filters)
            : getMoreFilterInitialValues(filters)
        }
        validationSchema={yearValidation}
        onSubmit={async (values) => {
          updateFilters(values);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          submitForm,
          setFieldValue,
          errors,
          touched,
          values
        }) => (
          <Form>
            {isMobile && (
              <Fragment>
                <HorizontalBlocks
                  values={values}
                  setFieldValue={setFieldValue}
                  handleSubmit={handleSubmit}
                />
                <DropdownItem divider />
                <MultiCheckbox
                  filterText={homeText}
                  optionsList={homeTypeList}
                  handleSubmit={handleSubmit}
                  fieldName = 'homeType'
                />
              </Fragment>
            )}
            <SelectFilter
              title='Max HOA'
              name='maxHoa'
              optionsList={maxHoaList}
              handleChange={handleChange}
              submitForm={submitForm}
            />
            <TwoFieldsInput
              title='Year Built'
              name1='minYearBuilt'
              name2='maxYearBuilt'
              handleBlur={handleBlur}
              submitForm={submitForm}
              errors={errors}
              touched={touched}
            />
            <SelectFilter
              title='Parking Spots'
              name='parkingSpots'
              optionsList={parkingSpotsList}
              handleChange={handleChange}
              submitForm={submitForm}
            />
            <TwoFieldsSelector
              title='Lot Size'
              name1='minLotSize'
              name2='maxLotSize'
              optionsList1={
                values.maxLotSize
                  ? filterMinList(lotSizeList, values.maxLotSize)
                  : lotSizeList
              }
              optionsList2={
                values.minLotSize
                  ? filterMaxList(lotSizeList, values.minLotSize)
                  : lotSizeList
              }
              handleChange={handleChange}
              submitForm={submitForm}
              values={values}
            />
            <TwoFieldsSelector
              title='Square Feet'
              name1='minSqft'
              name2='maxSqft'
              optionsList1={
                values.maxSqft
                  ? filterMinList(sqftList, values.maxSqft)
                  : sqftList
              }
              optionsList2={
                values.minSqft
                  ? filterMaxList(sqftList, values.minSqft)
                  : sqftList
              }
              handleChange={handleChange}
              submitForm={submitForm}
              errors={errors}
              touched={touched}
              values={values}
            />
            <SelectFilter
              title='Sale By'
              name='saleBy'
              optionsList={saleByList}
              handleChange={handleChange}
              submitForm={submitForm}
            />
            <SelectFilter
              title='Days on Dealty'
              name='daysOnDealty'
              optionsList={daysOnDealtyList}
              handleChange={handleChange}
              submitForm={submitForm}
            />
            <SingleInputField
              title='Keywords'
              placeHolder='MLS #, etc'
              fieldName='keywords'
              handleBlur={handleBlur}
              submitForm={submitForm}
            />
            <SingleCheckbox
              title='Open House'
              text='Must have open house'
              fieldName='isOpenHouse'
              handleChange={handleChange}
              submitForm={submitForm}
            />
            {!isMobile && (
              <CustomButtonGroup
                btnId='dropdown_bottom_btns'
                toggle={toggleDropDown}
                resetFilters={resetFilters}
              />
            )}
            <UpdateFilterText updateText={setFilterText} />
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

MoreFiltersContent.propTypes = {
  filters: PropTypes.object.isRequired,
  updateFilters: PropTypes.func.isRequired,
  toggleDropDown: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
  setFilterText: PropTypes.func.isRequired,
};
