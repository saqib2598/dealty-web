import Head from 'next/head';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';

import { getBaseUrl } from '../../../../lib/utils';
import { isMobile } from 'react-device-detect';
import { Router } from '../../../../routes';
import _, { isEqual } from 'lodash';
import Layout from '../../../../components/Layout';
import OpenGraphMeta from '../../../../components/OpenGraphMeta';
import { selectUser } from '../../../../modules/users';
import { createSaveSearch } from '../../../../modules/savedSearches';
import { geocodeByAddress } from 'react-places-autocomplete';
import ListLoader from '../../../../components/loader/ListLoader';
import FilterLoader from '../../../../components/buyer/FilterLoader';
import SaveSearch from '../../../../components/modals/SaveSearch';
import ShowSaveSearches from '../../../../components/modals/ShowSavedSearches';
import ToggleMap from '../../../../components/ToggleMap';
import ListContainer from '../../../../containers/buyer/home/ListContainer';
import { getBoundsFromQueryUrl } from '../../../../components/buyer/home/helpers/ListingsHelper';
import NewHomeMapContainer from '../../../../containers/dashboard/NewHomeMapContainer.js';
import { FiltersContainer } from '../../../../containers/buyer/home/filters/Container';
import { clean } from '../../../../containers/buyer/home/filters/helpers/utils';
import SearchContainer from '../../../dashboard/searching/SearchContainer';
import { defaultFilters } from '../../../../static/data/filter_constants';
import {
  selectHomes,
  searchHomesList,
  mapCoordinates,
  selectCoordinates,
} from '../../../../modules/homes';

