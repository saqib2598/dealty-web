import { CALL_API, HTTP_METHODS } from '../middlewares/api'

// API Actions
const SEND_ONLINE_OFFER_REQUEST = 'dealty/offers/SEND_ONLINE_OFFER_REQUEST'
const SEND_ONLINE_OFFER_SUCCESS = 'dealty/offers/SEND_ONLINE_OFFER_SUCCESS'
const SEND_ONLINE_OFFER_FAILURE = 'dealty/offers/SEND_ONLINE_OFFER_FAILURE'

const RETRIEVE_OFFERS_REQUEST = 'dealty/offers/RETRIEVE_OFFERS_REQUEST'
const RETRIEVE_OFFERS_SUCCESS = 'dealty/offers/RETRIEVE_OFFERS_SUCCESS'
const RETRIEVE_OFFERS_FAILURE = 'dealty/offers/RETRIEVE_OFFERS_FAILURE'

const UPDATE_OFFER_REQUEST = 'dealty/offers/UPDATE_OFFER_REQUEST'
const UPDATE_OFFER_SUCCESS = 'dealty/offers/UPDATE_OFFER_SUCCESS'
const UPDATE_OFFER_FAILURE = 'dealty/offers/UPDATE_OFFER_FAILURE'

const RETRIEVE_HISTORY_REQUEST = 'dealty/offers/RETRIEVE_HISTORY_REQUEST'
const RETRIEVE_HISTORY_SUCCESS = 'dealty/offers/RETRIEVE_HISTORY_SUCCESS'
const RETRIEVE_HISTORY_FAILURE = 'dealty/offers/RETRIEVE_HISTORY_FAILURE'

// Initial State
const initialState = {
  offers: [],
  history: {}
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_OFFERS_SUCCESS:
      return {
        ...state,
        offers: action.payload
      }

    case UPDATE_OFFER_SUCCESS: {
      let offers = [...{...state}.offers]
      offers[state.offers.findIndex(offer => offer.id == action.payload.id)] = action.payload
      return {
        ...state,
        offers: offers
      }
    }

    case RETRIEVE_HISTORY_SUCCESS:
      return {...state, history: action.payload}

    default:
      return state
  }
}

export const sendOnlineOffer = (listing, message ) => ({
  [CALL_API]: {
    types: [SEND_ONLINE_OFFER_REQUEST, SEND_ONLINE_OFFER_SUCCESS, SEND_ONLINE_OFFER_FAILURE],
    endpoint: `listings/${listing.id}/offers`,
    method: HTTP_METHODS.POST,
    body:{
      offer: message
    }
  },
})

export const retrieveOffers = queryParams => ({
  [CALL_API]: {
    types: [RETRIEVE_OFFERS_REQUEST, RETRIEVE_OFFERS_SUCCESS, RETRIEVE_OFFERS_FAILURE],
    endpoint: `offers?${queryParams}`,
    method: HTTP_METHODS.GET
  }
})

export const updateOffer = (id, offer) => ({
  [CALL_API]: {
    types: [UPDATE_OFFER_REQUEST, UPDATE_OFFER_SUCCESS, UPDATE_OFFER_FAILURE],
    endpoint: `offers/${id}`,
    method: HTTP_METHODS.PUT,
    body: offer
  }
})

export const retrieveHistory = id => ({
  [CALL_API]: {
    types: [RETRIEVE_HISTORY_REQUEST, RETRIEVE_HISTORY_SUCCESS, RETRIEVE_HISTORY_FAILURE],
    endpoint: `offers/${id}/history`,
    method: HTTP_METHODS.GET
  }
})
