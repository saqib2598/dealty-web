import { CALL_API, HTTP_METHODS } from '../middlewares/api'
import { UPDATE_PROPERTY_DETAIL_SUCCESS } from  './propertyDetail'

// API Actions
const CREATE_LISTING_REQUEST = 'dealty/users/CREATE_LISTING_REQUEST';
const CREATE_LISTING_SUCCESS = 'dealty/users/CREATE_LISTING_SUCCESS';
const CREATE_LISTING_FAILURE = 'dealty/users/CREATE_LISTING_FAILURE';

const UPDATE_LISTING_REQUEST = 'dealty/users/UPDATE_LISTING_REQUEST';
const UPDATE_LISTING_SUCCESS = 'dealty/users/UPDATE_LISTING_SUCCESS';
const UPDATE_LISTING_FAILURE = 'dealty/users/UPDATE_LISTING_FAILURE';

const RETRIEVE_FACTS_REQUEST = 'dealty/users/RETRIEVE_FACTS_REQUEST';
const RETRIEVE_FACTS_SUCCESS = 'dealty/users/RETRIEVE_FACTS_SUCCESS';
const RETRIEVE_FACTS_FAILURE = 'dealty/users/RETRIEVE_FACTS_FAILURE';

const RETRIEVE_LISTING_REQUEST = 'dealty/listing/LISTING/RETRIEVE_LISTING_REQUEST';
const RETRIEVE_LISTING_SUCCESS = 'dealty/listing/LISTING/RETRIEVE_LISTING_SUCCESS';
const RETRIEVE_LISTING_FAILURE = 'dealty/listing/LISTING/RETRIEVE_LISTING_FAILURE';

const UPLOAD_LISTING_IMAGES_REQUEST = 'dealty/listing/UPLOAD_LISTING_IMAGES_REQUEST';
const UPLOAD_LISTING_IMAGES_SUCCESS = 'dealty/listing/UPLOAD_LISTING_IMAGES_SUCCESS';
const UPLOAD_LISTING_IMAGES_FAILURE = 'dealty/listing/UPLOAD_LISTING_IMAGES_FAILURE';

const RETRIEVE_ACTIVE_LISTING_REQUEST = 'dealty/listing/LISTING/RETRIEVE_ACTIVE_LISTING_REQUEST';
const RETRIEVE_ACTIVE_LISTING_SUCCESS = 'dealty/listing/LISTING/RETRIEVE_ACTIVE_LISTING_SUCCESS';
const RETRIEVE_ACTIVE_LISTING_FAILURE = 'dealty/listing/LISTING/RETRIEVE_ACTIVE_LISTING_FAILURE';

const RETRIEVE_SINGLE_LISTING_REQUEST = 'dealty/listing/LISTING/RETRIEVE_SINGLE_LISTING_REQUEST';
const RETRIEVE_SINGLE_LISTING_SUCCESS = 'dealty/listing/LISTING/RETRIEVE_SINGLE_LISTING_SUCCESS';
const RETRIEVE_SINGLE_LISTING_FAILURE = 'dealty/listing/LISTING/RETRIEVE_SINGLE_LISTING_FAILURE';

const RETRIEVE_FAVORITE_LISTING_REQUEST = 'dealty/listing/RETRIEVE_FAVORITE_LISTING_REQUEST';
const RETRIEVE_FAVORITE_LISTING_SUCCESS = 'dealty/listing/RETRIEVE_FAVORITE_LISTING_SUCCESS';
const RETRIEVE_FAVORITE_LISTING_FAILURE = 'dealty/listing/RETRIEVE_FAVORITE_LISTING_FAILURE';

const DELETE_FAVORITE_LISTING_REQUEST = 'dealty/listing/DELETE_FAVORITE_LISTING_REQUEST';
const DELETE_FAVORITE_LISTING_SUCCESS = 'dealty/listing/DELETE_FAVORITE_LISTING_SUCCESS';
const DELETE_FAVORITE_LISTING_FAILURE = 'dealty/listing/DELETE_FAVORITE_LISTING_FAILURE';

