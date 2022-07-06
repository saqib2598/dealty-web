import { CALL_API } from '../middlewares/api'

// API Actions
const RESOURCES_REQUEST       = 'dealty/resources/RESOURCES_REQUEST'
const RESOURCES_SUCCESS       = 'dealty/resources/RESOURCES_SUCCESS'
const RESOURCES_FAILURE       = 'dealty/resources/RESOURCES_FAILURE'


// Initial State
const initialState = {
  resources: [],
}

// Selectors
export const selectResources = state => state.resources.resources

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case RESOURCES_SUCCESS:
      return {
        ...state,
        resources: action.payload,
      }
    default:
      return state
  }
}

// Action Creators
export const retrieveResources = (queryParams) => ({
  [CALL_API]: {
    types: [RESOURCES_REQUEST, RESOURCES_SUCCESS, RESOURCES_FAILURE],
    endpoint: `resources?${queryParams}`,
  },
})