class DealtyListings extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isFiltering: false,
      page: 1,
      lat: null,
      lng: null,
      address1: null,
      address: null,
      map: null,
      bounds: {},
      zoom: 12,
      isSaving: false,
      ShowSaveSearch: false,
      nickname: '',
      frequency: '',
      SaveSearchSuccess: false,
      savedSearchItem: null,
      setBound: true,
      mountRequest: true,
      isFilter: false,
      isFilterSearch: false,
      completeAddress: null,
      showMap: true,
      showPolygon: true,
      showPOI: false,
      listingFilters: {}
    };
    this.update_filters = this.update_filters.bind(this);
  }
  update_filters = (value) => {
    const updatedFilters = Object.assign(this.state.listingFilters, value);
    this.setState(
      { listingFilters: value ? clean(updatedFilters) : {} },
      () => {
        this.handleFilters();
      }
    );
  };
  update_bounds = (showPolygon, bounds) => {
    this.setState({ bounds: bounds, showPolygon: showPolygon }, () => {
      console.log('polygon' + this.state.showPolygon)
    });
  };
  update_query_filters = (value) => {
    const updatedFilters = Object.assign(this.state.listingFilters, value);
    this.setState(() => ({
      listingFilters: clean(updatedFilters)
    }));
  };
  async getLatLng(address) {
    let latitude;
    let longitude;
    let address1;
    let completeAddress;
    await geocodeByAddress(address)
      .then((results) => {
        latitude = results[0].geometry.location.lat();
        longitude = results[0].geometry.location.lng();
        completeAddress = results[0].formatted_address;
        address1 = address;
      })
      .catch((error) => {
        console.log(error);
      });
    return {
      complete_add: completeAddress,
      lat: latitude,
      lng: longitude,
      address1: address1
    };
  }

  async componentDidMount() {
    const {
      place,
      beds,
      baths,
      minPrice,
      maxPrice,
      homeType,
      status,
      listingType,
      minYearBuilt,
      maxYearBuilt,
      saleBy,
      daysOnDealty,
      isOpenHouse,
      maxHoa,
      parkingSpots,
      minLotSize,
      maxLotSize,
      minSqft,
      maxSqft,
      keywords,
      southWest,
      northEast,
      sortBy
    } = this.props;
    const search = JSON.parse(localStorage.getItem('savedItem'));
    localStorage.removeItem('savedItem');
    this.setState({ savedSearchItem: search });
    const bounds = getBoundsFromQueryUrl(southWest, northEast);
    const filters = {
      beds: beds,
      baths: baths,
      minPrice: minPrice,
      maxPrice: maxPrice,
      homeType: homeType && homeType.split(','),
      status: status,
      listingType: listingType,
      minYearBuilt: minYearBuilt,
      maxYearBuilt: maxYearBuilt,
      saleBy: saleBy,
      daysOnDealty: daysOnDealty,
      isOpenHouse: isOpenHouse,
      maxHoa: maxHoa,
      parkingSpots: parkingSpots,
      minLotSize: minLotSize,
      maxLotSize: maxLotSize,
      minSqft: minSqft,
      maxSqft: maxSqft,
      keywords: keywords,
      sortBy: sortBy,
    };

    this.update_query_filters(filters);
    const { page, isFilter, showPolygon, listingFilters } = this.state;

    try {
      isFilter && this.setState({ isFiltering: true });
      await this.getLatLng(place).then((results) => {
        this.props
          .searchHomesList(
            results.lat,
            results.lng,
            listingFilters,
            page,
            results.complete_add,
            bounds,
            showPolygon
          )
          .then(() => {
            this.setState({
              completeAddress: results.complete_add,
              address1: place,
              lat: results.lat,
              lng: results.lng,
              isLoading: false,
              isFiltering: false,
              isFilter: false
            });
            this.props.mapCoordinates(
              results.lat,
              results.lng,
              listingFilters,
              page,
              results.complete_add,
              null,
              isFilter
            );
          });
      });
    } catch (error) {
      this.setState({ isLoading: false });
    }
  }
  handleSelect = async (add) => {
    if (this.state.address != add) {
      this.setState({ bounds: {}, isFilterSearch: true });
    }
    await this.setState({ address: add });
    const form = document.getElementsByTagName('form')[0];
    const data = new FormData(form);
    const { listingFilters, address } = this.state;
    if (!isEqual(listingFilters, data.values) || address) {
      this.setState({
        listingFilters: data.values,
        isFiltering: true,
        page: 1,
        isFilter: true
      });
      try {
        await this.getLatLng(address)
          .then((results) => {
            this.setState({
              completeAddress: results.complete_add,
              address1: add,
              lat: results.lat,
              lng: results.lng,
              setBound: true
            });
          })
          .then(() => {
            this.retrieveSearchedListing(data.values);
          });
      } catch (error) {
        this.setState({ isFiltering: false });
      }
    }
  };
  handlePriceDropdownToggle = () => {
    this.setState({ isPriceDropdownOpen: !this.state.isPriceDropdownOpen });
  };
  handleFilters = async (values) => {
    const { listingFilters } = this.state;
    this.setState({
      isFiltering: true,
      page: 1,
      setBound: true
    });
    await this.getLatLng(this.props.place)
      .then((results) => {
        this.setState({ lat: results.lat, lng: results.lng, isFilter: true });
      })
      .then(() => {
        this.retrieveSearchedListing(listingFilters);
      });
  };
  retrieveHomesListings = (page) => {
    const {
      lat,
      lng,
      listingFilters,
      complete_address,
      bounds,
      address1,
      isFilter,
      showPolygon
    } = this.state;
    this.setState({ isFiltering: true });
    isMobile
      ? this.props
        .searchHomesList(
          lat,
          lng,
          listingFilters,
          page,
          address1,
          null,
          false
        )
        .then(() => this.setState({ isFiltering: false }))
      : this.props
        .searchHomesList(
          lat,
          lng,
          listingFilters,
          page,
          address1,
          bounds,
          showPolygon
        )
        .then(() => this.setState({ isFiltering: false }));
  };
  retrieveSearchedListing = async (values) => {
    const { searchHomesList } = this.props;
    const {
      completeAddress,
      isFilter,
      isFilterSearch,
      lat,
      lng,
      showPolygon,
      bounds
    } = this.state;
    const addressQuery = new URLSearchParams(
      `place=${completeAddress}`
    ).toString();
    const filtersQuery = new URLSearchParams(values).toString();
    const bound_query = new URLSearchParams(bounds).toString();
    isFilterSearch
      ? Router.replace(
        {
          pathname: `/buy/homes/?`
        },
        `/buy/homes/listings?place=${completeAddress}`,
        { shallow: true }
      )
      : this.setState({ isFilterSearch: false });
    this.setState({ isFiltering: true });
    isFilter &&
      window.history.replaceState(
        null,
        '',
        `/buy/homes/listings?${addressQuery}&${filtersQuery}&${bound_query}`
      );
    isMobile
      ? await searchHomesList(lat, lng, values, 1, completeAddress, null, false)
      : await searchHomesList(
        lat,
        lng,
        values,
        1,
        completeAddress,
        bounds,
        showPolygon
      );
    this.setState({
      isFiltering: false,
      showSingleDate: false,
      showRangeDate: false
    });
  };
  mapListings = async (mapProps) => {
    const { searchHomesList } = this.props;
    await searchHomesList(
      mapProps.latitude,
      mapProps.longitude,
      mapProps.listingFilters,
      mapProps.page,
      this.props.place,
      mapProps.bounds,
      mapProps.is_filter,
      mapProps.showPolygon
    );
  };
  handleEvents = (map, showPolygon) => {
    const { mountRequest, lat, lng, completeAddress } = this.state;
    let bounds = map.getBounds().toJSON();
    bounds = {
      southWest: [bounds.south, bounds.west],
      northEast: [bounds.north, bounds.east]
    };

    this.setState({ bounds, zoom: map.getZoom(), isFilter: true });
    const apiProps = {
      latitude: lat,
      longitude: lng,
      listingFilters: {},
      page: 1,
      address: completeAddress,
      bounds: bounds,
      is_filter: false,
      showPolygon: showPolygon
    };
    !mountRequest
      ? searchHomesList(apiProps)
      : this.setState({ mountRequest: false });
  };

  handleZoom = (map) => {
    this.setState({ zoom: map.getZoom() });
  };

  toggleShowMap = () => {
    this.setState((prevState) => ({
      showMap: !prevState.showMap
    }));
  };

  toggleLoading = () => {
    this.setState((prevState) => ({
      isFiltering: !prevState.isFiltering
    }));
  };

  handleSetBounds = () => {
    this.setState({ setBound: false });
  };

  handleSelects = (date) => {
    const values = { OpenDate: date };
    this.handleFilters(values);
  };

  toggleSingleCalender = () => {
    this.setState((prevState) => ({
      showSingleDate: !prevState.showSingleDate
    }));
  };

  toggleRangeCalender = () => {
    this.setState((prevState) => ({ showRangeDate: !prevState.showRangeDate }));
  };

  toggleSaveSearch = () => {
    this.setState((prevState) => ({
      ShowSaveSearch: !prevState.ShowSaveSearch
    }));
  };

  onNickNameChange = (event) => {
    this.setState({ nickname: event.target.value });
  };

  onUpdateChange = (event) => {
    this.setState({ frequency: event.target.value });
  };

  toggleShowSaveSearches = () => {
    this.setState((prevState) => ({
      SaveSearchSuccess: !prevState.SaveSearchSuccess
    }));
  };

  redirectToSaveSearches = () => {
    Router.pushRoute('/saved-searches');
  };

  handleSaveSearchClick = async () => {
    this.setState({ isSaving: true });
    const { listingFilters, lat, lng, frequency, nickname, address1 } =
      this.state;
    const { user, createSaveSearch } = this.props;

    const saved_search = {
      address: address1,
      longitude: lng,
      latitude: lat,
      user_id: user.id,
      nickname: nickname,
      update_status: frequency
    };
    await createSaveSearch(saved_search);
    this.setState({
      isSaving: false,
      ShowSaveSearch: false,
      SaveSearchSuccess: true
    });
  };

  render() {
    const {
      baseUrl,
      path,
      place,
      homeType,
      status,
      listingType,
      builder,
      forsale,
      beds,
      baths,
      OpenDate,
      StartDate,
      EndDate,
      daysOnDealty,
      priceRange
    } = this.props;
    const queryProps = {
      place,
      homeType,
      status,
      listingType,
      builder,
      forsale,
      beds,
      baths,
      OpenDate,
      StartDate,
      EndDate,
      daysOnDealty,
      priceRange
    };
    const {
      isLoading,
      isFiltering,
      showMap,
      completeAddress,
      lat,
      lng,
      listingFilters,
      bounds,
      zoom,
      setBound,
      ShowSaveSearch,
      SaveSearchSuccess
    } = this.state;

    return (
      <Row>
        <Head>
          <title>{completeAddress} Homes for sale | Dealty </title>
        </Head>
        <OpenGraphMeta baseUrl={baseUrl} path={path} />
        <Layout
          isBuyer={true}
          isHome={true}
          headerStyle='default'
          bodyBg='white'
        >
          <SaveSearch
            toggleSaveSearch={this.toggleSaveSearch}
            ShowSaveSearch={ShowSaveSearch}
            handleNameSubmit={this.onNickNameChange}
            handleUpdateChange={this.onUpdateChange}
            handleSaveSearchClick={this.handleSaveSearchClick}
          />
          <ShowSaveSearches
            SaveSearchSuccess={SaveSearchSuccess}
            toggleShowSaveSearches={this.toggleShowSaveSearches}
            redirectToSaveSearches={this.redirectToSaveSearches}
          />
          <div id='filters_container'>
            <div id='filter_c_col'>
              <Row>
                <SearchContainer placeHolder='Search...' />
                {isMobile && (
                  <Button
                    id='savesearch_btn'
                    color='#fff'
                    onClick={() => this.toggleSaveSearch()}
                  >
                    Save Search
                  </Button>
                )}
              </Row>
            </div>
            <div id='filter_c_col'>
              <FiltersContainer
                place={place}
                filters={listingFilters}
                updateFilters={this.update_filters}
              />
              {!isMobile && (
                <Button
                  id='savesearch_btn'
                  color='#fff'
                  onClick={() => this.toggleSaveSearch()}
                >
                  Save Search
                </Button>
              )}
            </div>
          </div>
          {isFiltering && <FilterLoader />}
          <>
            {isLoading ? (
              <ListLoader showMap={showMap} loading={isLoading} />
            ) : (
              <Row className='home-row'>
                <Col xs='6' className='home-map-position'>
                  {showMap ? (
                    <div className='home-map d-none d-lg-block'>
                      <NewHomeMapContainer
                        lat={lat}
                        lng={lng}
                        bounds={bounds}
                        zoom={zoom}
                        filters={listingFilters}
                        showMap={showMap}
                        setBound={setBound}
                        mapListings={this.mapListings}
                        toggleShowMap={this.toggleShowMap}
                        handleSetBounds={this.handleSetBounds}
                        handleEvents={this.handleEvents}
                        handleZoom={this.handleZoom}
                        toggleLoading={this.toggleLoading}
                        update_bounds={this.update_bounds}
                      />
                    </div>
                  ) : (
                    <ToggleMap
                      toggleShowMap={this.toggleShowMap}
                      showMap={showMap}
                    />
                  )}
                </Col>
                <Col lg={showMap ? '6' : '12'} xs='12' className={showMap ? 'position-left' : 'position-right'}>
                  <ListContainer
                    showMap={showMap}
                    completeAddress={completeAddress}
                    isLoading={isLoading}
                    setParentState={(data) => this.setState(data)}
                    retrieveHomesListings={this.retrieveHomesListings}
                    filters={listingFilters}
                    updateFilters={this.update_filters}
                    toggleShowMap={this.toggleShowMap}
                  />
                </Col>
              </Row>
            )}
          </>
        </Layout>
      </Row>
    );
  }
}