const DELETE_IMAGE_REQUEST = 'dealty/listing/LISTING/DELETE_IMAGE_REQUEST';
const DELETE_IMAGE_SUCCESS = 'dealty/listing/LISTING/DELETE_IMAGE_SUCCESS';
const DELETE_IMAGE_FAILURE = 'dealty/listing/LISTING/DELETE_IMAGE_FAILURE';

const DELETE_LISTING_REQUEST = 'dealty/listing/LISTING/DELETE_LISTING_REQUEST';
const DELETE_LISTING_SUCCESS = 'dealty/listing/LISTING/DELETE_LISTING_SUCCESS';
const DELETE_LISTING_FAILURE = 'dealty/listing/LISTING/DELETE_LISTING_FAILURE';

const ROTATE_IMAGE_REQUEST = 'dealty/listing/LISTING/ROTATE_IMAGE_REQUEST';
const ROTATE_IMAGE_SUCCESS = 'dealty/listing/LISTING/ROTATE_IMAGE_SUCCESS';
const ROTATE_IMAGE_FAILURE = 'dealty/listing/LISTING/ROTATE_IMAGE_FAILURE';

const UPDATE_UPLOAD_REQUEST = 'dealty/listing/LISTING/UPDATE_UPLOAD_REQUEST';
const UPDATE_UPLOAD_SUCCESS = 'dealty/listing/LISTING/UPDATE_UPLOAD_SUCCESS';
const UPDATE_UPLOAD_FAILURE = 'dealty/listing/LISTING/UPDATE_UPLOAD_FAILURE';

const CLAIM_LISTING_REQUEST = 'dealty/listing/LISTING/CLAIM_LISTING_REQUEST';
const CLAIM_LISTING_SUCCESS = 'dealty/listing/LISTING/CLAIM_LISTING_SUCCESS';
const CLAIM_LISTING_FAILURE = 'dealty/listing/LISTING/CLAIM_LISTING_FAILURE';

const VERIFY_CLAIM_REQUEST = 'dealty/listing/LISTING/VERIFY_CLAIM_REQUEST';
const VERIFY_CLAIM_SUCCESS = 'dealty/listing/LISTING/VERIFY_CLAIM_SUCCESS';
const VERIFY_CLAIM_FAILURE = 'dealty/listing/LISTING/VERIFY_CLAIM_FAILURE';

const DELETE_LISTING_VIDEO_REQUEST = 'dealty/listing/DELETE_LISTING_VIDEO_REQUEST';
const DELETE_LISTING_VIDEO_SUCCESS = 'dealty/listing/DELETE_LISTING_VIDEO_SUCCESS';
const DELETE_LISTING_VIDEO_FAILURE = 'dealty/listing/DELETE_LISTING_VIDEO_FAILURE';


// Initial State
const initialState = {
  facts: [],
  listing: null,
  favoritelistings: {},
  searchedSingleListing: null,
};


// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_FACTS_SUCCESS:
      return {
        ...state,
        facts: [{id: 0, content: 'Tell buyers about your home, answer the questions below'}].concat(action.payload),
      };
    case RETRIEVE_LISTING_SUCCESS:
      return {
        ...state,
        listing: action.payload,
      }
    case UPDATE_PROPERTY_DETAIL_SUCCESS:
      return {
        ...state,
        listing: {
          ...action.payload.listing,
          propertyDetail: action.payload.propertyDetail,
        }
      }
    case RETRIEVE_ACTIVE_LISTING_SUCCESS:
      return {
        ...state,
        activeListing: action.payload,
      };
    case DELETE_IMAGE_SUCCESS:
      listing = {...state.listing};
      index = listing.images.findIndex((image) => image.id == action.payload.id);

      if (index !== -1) {
        listing.images.splice(index, 1);
      }

      return {
        ...state,
        listing: listing,
      };

    case ROTATE_IMAGE_SUCCESS:
      let listing = {...state.listing};
      let index = listing.images.findIndex((image) => image.id == action.payload.id);
      listing.images[index].url = action.payload.url + '?time=' + Date.now();

      return {
        ...state,
        listing: listing,
      };

    case UPDATE_UPLOAD_SUCCESS:
      return {
        ...state,
        listing: action.payload,
      };

    case UPLOAD_LISTING_IMAGES_SUCCESS:
      return {
        ...state,
        listing: action.payload,
      };

    case DELETE_LISTING_SUCCESS:
      return {
        ...state,
        listing: null,
      };

    case UPDATE_LISTING_SUCCESS:
      return {
        ...state,
        listing: action.payload,
      };

    case CLAIM_LISTING_SUCCESS:
      return {
        ...state,
        listing: action.payload,
      };

    case VERIFY_CLAIM_SUCCESS:
      return {
        ...state,
        listing: action.payload,
      };

    case RETRIEVE_FAVORITE_LISTING_SUCCESS:
      return {
        ...state,
        favoritelistings: action.payload,
      };

    case DELETE_FAVORITE_LISTING_SUCCESS:
      const data = [...state.favoritelistings.favoriteListings];
      const key = data.findIndex((favoritelisting) => favoritelisting.id == action.payload.slug);
      if (key !== -1) {
        data.splice(key, 1);
      }
      return {
        ...state,
        favoritelistings: {favoriteListings: data},
      };

    case DELETE_LISTING_VIDEO_SUCCESS:
      return {
        ...state, listing: {...state.listing, video: null},
      };

    case RETRIEVE_SINGLE_LISTING_SUCCESS:
      return {
        ...state,
        searchedSingleListing: action.payload,
      };

    default:
      return state;
  }
};


// SELECTORS
export const selectListingFacts = (state) => state.listings.facts;
export const searchedSingleListing = (state) => state.listings.searchedSingleListing;
export const selectListing = (state) => state.listings.listing;
export const selectFavoriteListings = (state) => {
  return state.listings.favoritelistings;
};


// Action Creators
export const createListing = (listing) => ({
  [CALL_API]: {
    types: [CREATE_LISTING_REQUEST, CREATE_LISTING_SUCCESS, CREATE_LISTING_FAILURE],
    endpoint: 'listings',
    method: HTTP_METHODS.POST,
    body: {listing},
  },
});

export const retrieveActiveListing = () => ({
  [CALL_API]: {
    types: [RETRIEVE_ACTIVE_LISTING_REQUEST, RETRIEVE_ACTIVE_LISTING_SUCCESS, RETRIEVE_ACTIVE_LISTING_FAILURE],
    endpoint: `listings/active_listing`,
    method: HTTP_METHODS.GET,
  },
});

export const updateListing = (values, listing) => ({
  [CALL_API]: {
    types: [UPDATE_LISTING_REQUEST, UPDATE_LISTING_SUCCESS, UPDATE_LISTING_FAILURE],
    endpoint: `listings/${listing.id}`,
    method: HTTP_METHODS.PUT,
    body: {listing: values},
  },
});

export const retrieveListingFacts = (listing) => ({
  [CALL_API]: {
    types: [RETRIEVE_FACTS_REQUEST, RETRIEVE_FACTS_SUCCESS, RETRIEVE_FACTS_FAILURE],
    endpoint: `listings/${listing.id}/facts`,
  },
});

export const retrieveListing = (propertyId) => ({
  [CALL_API]: {
    types: [RETRIEVE_LISTING_REQUEST, RETRIEVE_LISTING_SUCCESS, RETRIEVE_LISTING_FAILURE],
    endpoint: `listings/${propertyId}/seller`,
  },
});

export const uploadListingImages = (values, listing) => ({
  [CALL_API]: {
    types: [UPLOAD_LISTING_IMAGES_REQUEST, UPLOAD_LISTING_IMAGES_SUCCESS, UPLOAD_LISTING_IMAGES_FAILURE],
    endpoint: `listings/${listing.id}`,
    method: HTTP_METHODS.PUT,
    body: values,
  },
});

