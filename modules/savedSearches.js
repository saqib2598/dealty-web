import { CALL_API, HTTP_METHODS } from '../middlewares/api'

// API Actions
const RETRIEVE_SAVED_SEARCHES_REQUEST = 'dealty/sellerDetails/RETRIEVE_SAVED_SEARCHES_REQUEST'
const RETRIEVE_SAVED_SEARCHES_SUCCESS = 'dealty/sellerDetails/RETRIEVE_SAVED_SEARCHES_SUCCESS'
const RETRIEVE_SAVED_SEARCHES_FAILURE = 'dealty/sellerDetails/RETRIEVE_SAVED_SEARCHES_FAILURE'


const CREATE_SAVED_SEARCH_REQUEST = 'dealty/sellerDetails/CREATE_SAVED_SEARCH_REQUEST'
const CREATE_SAVED_SEARCH_SUCCESS = 'dealty/sellerDetails/CREATE_SAVED_SEARCH_SUCCESS'
const CREATE_SAVED_SEARCH_FAILURE = 'dealty/sellerDetails/CREATE_SAVED_SEARCH_FAILURE'

const DELETE_SAVED_SEARCH_REQUEST = 'dealty/sellerDetails/DELETE_SAVED_SEARCH_REQUEST'
const DELETE_SAVED_SEARCH_SUCCESS = 'dealty/sellerDetails/DELETE_SAVED_SEARCH_SUCCESS'
const DELETE_SAVED_SEARCH_FAILURE = 'dealty/sellerDetails/DELETE_SAVED_SEARCH_FAILURE'

// Initial State
const initialState = {
  saved_searches: []
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SAVED_SEARCH_SUCCESS:
      let saved_searches = [...state.saved_searches]
      saved_searches.push(action.payload)
      return {
        ...state,
        saved_searches: saved_searches,
      }
    case DELETE_SAVED_SEARCH_SUCCESS:
      let saved_homes = [...state.saved_searches]
      if(action.payload.id){
        saved_homes=saved_homes.filter(item => item.id !== action.payload.id)
      }
      return {
        ...state,
        saved_searches: saved_homes
      }
    case RETRIEVE_SAVED_SEARCHES_SUCCESS:
      return {
        ...state,
        saved_searches: action.payload,
      }
    default:
      return state
  }
}

export const selectSavedSearch = state => {
  return state.savedSearches.saved_searches
}

// Action Creators
export const createSaveSearch = (saved_search) => ({
  [CALL_API]: {
    types: [CREATE_SAVED_SEARCH_REQUEST, CREATE_SAVED_SEARCH_SUCCESS, CREATE_SAVED_SEARCH_FAILURE],
    endpoint: 'saved_searches',
    method: HTTP_METHODS.POST,
    body: { saved_search },
  },
})

export const deleteSavedSearch = (id) => ({
  [CALL_API]: {
    types: [DELETE_SAVED_SEARCH_REQUEST, DELETE_SAVED_SEARCH_SUCCESS, DELETE_SAVED_SEARCH_FAILURE],
    endpoint: `saved_searches/${id}`,
    method: HTTP_METHODS.DELETE
  },
})

export const retrieveSavedSearches = () => ({
  [CALL_API]: {
    types: [RETRIEVE_SAVED_SEARCHES_REQUEST, RETRIEVE_SAVED_SEARCHES_SUCCESS, RETRIEVE_SAVED_SEARCHES_FAILURE],
    endpoint: 'saved_searches',
    method: HTTP_METHODS.GET,
  }
})
