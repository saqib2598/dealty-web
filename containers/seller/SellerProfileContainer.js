import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGripHorizontal,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Row } from 'reactstrap';

import SellerProfile from '../../components/seller/SellerBio';
import SellerListing from '../../components/seller/SellerListing';
import { isSignedIn as hasCredentials } from '../../lib/session';
import Pagination from '../../components/Pagination';
import { SellerPaginationContainer } from '../../components/styles/HomeMapStyles';
import { SellerMap } from './SellerMap';
import {
  getSpecificUser,
  selectSeller,
  toggleSellerFavorite,
} from '../../modules/users';
import { checkListings } from '../buyer/home/filters/helpers/utils';

const mapDispatchToProps = { getSpecificUser, toggleSellerFavorite };
const iconStyle = { marginRight: '5px', width: '15px', height: '15px' };
const mapStateToProps = (state) => ({
  isSignedIn: hasCredentials(state),
  user: selectSeller(state),
});

class SellerProfileContainer extends React.Component {
  state = {
    listView: true,
    mapView: false,
    selectedMarker: {},
    hover: false,
    homeId: 0,
  };

  handleClick = (marker) => {
    this.setState({ selectedMarker: marker });
  };

  handleMapClick = () => {
    this.setState({ selectedMarker: {} });
  };
  setHover = () => {
    this.setState({ hover: !this.state.hover });
  };

  setHomeId = (id) => {
    this.setState({ homeId: id });
  };

  componentDidMount() {
    const { getSpecificUser, sellerId } = this.props;
    getSpecificUser(sellerId, 1);
  }

  handleToggleFavorite = (homeId) => {
    const { toggleSellerFavorite } = this.props;
    let { user } = this.props;
    toggleSellerFavorite(homeId);
  };

  renderComponent(component) {
    let linksState = { listView: false, mapView: false };
    linksState[component] = true;
    this.setState({
      listView: linksState.listView,
      mapView: linksState.mapView,
    });
  }
  render() {
    const { user, isSignedIn, sellerId } = this.props;
    const { listView, mapView } = this.state;
    const isZeroListing = checkListings(user);

    return (
      <Fragment>
        <SellerProfile user={user} isSignedIn={isSignedIn} />
        {isZeroListing ? (
          <div className='no-listings'>
            <b> No current listings</b>
          </div>
        ) : (
          <Fragment>
            <Row className='seller-nav row'>
              <div>
                <a
                  onClick={(e) => this.renderComponent('listView')}
                  className={listView ? 'active' : 'not-active'}
                >
                  <FontAwesomeIcon icon={faGripHorizontal} style={iconStyle} />
                  List
                </a>
                <a
                  onClick={(e) => this.renderComponent('mapView')}
                  className={`${mapView ? 'active' : 'not-active'}`}
                >
                  <FontAwesomeIcon icon={faMapMarkerAlt} style={iconStyle} />
                  Map
                </a>
              </div>
            </Row>
            {listView ? (
              <>
                <SellerListing
                  sellerListings={true}
                  homes={user.seller && user.seller.listings}
                  onToggleFavorite={this.handleToggleFavorite}
                  isSignedIn={isSignedIn}
                />
                <Pagination
                  className='seller-bio-pagination'
                  totalCount={user.mlsTotalCount}
                  sellerListings={true}
                  sellerId={sellerId}
                  style={SellerPaginationContainer}
                  pageLimit={20}
                />
              </>
            ) : (
              <>
                <SellerMap
                  sellerListings={user.seller.listings}
                  selectedMarker={this.state.selectedMarker}
                  onClick={this.handleClick}
                  setHover={this.setHover}
                  setHomeId={this.setHomeId}
                  hover={this.state.hover}
                />
              </>
            )}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

SellerProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SellerProfileContainer);
export default SellerProfileContainer;