export const deleteImage = (values, listing) => ({
  [CALL_API]: {
    types: [DELETE_IMAGE_REQUEST, DELETE_IMAGE_SUCCESS, DELETE_IMAGE_FAILURE],
    endpoint: `listings/${listing.id}/uploads/${values}`,
    method: HTTP_METHODS.DELETE,
  },
});

export const deleteListing = (propertyId) => ({
  [CALL_API]: {
    types: [DELETE_LISTING_REQUEST, DELETE_LISTING_SUCCESS, DELETE_LISTING_FAILURE],
    endpoint: `listings/${propertyId}`,
    method: HTTP_METHODS.DELETE,
  },
});

export const rotateImage = (values, listing, image_id) => ({
  [CALL_API]: {
    types: [ROTATE_IMAGE_REQUEST, ROTATE_IMAGE_SUCCESS, ROTATE_IMAGE_FAILURE],
    endpoint: `listings/${listing.id}/uploads/${image_id}/rotate`,
    method: HTTP_METHODS.PUT,
    body: values,
  },
});

export const claimListing = (listing_params) => ({
  [CALL_API]: {
    types: [CLAIM_LISTING_REQUEST, CLAIM_LISTING_SUCCESS, CLAIM_LISTING_FAILURE],
    endpoint: `listings/claim_listing`,
    method: HTTP_METHODS.PUT,
    body: listing_params,
  },
});

export const updateUpload = (listingId, values, image_id) => ({
  [CALL_API]: {
    types: [UPDATE_UPLOAD_REQUEST, UPDATE_UPLOAD_SUCCESS, UPDATE_UPLOAD_FAILURE],
    endpoint: `listings/${listingId}/uploads/${image_id}`,
    method: HTTP_METHODS.PUT,
    body: {upload: values},
  },
});

export const verifyClaim = (code, id) => ({
  [CALL_API]: {
    types: [VERIFY_CLAIM_REQUEST, VERIFY_CLAIM_SUCCESS, VERIFY_CLAIM_FAILURE],
    endpoint: `listings/${id}/verify_claim`,
    method: HTTP_METHODS.PUT,
    body: {code: code},
  },
});

export const retrieveFavoriteListings = (page) => ({
  [CALL_API]: {
    types: [RETRIEVE_FAVORITE_LISTING_REQUEST, RETRIEVE_FAVORITE_LISTING_SUCCESS, RETRIEVE_FAVORITE_LISTING_FAILURE],
    endpoint: `listings/favorite_listings?page=${page}`,
    method: HTTP_METHODS.GET,
  },
});

export const deleteFavoriteListings = (listingId) => ({
  [CALL_API]: {
    types: [DELETE_FAVORITE_LISTING_REQUEST, DELETE_FAVORITE_LISTING_SUCCESS, DELETE_FAVORITE_LISTING_FAILURE],
    endpoint: `listings/${listingId}/delete_favorite_listings`,
    method: HTTP_METHODS.DELETE,
  },
});

export const deleteVideo = (listingId, uploadId) => ({
  [CALL_API]: {
    types: [DELETE_LISTING_VIDEO_REQUEST, DELETE_LISTING_VIDEO_SUCCESS, DELETE_LISTING_VIDEO_FAILURE],
    endpoint: `listings/${listingId}/uploads/${uploadId}`,
    method: HTTP_METHODS.DELETE,
  },
});

export const retrieveSingleListing = (address) => ({
  [CALL_API]: {
    types: [RETRIEVE_SINGLE_LISTING_REQUEST, RETRIEVE_SINGLE_LISTING_SUCCESS, RETRIEVE_SINGLE_LISTING_FAILURE],
    endpoint: `listings/single_listing/${address}`,
    method: HTTP_METHODS.GET,
  },
});
