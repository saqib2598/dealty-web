import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

const OverviewItem = ({ label, value }) => {
  return (
    <li>
      <Row>
        <Col md={6}>
          <b>{label}:</b>
        </Col>
        <Col md={6}>
          <p>{value || '-'}</p>
        </Col>
      </Row>
    </li>
  );
};

const homeOverview = ({ home }) => {
  return (
    <div className="proprerty-features-block">
      <h2>Home Overview</h2>
      <ul className="overview-list">
        <OverviewItem label="Taxes" value={home.taxes} />
        <OverviewItem label="County" value={home.county} />
        <OverviewItem label="MLS Type" value={home.listingType} />
      </ul>
    </div>
  );
};

OverviewItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

homeOverview.propTypes = {
  home: PropTypes.object.isRequired
};

export default homeOverview;
