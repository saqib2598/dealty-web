import { CALL_API, HTTP_METHODS } from '../middlewares/api'

// API Actions
const RETRIEVE_MESSAGES_REQUEST = 'dealty/messages/RETRIEVE_MESSAGES_REQUEST'
const RETRIEVE_MESSAGES_SUCCESS = 'dealty/messages/RETRIEVE_MESSAGES_SUCCESS'
const RETRIEVE_MESSAGES_FAILURE = 'dealty/messages/RETRIEVE_MESSAGES_FAILURE'

const CREATE_MESSAGE_REQUEST = 'dealty/messages/CREATE_MESSAGE_REQUEST'
const CREATE_MESSAGE_SUCCESS = 'dealty/messages/CREATE_MESSAGE_SUCCESS'
const CREATE_MESSAGE_FAILURE = 'dealty/messages/CREATE_MESSAGE_FAILURE'

// Initial State
const initialState = {
  messages: {},
  new_messages: []
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_MESSAGES_SUCCESS:
    return{
      ...state,
      messages: action.payload
    }

    default:
      return state
  }
}

// Action Creators
export const retrieveMessages = (id) => ({
  [CALL_API]: {
    types: [RETRIEVE_MESSAGES_REQUEST, RETRIEVE_MESSAGES_SUCCESS, RETRIEVE_MESSAGES_FAILURE],
    endpoint: `chat_rooms/${id}/messages`,
    method: HTTP_METHODS.GET
  }
})

export const createMessage = (message) => ({
  [CALL_API]: {
    types: [CREATE_MESSAGE_REQUEST, CREATE_MESSAGE_SUCCESS, CREATE_MESSAGE_FAILURE],
    endpoint: `messages`,
    method: HTTP_METHODS.POST,
    body: message 
  }
})
