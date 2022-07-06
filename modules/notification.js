const SET_NOTIFICATION = 'dealty/notification/SET_NOTIFICATION'

const initialState = {
  isNotification: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      {
        return {
          ...state,
          isNotification: action.payload,
        }
      }
    default:
      return state
  }
}

export const setNotification = (val) => (dispatch) => {
  return dispatch({ type: SET_NOTIFICATION, payload: val })
}
