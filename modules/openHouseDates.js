import { createSelector } from 'reselect'
import { CALL_API, HTTP_METHODS } from '../middlewares/api'

// API Actions
const CREATE_OPEN_HOUSE_DATE_REQUEST                    = 'dealty/openHouseDates/CREATE_OPEN_HOUSE_DATE_REQUEST'
const CREATE_OPEN_HOUSE_DATE_SUCCESS                    = 'dealty/openHouseDates/CREATE_OPEN_HOUSE_DATE_SUCCESS'
const CREATE_OPEN_HOUSE_DATE_FAILURE                    = 'dealty/openHouseDates/CREATE_OPEN_HOUSE_DATE_FAILURE'

const RETRIEVE_OPEN_HOUSE_DATES_REQUEST                  = 'dealty/openHouseDates/RETRIEVE_OPEN_HOUSE_DATES_REQUEST'
const RETRIEVE_OPEN_HOUSE_DATES_SUCCESS                  = 'dealty/openHouseDates/RETRIEVE_OPEN_HOUSE_DATES_SUCCESS'
const RETRIEVE_OPEN_HOUSE_DATES_FAILURE                  = 'dealty/openHouseDates/RETRIEVE_OPEN_HOUSE_DATES_FAILURE'

const DELETE_OPEN_HOUSE_DATE_REQUEST                    = 'dealty/openHouseDates/DELETE_OPEN_HOUSE_DATE_REQUEST'
const DELETE_OPEN_HOUSE_DATE_SUCCESS                    = 'dealty/openHouseDates/DELETE_OPEN_HOUSE_DATE_SUCCESS'
const DELETE_OPEN_HOUSE_DATE_FAILURE                    = 'dealty/openHouseDates/DELETE_OPEN_HOUSE_DATE_FAILURE'


// Initial State
const initialState = {
  open_house_dates: []
}


// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_OPEN_HOUSE_DATES_SUCCESS:
      return {
        ...state,
        open_house_dates: action.payload
      }

    case CREATE_OPEN_HOUSE_DATE_SUCCESS:
      return {
        ...state,
        open_house_dates: [...state.open_house_dates, action.payload]
      }

    case DELETE_OPEN_HOUSE_DATE_SUCCESS:
      let open_house_dates = [...state.open_house_dates]
      if(action.payload.id){
        open_house_dates = open_house_dates.filter((item) => item.id !== action.payload.id)
      }
      return {
        ...state,
        open_house_dates: open_house_dates
      }

    default:
      return state
  }
}

//SELECTORS

export const selectOpenHouseDates = state => {
  return state.openHouseDates
}

// Action Creators
export const createOpenHouseDates = (listingId, params) => ({
  [CALL_API]: {
    types: [CREATE_OPEN_HOUSE_DATE_REQUEST, CREATE_OPEN_HOUSE_DATE_SUCCESS , CREATE_OPEN_HOUSE_DATE_FAILURE ],
    endpoint: `listings/${listingId}/open_house_dates`,
    method: HTTP_METHODS.POST,
    body: {
      open_house_date: params
    }
  },
})

export const retrieveOpenHouseDates = (listingId) => ({
  [CALL_API]: {
    types: [RETRIEVE_OPEN_HOUSE_DATES_REQUEST, RETRIEVE_OPEN_HOUSE_DATES_SUCCESS, RETRIEVE_OPEN_HOUSE_DATES_FAILURE ],
    endpoint: `listings/${listingId}/open_house_dates`,
    method: HTTP_METHODS.GET
  }
})

export const deleteOpenHouseDate = (listingId, id) => ({
  [CALL_API]: {
    types: [DELETE_OPEN_HOUSE_DATE_REQUEST, DELETE_OPEN_HOUSE_DATE_SUCCESS, DELETE_OPEN_HOUSE_DATE_FAILURE ],
    endpoint: `listings/${listingId}/open_house_dates/${id}`,
    method: HTTP_METHODS.DELETE
  }
})




