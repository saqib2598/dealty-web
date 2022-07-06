import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';

import { calculateDate } from '../../../containers/buyer/home/filters/helpers/utils';
import { sevenDays } from '../../../static/data/constants';

export const HomeNewBadge = ({ createdAt }) => {
  return (
    calculateDate(createdAt)[1] < sevenDays && (
      <Badge className='home-new-badge'>
        New
      </Badge>
    )
  );
};

HomeNewBadge.propTypes = {
  createdAt: PropTypes.string.isRequired,
};
