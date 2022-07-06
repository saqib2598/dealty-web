import { CALL_API, HTTP_METHODS } from '../middlewares/api'

// API Actions
const CREATE_PROFESSIONAL_PHOTOS_REQUEST = 'dealty/listing/CREATE_PROFESSIONAL_PHOTOS_REQUEST'
const CREATE_PROFESSIONAL_PHOTOS_SUCCESS = 'dealty/listing/CREATE_PROFESSIONAL_PHOTOS_SUCCESS'
const CREATE_PROFESSIONAL_PHOTOS_FAILURE = 'dealty/listing/CREATE_PROFESSIONAL_PHOTOS_FAILURE'

const UPDATE_PROFESSIONAL_PHOTOS_REQUEST = 'dealty/listing/UPDATE_PROFESSIONAL_PHOTOS_REQUEST'
const UPDATE_PROFESSIONAL_PHOTOS_SUCCESS = 'dealty/listing/UPDATE_PROFESSIONAL_PHOTOS_SUCCESS'
const UPDATE_PROFESSIONAL_PHOTOS_FAILURE = 'dealty/listing/UPDATE_PROFESSIONAL_PHOTOS_FAILURE'


// Action Creators
export const createProfessionalPhotos = (listingId, params) => ({
  [CALL_API]: {
    types: [CREATE_PROFESSIONAL_PHOTOS_REQUEST, CREATE_PROFESSIONAL_PHOTOS_SUCCESS, CREATE_PROFESSIONAL_PHOTOS_FAILURE],
    endpoint: `listings/${listingId}/photograph_orders/`,
    method: HTTP_METHODS.POST,
    body: {
      photograph_order_params: params
    }
  },
})

export const updateProfessionalPhotos = (listingId, id, params) => ({
  [CALL_API]: {
    types: [UPDATE_PROFESSIONAL_PHOTOS_REQUEST, UPDATE_PROFESSIONAL_PHOTOS_SUCCESS, UPDATE_PROFESSIONAL_PHOTOS_FAILURE],
    endpoint: `listings/${listingId}/photograph_orders/${id}`,
    method: HTTP_METHODS.PUT,
    body: {
      photograph_order_params: params
    }
  },
})
