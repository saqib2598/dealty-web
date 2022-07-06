import getConfig from 'next/config';
import {CALL_API, HTTP_METHODS} from '../middlewares/api';

// API Actions
const RETRIEVE_HOMES_REQUEST = 'dealty/homes/RETRIEVE_HOMES_REQUEST';
const RETRIEVE_HOMES_SUCCESS = 'dealty/homes/RETRIEVE_HOMES_SUCCESS';
const RETRIEVE_HOMES_FAILURE = 'dealty/homes/RETRIEVE_HOMES_FAILURE';

const RETRIEVE_HOMES_LIST_REQUEST = 'dealty/homes/RETRIEVE_LIST_HOMES_REQUEST';
const RETRIEVE_HOMES_LIST_SUCCESS = 'dealty/homes/RETRIEVE_LIST_HOMES_SUCCESS';
const RETRIEVE_HOMES_LIST_FAILURE = 'dealty/homes/RETRIEVE_LIST_HOMES_FAILURE';

const RETRIEVE_HOME_REQUEST = 'dealty/homes/RETRIEVE_HOME_REQUEST';
const RETRIEVE_HOME_SUCCESS = 'dealty/homes/RETRIEVE_HOME_SUCCESS';
const RETRIEVE_HOME_FAILURE = 'dealty/homes/RETRIEVE_HOME_FAILURE';

const CONTACT_HOME_OWNER_REQUEST = 'dealty/homes/CONTACT_HOME_OWNER_REQUEST';
const CONTACT_HOME_OWNER_SUCCESS = 'dealty/homes/CONTACT_HOME_OWNER_SUCCESS';
const CONTACT_HOME_OWNER_FAILURE = 'dealty/homes/CONTACT_HOME_OWNER_FAILURE';

const CONTACT_LENDER_REQUEST = 'dealty/homes/CONTACT_LENDER_REQUEST';
const CONTACT_LENDER_SUCCESS = 'dealty/homes/CONTACT_LENDER_SUCCESS';
const CONTACT_LENDER_FAILURE = 'dealty/homes/CONTACT_LENDER_FAILURE';

const TOGGLE_FAVORITE_REQUEST = 'dealty/homes/TOGGLE_FAVORITE_REQUEST';
const TOGGLE_FAVORITE_SUCCESS = 'dealty/homes/TOGGLE_FAVORITE_SUCCESS';
const TOGGLE_FAVORITE_FAILURE = 'dealty/homes/TOGGLE_FAVORITE_FAILURE';

const MAP_COORDINATES_REQUEST = 'dealty/homes/MAP_COORDINATES_REQUEST';
const MAP_COORDINATES_SUCCESS = 'dealty/homes/MAP_COORDINATES_SUCCESS';
const MAP_COORDINATES_FAILURE = 'dealty/homes/MAP_COORDINATES_FAILURE';

const SEARCH_HOMES = 'dealty/homes/SEARCH_HOMES';
const CANCEL_HOMES_SEARCH = 'dealty/homes/CANCEL_HOMES_SEARCH';

const SEND_FLYER_EMAIL_REQUEST = 'dealty/homes/SEND_FLYER_EMAIL_REQUEST';
const SEND_FLYER_EMAIL_SUCCESS = 'dealty/homes/SEND_FLYER_EMAIL_SUCCESS';
const SEND_FLYER_EMAIL_FAILURE = 'dealty/homes/SEND_FLYER_EMAIL_FAILURE';

const {publicRuntimeConfig: {primaryDomain}} = getConfig();

// Initial State
const initialState = {
  homeData: {},
  homes: {
    dealtyListings: [],
  },
  home: null,
  primaryDomain: primaryDomain,
  coordinates: [],
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_HOMES_SUCCESS:
      return {
        ...state,
        homeData: action.payload,
      };
    case RETRIEVE_HOMES_LIST_SUCCESS:
      return {
        ...state,
        homes: action.payload,
      };
    case RETRIEVE_HOME_SUCCESS:
      return {
        ...state,
        home: action.payload,
      };
    case MAP_COORDINATES_SUCCESS:
      return {
        ...state,
        coordinates: action.payload,
      };
    case TOGGLE_FAVORITE_SUCCESS:
      return {
        ...state,
        home: action.payload,
      };
    default:
      return state;
  }
};

// SELECTORS
export const selectFeaturedHomes = (state) => state.homes.homeData.featuredListings;

