import { CALL_API, HTTP_METHODS } from '../middlewares/api'

// API Actions
const RETRIEVE_FAQS_REQUEST = 'dealty/faqs/RETRIEVE_FAQS_REQUEST'
const RETRIEVE_FAQS_SUCCESS = 'dealty/faqs/RETRIEVE_FAQS_SUCCESS'
const RETRIEVE_FAQS_FAILURE = 'dealty/faqs/RETRIEVE_FAQS_FAILURE'

// Initial State
const initialState = {
  faqs_categories: []
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_FAQS_SUCCESS:
      return {
        ...state,
        faqs_categories: action.payload
      }

    default:
      return state
  }
}

// Action Creators
export const retrieveFaqs = () => ({
  [CALL_API]: {
    types: [RETRIEVE_FAQS_REQUEST, RETRIEVE_FAQS_SUCCESS, RETRIEVE_FAQS_FAILURE],
    endpoint: 'faqs',
    method: HTTP_METHODS.GET
  },
})
