import { CALL_API, HTTP_METHODS } from '../middlewares/api'

// API Actions
const RETRIEVE_REVIEWES_REQUEST = 'dealty/users/RETRIEVE_REVIEWES_REQUEST'
const RETRIEVE_REVIEWES_SUCCESS = 'dealty/users/RETRIEVE_REVIEWES_SUCCESS'
const RETRIEVE_REVIEWES_FAILURE = 'dealty/users/RETRIEVE_REVIEWES_FAILURE'

// Initial State
const initialState = {
    reviews: []
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_REVIEWES_SUCCESS:
      {
        return {
          ...state,
          reviews: action.payload,
        }
      }
    default:
      return state
  }
}

// Action Creators
export const retrieveReviews = () => ({
  [CALL_API]: {
    types: [RETRIEVE_REVIEWES_REQUEST, RETRIEVE_REVIEWES_SUCCESS, RETRIEVE_REVIEWES_FAILURE],
    endpoint: 'reviews',
    method: HTTP_METHODS.GET
  },
})
