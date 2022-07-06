import { CALL_API, HTTP_METHODS } from '../middlewares/api'

// API Actions
const RETRIEVE_JOB_REQUEST = 'dealty/job/RETRIEVE_JOB_REQUEST'
const RETRIEVE_JOB_SUCCESS = 'dealty/job/RETRIEVE_JOB_SUCCESS'
const RETRIEVE_JOB_FAILURE = 'dealty/job/RETRIEVE_JOB_FAILURE'

// Initial State
const initialState = {
  job: null
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_JOB_SUCCESS:
      return {
        ...state,
        job: action.payload
      }

    default:
      return state
  }
}

// Action Creators
export const retrieveJob = (id) => ({
  [CALL_API]: {
    types: [RETRIEVE_JOB_REQUEST, RETRIEVE_JOB_SUCCESS, RETRIEVE_JOB_FAILURE],
    endpoint: `jobs/${id}`,
    method: HTTP_METHODS.GET
  },
})

