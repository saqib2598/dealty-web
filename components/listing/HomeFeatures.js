import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';

import { getListedTime } from '../../containers/buyer/home/filters/helpers/utils';
import { LABELS, STATUSES, ICONS } from '../../static/data/constants';

const FeatureItem = ({ label, value, iconPath }) => {
  return (
    <Fragment>
      {(value || value === 0) && (
        <li>
          <img src={iconPath} alt='Icon' />
          <span>
            {`${label}: ${
              label === LABELS.daysOnDealty ? getListedTime(value) : value
            }`}
          </span>
        </li>
      )}
    </Fragment>
  );
};

const Status = ({ status }) => {
  return (
    <li>
      <FontAwesomeIcon
        icon={status === STATUSES.active ? faToggleOn : faToggleOff}
        className='direction-icon status-icon'
        style={{
          color: `${status === STATUSES.active ? 'teal' : 'grey'}`,
        }}
      />
      <span id='active-text'>{status}</span>
    </li>
  );
};

export const HomeFeatures = ({ home }) => {
  return (
    <div className='proprerty-features-block'>
      <h2>Features</h2>
      <h3>Status</h3>
      <ul className='features-info'>
        <Status status={home.status} />
      </ul>
      <h3 id='listing-info'>Listing Information</h3>
      <ul className='features-info'>
        <FeatureItem
          label={ LABELS.parking }
          value={ `${home.parkingSpaces} Garage Spaces` }
          iconPath= { ICONS.garage }
        />
        <FeatureItem
          label={ LABELS.buitIn }
          value={ home.yearBuilt }
          iconPath= { ICONS.built }
        />
        <FeatureItem
          label={ LABELS.pool }
          value={ home.pool }
          iconPath={ ICONS.pool }
        />
        <FeatureItem
          label={ LABELS.newAppliances }
          value={ home.newAppliances }
          iconPath= { ICONS.newAppliances }
        />
        <FeatureItem
          label={ LABELS.flooringType }
          value={ home.flooringType }
          iconPath={ ICONS.flooring }
        />
        {home.status === STATUSES.active && (
          <FeatureItem
            label={ LABELS.daysOnDealty }
            value={ home.createdAt }
            iconPath= { ICONS.daysOnDealty }
          />
        )}
        <FeatureItem
          label={ LABELS.openHouseDate }
          value={ home.openHouseDate && home.openHouseDate.substring(0, 10) }
          iconPath={ ICONS.daysOnDealty }
        />
        <FeatureItem
          label={ LABELS.openHouseTime }
          value={ home.openHouseTime }
          iconPath={ ICONS.daysOnDealty }
        />
        <FeatureItem
          label={ LABELS.HOAName }
          value={ home.homeOwner && home.homeOwner.replace('HOA name:', '') }
          iconPath={ ICONS.homeOwner }
        />
        <FeatureItem
          label={ LABELS.HOAMonthlyCost }
          value={ home.monthlyCost && `$${home.monthlyCost}` }
          iconPath= { ICONS.monthlyCost }
        />
      </ul>
    </div>
  );
};

Status.propTypes = {
  status: PropTypes.string.isRequired,
};

HomeFeatures.propTypes = {
  home: PropTypes.object.isRequired,
};

FeatureItem.propTypes = {
  label: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  iconPath: PropTypes.string.isRequired,
};