DealtyListings.getInitialProps = async ({ req, query }) => {
  const props = {
    place: query.place,
    beds: query.beds,
    baths: query.baths,
    minPrice: query.minPrice,
    maxPrice: query.maxPrice,
    homeType: query.homeType,
    status: query.status,
    listingType: query.listingType,
    minYearBuilt: query.minYearBuilt,
    maxYearBuilt: query.maxYearBuilt,
    saleBy: query.saleBy,
    daysOnDealty: query.daysOnDealty,
    isOpenHouse: query.isOpenHouse,
    maxHoa: query.maxHoa,
    parkingSpots: query.parkingSpots,
    minLotSize: query.minLotSize,
    maxLotSize: query.maxLotSize,
    minSqft: query.minSqft,
    maxSqft: query.maxSqft,
    keywords: query.keywords,
    sortBy: query.sortBy,
    southWest: query.southWest,
    northEast: query.northEast,
  };
  if (req) {
    props.baseUrl = getBaseUrl(req);
    props.path = req.path;
  }
  return props;
};

DealtyListings.propTypes = {
  place: PropTypes.string,
  searchHomesList: PropTypes.func,
  mapCoordinates: PropTypes.func,
  createSaveSearch: PropTypes.func,
  user: PropTypes.object,
  homes: PropTypes.array,
  path: PropTypes.string,
  baseUrl: PropTypes.string,
  beds: PropTypes.array,
  baths: PropTypes.array,
  homeType: PropTypes.array,
  status: PropTypes.string,
  listingType: PropTypes.string,
  OpenDate: PropTypes.string,
  daysOnDealty: PropTypes.string,
  forsale: PropTypes.string,
  StartDate: PropTypes.string,
  EndDate: PropTypes.string,
  priceRange: PropTypes.array,
  southWest: PropTypes.array,
  northEast: PropTypes.array,
};

const mapDispatchToProps = {
  searchHomesList,
  createSaveSearch,
  mapCoordinates,
};
const mapStateToProps = (state) => ({
  homes: selectHomes(state),
  user: selectUser(state),
  coordinates: selectCoordinates(state) || [],
});
export default connect(mapStateToProps, mapDispatchToProps)(DealtyListings);
