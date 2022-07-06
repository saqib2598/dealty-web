import React, { Fragment } from 'react';
import { isMobile } from 'react-device-detect';
import PropTypes from 'prop-types';

import { PriceFilter } from './Price';
import { BedsBathsFilter } from './BedsBaths';
import { HomeTypeFilter } from './HomeType';
import { MoreFilters } from './Extra';
import { StatusFilter } from './Status';

export const FiltersContainer = ({ filters, updateFilters }) => {
  return (
    <ul id='filters_list'>
      <li className='filter_item'>
        <StatusFilter updateFilters={updateFilters} filters={filters} />
      </li>
      <li className='filter_item'>
        <PriceFilter updateFilters={updateFilters} filters={filters} />
      </li>
      {!isMobile && (
        <Fragment>
          <li className='filter_item'>
            <BedsBathsFilter updateFilters={updateFilters} filters={filters} />
          </li>
          <li className='filter_item'>
            <HomeTypeFilter updateFilters={updateFilters} filters={filters} />
          </li>
        </Fragment>
      )}
      <li className='filter_item'>
        <MoreFilters updateFilters={updateFilters} filters={filters} />
      </li>
    </ul>
  );
};

FiltersContainer.propTypes = {
  filters: PropTypes.object.isRequired,
  updateFilters: PropTypes.func.isRequired,
};
