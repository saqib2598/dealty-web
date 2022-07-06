import { CALL_API, HTTP_METHODS } from '../middlewares/api'

// API Actions
const RETRIEVE_SELLER_DETAILS_REQUEST = 'dealty/sellerDetails/RETRIEVE_SELLER_DETAISL_REQUEST'
const RETRIEVE_SELLER_DETAILS_SUCCESS = 'dealty/sellerDetails/RETRIEVE_SELLER_DETAISL_SUCCESS'
const RETRIEVE_SELLER_DETAILS_FAILURE = 'dealty/sellerDetails/RETRIEVE_SELLER_DETAISL_FAILURE'


const CREATE_SELLER_DETAIL_REQUEST = 'dealty/sellerDetails/CREATE_SELLER_DETAIL_REQUEST'
const CREATE_SELLER_DETAIL_SUCCESS = 'dealty/sellerDetails/CREATE_SELLER_DETAIL_SUCCESS'
const CREATE_SELLER_DETAIL_FAILURE = 'dealty/sellerDetails/CREATE_SELLER_DETAIL_FAILURE'

const DELETE_SELLER_DETAIL_REQUEST = 'dealty/sellerDetails/DELETE_SELLER_DETAIL_REQUEST'
const DELETE_SELLER_DETAIL_SUCCESS = 'dealty/sellerDetails/DELETE_SELLER_DETAIL_SUCCESS'
const DELETE_SELLER_DETAIL_FAILURE = 'dealty/sellerDetails/DELETE_SELLER_DETAIL_FAILURE'

// Initial State
const initialState = {
  seller_details: []
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SELLER_DETAIL_SUCCESS:
      let seller_details = [...state.seller_details]
      seller_details.push(action.payload)
      return {
        ...state,
        seller_details: seller_details,
      }
    case DELETE_SELLER_DETAIL_SUCCESS:
      let seller_det = [...state.seller_details]
      if(action.payload.id){
        seller_det=seller_det.filter(item => item.id !== action.payload.id)
      }
      return {
        ...state,
        seller_details: seller_det
      }
    case RETRIEVE_SELLER_DETAILS_SUCCESS:
      return {
        ...state,
        seller_details: action.payload,
      }
    default:
      return state
  }
}

export const getSellerDetail = state => {
  return state.sellerDetails
}

// Action Creators
export const createSellerDetail = (seller_detail) => ({
  [CALL_API]: {
    types: [CREATE_SELLER_DETAIL_REQUEST, CREATE_SELLER_DETAIL_SUCCESS, CREATE_SELLER_DETAIL_FAILURE],
    endpoint: 'seller_details',
    method: HTTP_METHODS.POST,
    body: { seller_detail },
  },
})

export const deleteSellerDetail = (id) => ({
  [CALL_API]: {
    types: [DELETE_SELLER_DETAIL_REQUEST, DELETE_SELLER_DETAIL_SUCCESS, DELETE_SELLER_DETAIL_FAILURE],
    endpoint: `seller_details/${id}`,
    method: HTTP_METHODS.DELETE
  },
})

export const retrieveSellerDetails = () => ({
  [CALL_API]: {
    types: [RETRIEVE_SELLER_DETAILS_REQUEST, RETRIEVE_SELLER_DETAILS_SUCCESS, RETRIEVE_SELLER_DETAILS_FAILURE],
    endpoint: 'seller_details',
    method: HTTP_METHODS.GET
  }
})
