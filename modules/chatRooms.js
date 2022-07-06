import { CALL_API, HTTP_METHODS } from '../middlewares/api'

// API Actions
const RETRIEVE_CHAT_ROOMS_REQUEST = 'dealty/chat_rooms/RETRIEVE_CHAT_ROOMS_REQUEST'
const RETRIEVE_CHAT_ROOMS_SUCCESS = 'dealty/chat_rooms/RETRIEVE_CHAT_ROOMS_SUCCESS'
const RETRIEVE_CHAT_ROOMS_FAILURE = 'dealty/chat_rooms/RETRIEVE_CHAT_ROOMS_FAILURE'

const CREATE_CHAT_ROOMS_REQUEST = 'dealty/chat_rooms/CREATE_CHAT_ROOMS_REQUEST'
const CREATE_CHAT_ROOMS_SUCCESS = 'dealty/chat_rooms/CREATE_CHAT_ROOMS_SUCCESS'
const CREATE_CHAT_ROOMS_FAILURE = 'dealty/chat_rooms/CREATE_CHAT_ROOMS_FAILURE'

const READ_MESSAGES_REQUEST = 'dealty/chat_rooms/READ_MESSAGES_REQUEST'
const READ_MESSAGES_SUCCESS = 'dealty/chat_rooms/READ_MESSAGES_SUCCESS'
const READ_MESSAGES_FAILURE = 'dealty/chat_rooms/READ_MESSAGES_FAILURE'

const UPDATE_CHAT_ROOMS_UNREAD_COUNT = 'dealty/chat_rooms/UPDATE_CHAT_ROOMS_UNREAD_COUNT'

// Initial State
const initialState = {
  chat_rooms: []
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_CHAT_ROOMS_SUCCESS:
    return{
      ...state,
      chat_rooms: action.payload
    }

    case CREATE_CHAT_ROOMS_SUCCESS:
    {
      let chat_rooms = [...state.chat_rooms]
      chat_rooms.push(action.payload)
      return {
        ...state,
        chat_rooms: chat_rooms
      }
    }

    case UPDATE_CHAT_ROOMS_UNREAD_COUNT:
      {
        const updatedChatRooms = state.chat_rooms.map(
          el => el.id == action.payload.id ? {...el, unreads: action.payload.unread} : el
        )
        
        return {
          ...state,
          chat_rooms: updatedChatRooms
        }
      }
    
    default:
      return state
  }
}

// Selectors
export const chatRoom = state => state.chat_rooms

// Action Creators
export const retrieveChatRooms = () => ({
  [CALL_API]: {
    types: [RETRIEVE_CHAT_ROOMS_REQUEST, RETRIEVE_CHAT_ROOMS_SUCCESS, RETRIEVE_CHAT_ROOMS_FAILURE],
    endpoint: `chat_rooms`,
    method: HTTP_METHODS.GET
  }
})

export const createChatRoom = (listing_id, loan_officer_id) => ({
  [CALL_API]: {
    types: [CREATE_CHAT_ROOMS_REQUEST, CREATE_CHAT_ROOMS_SUCCESS, CREATE_CHAT_ROOMS_FAILURE],
    endpoint: `chat_rooms`,
    method: HTTP_METHODS.POST,
    body: { listing_id: listing_id, loan_officer_id: loan_officer_id }
  }
})

export const readChatRoomMessages = (id) => ({
  [CALL_API]: {
    types: [READ_MESSAGES_REQUEST, READ_MESSAGES_SUCCESS, READ_MESSAGES_FAILURE],
    endpoint: `chat_rooms/${id}/read_messages`,
    method: HTTP_METHODS.POST
  }
})

export const updateChatRoomsUnReadCount = (chatRoom) => (dispatch) => {
  return dispatch({ type: UPDATE_CHAT_ROOMS_UNREAD_COUNT, payload: chatRoom })
}
