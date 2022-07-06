import { CALL_API, HTTP_METHODS } from '../middlewares/api'

// API Actions
const RETRIEVE_PLANS_REQUEST = 'dealty/plan/RETRIEVE_PLANS_REQUEST'
const RETRIEVE_PLANS_SUCCESS = 'dealty/plan/RETRIEVE_PLANS_SUCCESS'
const RETRIEVE_PLANS_FAILURE = 'dealty/plan/RETRIEVE_PLANS_FAILURE'

const RETRIEVE_PLAN_REQUEST = 'dealty/plan/RETRIEVE_PLAN_REQUEST'
const RETRIEVE_PLAN_SUCCESS = 'dealty/plan/RETRIEVE_PLAN_SUCCESS'
const RETRIEVE_PLAN_FAILURE = 'dealty/plan/RETRIEVE_PLAN_FAILURE'

// Initial State
const initialState = {
  plans: [],
  plan: null
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_PLANS_SUCCESS:
      return {
        ...state,
        plans: action.payload
      }

    case RETRIEVE_PLAN_SUCCESS:
      return {
        ...state,
        plan: action.payload
      }

    default:
      return state
  }
}

// Action Creators
export const retrievePlans = () => ({
  [CALL_API]: {
    types: [RETRIEVE_PLANS_REQUEST, RETRIEVE_PLANS_SUCCESS, RETRIEVE_PLANS_FAILURE],
    endpoint: 'plans',
    method: HTTP_METHODS.GET
  },
})

export const retrievePlan = (id) => ({
  [CALL_API]: {
    types: [RETRIEVE_PLAN_REQUEST, RETRIEVE_PLAN_SUCCESS, RETRIEVE_PLAN_FAILURE],
    endpoint: `plans/${id}`,
    method: HTTP_METHODS.GET
  },
})