export const selectNewHomes = (state) => state.homes.homeData.newListings;

export const selectHomes = (state) => state.homes.homes;

export const selectHome = (state) => state.homes.home;

export const selectPrimaryDomain = (state) => state.homes.primaryDomain;

export const selectCoordinates = (state) => state.homes.coordinates.coordinates;

// Action Creators
export const retrieveHomes = () => ({
  [CALL_API]: {
    types: [RETRIEVE_HOMES_REQUEST, RETRIEVE_HOMES_SUCCESS, RETRIEVE_HOMES_FAILURE],
    endpoint: 'listings/home',
  },
});

export const retrieveHome = (id, agent) => ({
  [CALL_API]: {
    types: [RETRIEVE_HOME_REQUEST, RETRIEVE_HOME_SUCCESS, RETRIEVE_HOME_FAILURE],
    endpoint: `listings/${id}`,
    query: {
      agent: agent,
    },
  },
});

export const mapCoordinates = (latitude, longitude, filters, page, address) => (dispatch) => {
  dispatch({
    type: CANCEL_HOMES_SEARCH,
    meta: {
      debounce: {
        cancel: true,
        key: SEARCH_HOMES,
      },
    },
  });

  return dispatch({
    [CALL_API]: {
      types: [MAP_COORDINATES_REQUEST, MAP_COORDINATES_SUCCESS, MAP_COORDINATES_FAILURE],
      endpoint: `listings/map_coordinates`,
      query: {
        latitude: latitude,
        longitude: longitude,
        filters: filters,
        page: page,
        address: address,
      },
    },
    meta: {
      debounce: {
        time: 300,
        key: SEARCH_HOMES,
      },
    },
  });
};

export const searchHomesList = (latitude, longitude, filters, page, address, bounds, showPolygon) => (dispatch) => {
  dispatch({
    type: CANCEL_HOMES_SEARCH,
    meta: {
      debounce: {
        cancel: true,
        key: SEARCH_HOMES,
      },
    },
  });

  return dispatch({
    [CALL_API]: {
      types: [RETRIEVE_HOMES_LIST_REQUEST, RETRIEVE_HOMES_LIST_SUCCESS, RETRIEVE_HOMES_LIST_FAILURE],
      endpoint: `listings/near`,
      query: {
        latitude: latitude,
        longitude: longitude,
        filters: filters,
        page: page,
        address: address,
        bounds: showPolygon ? null : bounds,
      },
    },
    meta: {
      debounce: {
        time: 300,
        key: SEARCH_HOMES,
      },
    },
  });
};

export const contactHomeowner = (homeId, message) => ({
  [CALL_API]: {
    types: [CONTACT_HOME_OWNER_REQUEST, CONTACT_HOME_OWNER_SUCCESS, CONTACT_HOME_OWNER_FAILURE],
    endpoint: `listings/${homeId}/contact`,
    method: HTTP_METHODS.POST,
    body: {
      contactMessage: message,
    },
  },
});

export const contactLender = (values) => (dispatch) => {
  const contactLenderAction = {
    [CALL_API]: {
      types: [CONTACT_LENDER_REQUEST, CONTACT_LENDER_SUCCESS, CONTACT_LENDER_FAILURE],
      endpoint: 'contact_lender',
      method: HTTP_METHODS.POST,
      body: {
        ...values,
      },
    },
  };

  return dispatch(contactLenderAction);
};

export const toggleFavorite = (homeId) => ({
  [CALL_API]: {
    types: [TOGGLE_FAVORITE_REQUEST, TOGGLE_FAVORITE_SUCCESS, TOGGLE_FAVORITE_FAILURE],
    endpoint: `listings/${homeId}/toggle_favorite`,
    method: HTTP_METHODS.PUT,
  },
});

export const sendFlyerEmail = (homeId, params) => ({
  [CALL_API]: {
    types: [SEND_FLYER_EMAIL_REQUEST, SEND_FLYER_EMAIL_SUCCESS, SEND_FLYER_EMAIL_FAILURE],
    endpoint: `listings/${homeId}/send_flyer_email`,
    method: HTTP_METHODS.POST,
    body: {
      email_flyer_params: params,
    },
  },
});

export const setHome = (home) => (dispatch) => dispatch({type: RETRIEVE_HOME_SUCCESS, payload: home});
