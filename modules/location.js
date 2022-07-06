import { CALL_API, HTTP_METHODS } from '../middlewares/api'

// API Actions
const RETRIEVE_STATES_REQUEST = 'dealty/users/RETRIEVE_STATES_REQUEST'
const RETRIEVE_STATES_SUCCESS = 'dealty/users/RETRIEVE_STATES_SUCCESS'
const RETRIEVE_STATES_FAILURE = 'dealty/users/RETRIEVE_STATES_FAILURE'

const RETRIEVE_CITY_REQUEST = 'dealty/users/RETRIEVE_CITY_REQUEST'
const RETRIEVE_CITY_SUCCESS = 'dealty/users/RETRIEVE_CITY_SUCCESS'
const RETRIEVE_CITY_FAILURE = 'dealty/users/RETRIEVE_CITY_FAILURE'

// Initial State
const initialState = {
    locationStates: [],
    city: {}
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_STATES_SUCCESS:
      {
        return {
          ...state,
          locationStates: action.payload,
        }
      }
      case RETRIEVE_CITY_SUCCESS:
      {
        return {
          ...state,
          city: action.payload,
        }
      }
    default:
      return state
  }
}

// Action Creators
export const retrieveStates = () => ({
  [CALL_API]: {
    types: [RETRIEVE_STATES_REQUEST, RETRIEVE_STATES_SUCCESS, RETRIEVE_STATES_FAILURE],
    endpoint: 'states',
    method: HTTP_METHODS.GET
  },
})

export const retrieveCity = (state,city) => ({
  [CALL_API]: {
    types: [RETRIEVE_CITY_REQUEST, RETRIEVE_CITY_SUCCESS, RETRIEVE_CITY_FAILURE],
    endpoint: `states/${state}/cities/${city}`,
    method: HTTP_METHODS.GET
  },
})
