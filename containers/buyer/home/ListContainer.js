import React, { Fragment }  from 'react';
import { Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import HomeCard from '../../../components/home/HomeCard';
import { UserAgent } from '../../../components/home/UserAgent';
import Pagination from '../../../components/Pagination';
import { SiteFooter } from '../../../components/Footer';
import { selectHomes } from '../../../modules/homes';
import { SortingFilter } from './filters/Sorting';
import { sortByList } from '../../../static/data/filter_constants';
import ToggleMap from '../../../components/ToggleMap';

const ListContainer = ({
  showMap,
  completeAddress,
  isLoading,
  homes,
  setParentState,
  retrieveHomesListings,
  toggleShowMap,
  filters,
  updateFilters,
}) => {
  const handleMouseEnter = (marker) => {
    setParentState({ hoveredMarker: marker });
  };

  const onMouseLeave = () => {
    setParentState({ hoveredMarker: {} });
  };

  return (
    <div className='home-listings-container'>
      <Row>
        <Col sm='4' className='list-content'>
          <h5 className='list__title'>{completeAddress || 'address'}</h5>
          <p className='list__details'>
            <span>
             {homes.totalCount} Dealty Listings
            </span>
          </p>
        </Col>
        <Col sm='4' className='map-show-button'>
          {!showMap && (
            <Button onClick={() => toggleShowMap()}>Show Map</Button>
          )}
        </Col>
        <Col sm='4'>
          <SortingFilter
            filters={filters}
            updateFilters={updateFilters}
            optionsList={sortByList}
          />
        </Col>
      </Row>
      <Row className={showMap ? 'feature-homes' : 'feature-homes-no-map'}>
        {homes.dealtyListings.length ? (
          <Fragment>
            {homes.dealtyListings.map((item) => (
              <HomeCard
                onMouseEnter={handleMouseEnter}
                onMouseLeave={onMouseLeave}
                loading={isLoading}
                item={item}
                sizes={{ sm: 12 }}
                key={item.id}
                dealtyListings={true}
                showMap={showMap}
                isHomeListing={true}
              />
            ))}
            {homes.agentAd && (
              <UserAgent
                image={homes.agentImage}
                agent={homes.agentAd}
                firstName={homes.agentFirstName}
                lastName={homes.agentLastName}
                company={homes.agentAd.company}
                showMap={showMap}
              />
            )}
            <Pagination
              totalCount={homes.totalCount}
              pageLimit={20}
              className='blogs-container'
              listingPagination={true}
              retrieveHomesListings={retrieveHomesListings}
            />
          </Fragment>
        ) : (
          <div className='no-results-div'>
            <h4 className='list__title'>No matching results</h4>
            <p> Edit or remove filters for best results </p>
          </div>
        )}
        <SiteFooter />
      </Row>
    </div>
  );
};

ListContainer.propTypes = {
  homes: PropTypes.objectOf(PropTypes.any).isRequired,
  showMap: PropTypes.bool.isRequired,
  completeAddress: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setParentState: PropTypes.func.isRequired,
  retrieveHomesListings: PropTypes.func.isRequired,
  toggleShowMap: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  updateFilters: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  homes: selectHomes(state),
});
export default connect(mapStateToProps)(ListContainer);
