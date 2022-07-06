import { createSelector } from 'reselect'
import { CALL_API, HTTP_METHODS } from '../middlewares/api'
import { selectEntities } from '../modules/entities'

// API Actions
const CREATE_LENDER_PREQUALIFICATION_REQUEST              = 'dealty/lenderPrequalifications/CREATE_LENDER_PREQUALIFICATION_REQUEST'
const CREATE_LENDER_PREQUALIFICATION_SUCCESS              = 'dealty/lenderPrequalifications/CREATE_LENDER_PREQUALIFICATION_SUCCESS'
const CREATE_LENDER_PREQUALIFICATION_FAILURE              = 'dealty/lenderPrequalifications/CREATE_LENDER_PREQUALIFICATION_FAILURE'

const UPDATE_LENDER_PREQUALIFICATION_REQUEST              = 'dealty/lenderPrequalifications/UPDATE_LENDER_PREQUALIFICATION_REQUEST'
const UPDATE_LENDER_PREQUALIFICATION_SUCCESS              = 'dealty/lenderPrequalifications/UPDATE_LENDER_PREQUALIFICATION_SUCCESS'
const UPDATE_LENDER_PREQUALIFICATION_FAILURE              = 'dealty/lenderPrequalifications/UPDATE_LENDER_PREQUALIFICATION_FAILURE'

const RETRIEVE_LENDER_PREQUALIFICATIONS_REQUEST           = 'dealty/lenderPrequalifications/RETRIEVE_LENDER_PREQUALIFICATIONS_REQUEST'
const RETRIEVE_LENDER_PREQUALIFICATIONS_SUCCESS           = 'dealty/lenderPrequalifications/RETRIEVE_LENDER_PREQUALIFICATIONS_SUCCESS'
const RETRIEVE_LENDER_PREQUALIFICATIONS_FAILURE           = 'dealty/lenderPrequalifications/RETRIEVE_LENDER_PREQUALIFICATIONS_FAILURE'



export { CREATE_LENDER_PREQUALIFICATION_SUCCESS, UPDATE_LENDER_PREQUALIFICATION_SUCCESS }

// Initial State
const initialState = {
  lenderPrequalifications: []
}


// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_LENDER_PREQUALIFICATION_SUCCESS:
    return{
      ...state,
      lenderPrequalifications: [ ...state.lenderPrequalifications, action.payload]
    }
    case RETRIEVE_LENDER_PREQUALIFICATIONS_SUCCESS:
      return{
        ...state,
        lenderPrequalifications: action.payload
      }
    case UPDATE_LENDER_PREQUALIFICATION_SUCCESS:
      let lenderPrequalifications = [...state.lenderPrequalifications]
      let index = lenderPrequalifications.findIndex((lenderPrequalification) => lenderPrequalification.id == action.payload.id)
      lenderPrequalifications[index].value = action.payload.value
      return{
        ...state,
        lenderPrequalifications: lenderPrequalifications
      }

    default:
      return state
  }
}

export const selectLenderPrequalifications = state => {
  return state.lenderPrequalifications.lenderPrequalifications
}

// Action Creators
export const createLenderPrequalification = (lenderPrequalification, homeId) => ({
  [CALL_API]: {
    types: [CREATE_LENDER_PREQUALIFICATION_REQUEST, CREATE_LENDER_PREQUALIFICATION_SUCCESS, CREATE_LENDER_PREQUALIFICATION_FAILURE],
    endpoint: `listings/${homeId}/lender_prequalifications`,
    method: HTTP_METHODS.POST,
    body: { lenderPrequalification },
  },
})

export const updateLenderPrequalification = (lenderPrequalification, params, homeId) => ({
  [CALL_API]: {
    types: [UPDATE_LENDER_PREQUALIFICATION_REQUEST, UPDATE_LENDER_PREQUALIFICATION_SUCCESS, UPDATE_LENDER_PREQUALIFICATION_FAILURE],
    endpoint: `listings/${homeId}/lender_prequalifications/${lenderPrequalification.id}`,
    method: HTTP_METHODS.PUT,
    body: { lenderPrequalification: params },
  },
})

export const retrieveLenderPrequalifications = (homeId) => ({
  [CALL_API]: {
    types: [RETRIEVE_LENDER_PREQUALIFICATIONS_REQUEST, RETRIEVE_LENDER_PREQUALIFICATIONS_SUCCESS, RETRIEVE_LENDER_PREQUALIFICATIONS_FAILURE],
    endpoint: `listings/${homeId}/lender_prequalifications`,
    method: HTTP_METHODS.GET,
  },
})

