import Router from 'next/router'
import { CALL_API, HTTP_METHODS } from '../middlewares/api'

// API Actions
const CREAT_LISTING_REQUEST = 'dealty/users/CREAT_LISTING_REQUEST'
const CREAT_LISTING_SUCCESS = 'dealty/users/CREAT_LISTING_SUCCESS'
const CREAT_LISTING_FAILURE = 'dealty/users/CREAT_LISTING_FAILURE'

const UPDATE_LISTING_REQUEST = 'dealty/users/UPDATE_LISTING_REQUEST'
const UPDATE_LISTING_SUCCESS = 'dealty/users/UPDATE_LISTING_SUCCESS'
const UPDATE_LISTING_FAILURE = 'dealty/users/UPDATE_LISTING_FAILURE'

const RETRIEVE_LISTING_REQUEST = 'dealty/users/RETRIEVE_LISTING_REQUEST'
const RETRIEVE_LISTING_FAILURE = 'dealty/users/RETRIEVE_LISTING_FAILURE'
const RETRIEVE_LISTING_SUCCESS = 'dealty/users/RETRIEVE_LISTING_SUCCESS'

// Initial State
const initialState = {
  links: null
}

//SELECTORS
export const selectLinks = state => state.links.links

// Reducer
export default (state = initialState, action) => {
  switch(action.type) {
    case CREAT_LISTING_SUCCESS:
      return {
        ...state,
        links: action.payload
      }
    case UPDATE_LISTING_SUCCESS:
      return {
        ...state,
        links: action.payload
      }
    case RETRIEVE_LISTING_SUCCESS:
      return {
        ...state,
        links: action.payload
      }

    default:
      return state
  }
}

// Action Creators
export const createSocialLinks = (socialMediaProfile) => ({
  [CALL_API]: {
    types: [CREAT_LISTING_REQUEST, CREAT_LISTING_SUCCESS, CREAT_LISTING_FAILURE],
    endpoint: 'social_media_profiles',
    method: HTTP_METHODS.POST,
    body: { socialMediaProfile },
  },
})

export const updateSocialLinks = (socialMediaProfile) => ({
  [CALL_API]: {
    types: [UPDATE_LISTING_REQUEST, UPDATE_LISTING_SUCCESS, UPDATE_LISTING_FAILURE],
    endpoint: `social_media_profiles/${socialMediaProfile.id}`,
    method: HTTP_METHODS.PUT,
    body: { socialMediaProfile },
  },
})

export const retrieveSocialLinks = id => ({
  [CALL_API]: {
    types: [RETRIEVE_LISTING_REQUEST, RETRIEVE_LISTING_SUCCESS, RETRIEVE_LISTING_FAILURE],
    endpoint: `social_media_profiles/${id}`,
    method: HTTP_METHODS.GET
  }
})

