import merge from 'lodash/merge'

// Initial State
const initialState = {}

// Reducer
export default (state = initialState, action) => {
  if (action.payload && action.payload.entities) {
    return merge({}, state, action.payload.entities)
  }
  return state
}

// Selectors

export const selectEntities = state => state.entities
