import { CALL_API, HTTP_METHODS } from '../middlewares/api'

// API Actions
const CREATE_LEAD_CONTACT_REQUEST = 'dealty/chat_rooms/LEAD_CONTACT_REQUEST'
const CREATE_LEAD_CONTACT_SUCCESS = 'dealty/chat_rooms/LEAD_CONTACT_SUCCESS'
const CREATE_LEAD_CONTACT_FAILURE = 'dealty/chat_rooms/LEAD_CONTACT_FAILURE'

// Initial State
const initialState = {
  user: []
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_LEAD_CONTACT_SUCCESS:
    return{
      ...state,
      user: action.payload
    }
    default:
      return state
  }
}

// Action Creators
export const createLeadContact = (lead) => ({
  [CALL_API]: {
    types: [CREATE_LEAD_CONTACT_REQUEST, CREATE_LEAD_CONTACT_SUCCESS, CREATE_LEAD_CONTACT_FAILURE],
    endpoint: `lead_contact`,
    method: HTTP_METHODS.POST,
    body: { lead }
  }
})
