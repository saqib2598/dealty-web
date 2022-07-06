import Router from 'next/router'
import { createSelector } from 'reselect'
import { removeAuthHeaders, setAuthHeaders } from '../lib/session'
import { CALL_API, HTTP_METHODS } from '../middlewares/api'

// API Actions
const SIGN_UP_REQUEST                    = 'dealty/users/SIGN_UP_REQUEST'
const SIGN_UP_SUCCESS                    = 'dealty/users/SIGN_UP_SUCCESS'
const SIGN_UP_FAILURE                    = 'dealty/users/SIGN_UP_FAILURE'

const SIGN_IN_REQUEST                    = 'dealty/users/SIGN_IN_REQUEST'
const SIGN_IN_SUCCESS                    = 'dealty/users/SIGN_IN_SUCCESS'
const SIGN_IN_FAILURE                    = 'dealty/users/SIGN_IN_FAILURE'

const SIGN_OUT_REQUEST                   = 'dealty/users/SIGN_OUT_REQUEST'
const SIGN_OUT_SUCCESS                   = 'dealty/users/SIGN_OUT_SUCCESS'
const SIGN_OUT_FAILURE                   = 'dealty/users/SIGN_OUT_FAILURE'

const RETRIEVE_USER_REQUEST              = 'dealty/users/RETRIEVE_USER_REQUEST'
const RETRIEVE_USER_SUCCESS              = 'dealty/users/RETRIEVE_USER_SUCCESS'
const RETRIEVE_USER_FAILURE              = 'dealty/users/RETRIEVE_USER_FAILURE'

const GET_SPECIFIC_USER_REQUEST              = 'dealty/users/GET_SPECIFIC_USER_REQUEST'
const GET_SPECIFIC_USER_SUCCESS              = 'dealty/users/GET_SPECIFIC_USER_SUCCESS'
const GET_SPECIFIC_USER_FAILURE              = 'dealty/users/GET_SPECIFIC_USER_FAILURE'

const CHANGE_PASSWORD_REQUEST            = 'dealty/users/CHANGE_PASSWORD_REQUEST'
const CHANGE_PASSWORD_SUCCESS            = 'dealty/users/CHANGE_PASSWORD_SUCCESS'
const CHANGE_PASSWORD_FAILURE            = 'dealty/users/CHANGE_PASSWORD_FAILURE'

const RESET_PASSWORD_REQUEST             = 'dealty/users/RESET_PASSWORD_REQUEST'
const RESET_PASSWORD_SUCCESS             = 'dealty/users/RESET_PASSWORD_SUCCESS'
const RESET_PASSWORD_FAILURE             = 'dealty/users/RESET_PASSWORD_FAILURE'

const SEND_CONTACT_MESSAGE_REQUEST       = 'dealty/users/SEND_CONTACT_MESSAGE_REQUEST'
const SEND_CONTACT_MESSAGE_SUCCESS       = 'dealty/users/SEND_CONTACT_MESSAGE_SUCCESS'
const SEND_CONTACT_MESSAGE_FAILURE       = 'dealty/users/SEND_CONTACT_MESSAGE_FAILURE'

const UPDATE_PROFILE_REQUEST       = 'dealty/users/UPDATE_PROFILE_REQUEST'
const UPDATE_PROFILE_SUCCESS       = 'dealty/users/UPDATE_PROFILE_SUCCESS'
const UPDATE_PROFILE_FAILURE       = 'dealty/users/UPDATE_PROFILE_FAILURE'

const UPDATE_REGISTRATION_ADDRESS        = 'dealty/users/UPDATE_REGISTRATION_ADDRESS'

const ACCEPT_INVITATION_REQUEST = 'dealty/users/ACCEPT_INVITATION_REQUEST'
const ACCEPT_INVITATION_SUCCESS = 'dealty/users/ACCEPT_INVITATION_SUCCESS'
const ACCEPT_INVITATION_FAILURE = 'dealty/users/ACCEPT_INVITATION_FAILURE'

const CHECKOUT_REQUEST = 'dealty/users/CHECKOUT_REQUEST'
const CHECKOUT_SUCCESS = 'dealty/users/CHECKOUT_SUCCESS'
const CHECKOUT_FAILURE = 'dealty/users/CHECKOUT_FAILURE'


const UPDATE_SUBSCRIPTION_REQUEST = 'dealty/users/UPDATE_SUBSCRIPTION_REQUEST'
const UPDATE_SUBSCRIPTION_SUCCESS = 'dealty/users/UPDATE_SUBSCRIPTION_SUCCESS'
const UPDATE_SUBSCRIPTION_FAILURE = 'dealty/users/UPDATE_SUBSCRIPTION_FAILURE'

const UPDATE_CARD_REQUEST = 'dealty/users/UPDATE_CARD_REQUEST'
const UPDATE_CARD_SUCCESS = 'dealty/users/UPDATE_CARD_SUCCESS'
const UPDATE_CARD_FAILURE = 'dealty/users/UPDATE_CARD_FAILURE'

const TOGGLE_SELLER_FAVORITE_REQUEST = 'dealty/homes/TOGGLE_SELLER_FAVORITE_REQUEST'
const TOGGLE_SELLER_FAVORITE_SUCCESS = 'dealty/homes/TOGGLE_SELLER_FAVORITE_SUCCESS'
const TOGGLE_SELLER_FAVORITE_FAILURE = 'dealty/homes/TOGGLE_SELLER_FAVORITE_FAILURE'

const EMAIL_CONFIRMATION_REQUEST = 'dealty/users/EMAIL_CONFIRMATION_REQUEST'
const EMAIL_CONFIRMATION_SUCCESS = 'dealty/users/EMAIL_CONFIRMATION_SUCCESS'
const EMAIL_CONFIRMATION_FAILURE = 'dealty/users/EMAIL_CONFIRMATION_FAILURE'

const RETRIEVE_INVITED_USER_REQUEST = 'dealty/users/RETRIEVE_INVITED_USER_REQUEST'
const RETRIEVE_INVITED_USER_SUCCESS = 'dealty/users/RETRIEVE_INVITED_USER_SUCCESS'
const RETRIEVE_INVITED_USER_FAILURE = 'dealty/users/RETRIEVE_INVITED_USER_FAILURE'

const RETRIEVE_SPECIFIC_USER_REQUEST = 'dealty/users/RETRIEVE_SPECIFIC_USER_REQUEST'
const RETRIEVE_SPECIFIC_USER_SUCCESS = 'dealty/users/RETRIEVE_SPECIFIC_USER_SUCCESS'
const RETRIEVE_SPECIFIC_USER_FAILURE = 'dealty/users/RETRIEVE_SPECIFIC_USER_FAILURE'

const UPDATE_USER_TO_BUYER_REQUEST = 'dealty/users/UPDATE_USER_TO_BUYER_REQUEST'
const UPDATE_USER_TO_BUYER_SUCCESS = 'dealty/users/UPDATE_USER_TO_BUYER_SUCCESS'
const UPDATE_USER_TO_BUYER_FAILURE = 'dealty/users/UPDATE_USER_TO_BUYER_FAILURE'

const UPDATE_USER_TO_SELLER_REQUEST = 'dealty/users/UPDATE_USER_TO_SELLER_REQUEST'
const UPDATE_USER_TO_SELLER_SUCCESS = 'dealty/users/UPDATE_USER_TO_SELLER_SUCCESS'
const UPDATE_USER_TO_SELLER_FAILURE = 'dealty/users/UPDATE_USER_TO_SELLER_FAILURE'

const GET_GUEST_USER_REQUEST = 'dealty/users/GET_GUEST_USER_REQUEST'
const GET_GUEST_USER_SUCCESS = 'dealty/users/GET_GUEST_USER_SUCCESS'
const GET_GUEST_USER_FAILURE = 'dealty/users/GET_GUEST_USER_FAILURE'

const UNSUBSCRIBE_EMAIL_REQUEST = 'dealty/users/UNSUBSCRIBE_EMAIL_REQUEST'
const UNSUBSCRIBE_EMAIL_SUCCESS = 'dealty/users/UNSUBSCRIBE_EMAILSUCCESS'
const UNSUBSCRIBE_EMAIL_FAILURE = 'dealty/users/UNSUBSCRIBE_EMAIL_FAILURE'

const REMOVE_CURRENT_USER_LISTING_SUCCESS = 'dealty/users/REMOVE_CURRENT_USER_LISTING_SUCCESS'

export const USER_HOME_PATH = 'dashboard/index'

export { SIGN_OUT_SUCCESS }

// Initial State
const initialState = {
  me: {},
  user: {},
  invitedUser: {},
  registrationAddress: {},
  filteredUsers: {},
  unsubUser: {}
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_REGISTRATION_ADDRESS:
      return {
        ...state,
        registrationAddress: action.payload,
      }
    case SIGN_UP_FAILURE:
      return {
        ...state,
        registrationAddress: {},
      }
    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        me: action.payload.user,
      }
    case GET_GUEST_USER_SUCCESS:
      return {
        ...state,
        user: action.payload
      }
    case RETRIEVE_USER_SUCCESS:
      return {
        ...state,
        me: action.payload,
      }
    case RETRIEVE_INVITED_USER_SUCCESS:
      return {
        ...state,
        invitedUser: action.payload,
      }
    case GET_SPECIFIC_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      }
    case CHECKOUT_SUCCESS:
      return {
        ...state,
        me: action.payload
      }
    case UPDATE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        me: action.payload
      }

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        me: action.payload.user
      }

    case UPDATE_CARD_SUCCESS:
      return {
        ...state,
        me: action.payload.user
      }
    case TOGGLE_SELLER_FAVORITE_SUCCESS:
      let user = {...state.user}
      let listings = user.seller.listings
      let keyListingIndex = listings.findIndex((listing)=> listing.id == action.payload.id)
      let listing = listings[keyListingIndex]
      if (keyListingIndex !== -1){
        listing.favorite = action.payload.favorite
        listings[keyListingIndex] = listing
        user.seller.listings = listings
      }

      return {
        ...state,
        user: user
      }
    case RETRIEVE_SPECIFIC_USER_SUCCESS:
      return {
        ...state,
        filteredUsers: action.payload
      }
    case REMOVE_CURRENT_USER_LISTING_SUCCESS:
      {
        let currentUser = {...state.me}
        let userListings = currentUser.seller.listings
        let result = userListings.filter(listing => listing.id !== action.payload)
        currentUser.seller.listings = result
          return {
            ...state,
            me: currentUser
          }
      }
    case UNSUBSCRIBE_EMAIL_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        unsubUser: action.payload
      }
    default:
      return state
  }
}

// Selectors
export const selectUser = state => state.users.me
export const selectInvitedUser = state => state.users.invitedUser
export const selectSeller = state => state.users.user
export const selectRegistrationAddress = state => state.users.registrationAddress
export const selectFavoriteListings = state => state.users.favoriteListings
export const guestUser = state => state.users.user
export const unsubUser = state => state.users.unsubUser

export const selectIsSignedIn = createSelector(
  selectUser,
  user => typeof user.id === 'number',
)

// Action Creators

export const signUp = (user) => (dispatch) => {
  const signUpAction = {
    [CALL_API]: {
      types: [SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE],
      endpoint: 'users',
      method: HTTP_METHODS.POST,
      body: {
        user: user,
      },
    },
  }

  return dispatch(signUpAction)
    .then((response) => {
      setAuthHeaders(response.user.email, response.authToken)
        return response
    })
}

export const updateRegistrationAddress = (address, address2) => ({
  type: UPDATE_REGISTRATION_ADDRESS,
  payload: { address, address2 },
})

export const signIn = (user) => (dispatch) => {
  const signInAction = {
    [CALL_API]: {
      types: [SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE],
      endpoint: 'users/sign_in',
      method: HTTP_METHODS.POST,
      body: { user },
    },
  }

  return dispatch(signInAction)
    .then((response) => {
      setAuthHeaders(response.user.email, response.authToken)
        return response
    })
}

export const signOut = () => (dispatch) => {
  const signOutAction = {
    [CALL_API]: {
      types: [SIGN_OUT_REQUEST, SIGN_OUT_SUCCESS, SIGN_OUT_FAILURE],
      endpoint: 'users/sign_out',
      method: HTTP_METHODS.DELETE,
    },
  }

  return dispatch(signOutAction)
    .then(() => {
      removeAuthHeaders()
      return Router.push('/')
    })
}

export const retrieveUser = () => ({
  [CALL_API]: {
    types: [RETRIEVE_USER_REQUEST, RETRIEVE_USER_SUCCESS, RETRIEVE_USER_FAILURE],
    endpoint: 'users/me',
  },
})
export const getSpecificUser = (sellerId,page) => (dispatch) => {
  const getSpecificUserAction = {
    [CALL_API]: {
      types: [GET_SPECIFIC_USER_REQUEST, GET_SPECIFIC_USER_SUCCESS, GET_SPECIFIC_USER_FAILURE],
      endpoint: `users/${sellerId}?page=${page}`,
    },
  }

  return dispatch(getSpecificUserAction)

}

export const updateProfile = (user, id) => (dispatch) => {
  const updateProfileAction = {
    [CALL_API]: {
      types: [UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE],
      endpoint: `users/${id}`,
      method: HTTP_METHODS.PUT,
      body: user
    },
  }
  return dispatch(updateProfileAction)
    .then((response) => {
      setAuthHeaders(response.user.email, response.authToken)
      return response
    })
}

export const updatePassword = (user) => ({
    [CALL_API]: {
      types: [CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE],
      endpoint: 'users',
      method: HTTP_METHODS.PUT,
      body: { user },
    },
})

export const resetPassword = (user) => ({
  [CALL_API]: {
    types: [RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE],
    endpoint: 'users/password',
    method: HTTP_METHODS.POST,
    body: { user },
  },
})

export const changePassword = (user) => ({
  [CALL_API]: {
    types: [RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE],
    endpoint: 'users/password',
    method: HTTP_METHODS.PUT,
    body: { user },
  },
})

export const sendContactMessage = (values) => (dispatch) => {
  const sendContactMessageAction = {
    [CALL_API]: {
      types: [SEND_CONTACT_MESSAGE_REQUEST, SEND_CONTACT_MESSAGE_SUCCESS, SEND_CONTACT_MESSAGE_FAILURE],
      endpoint: 'contact_message',
      method: HTTP_METHODS.POST,
      body: {
        ...values,
      },
    },
  }

  return dispatch(sendContactMessageAction)

}

export const updateUser = (user) => ({
  [CALL_API]: {
    types: [UPDATE_USER_TO_BUYER_REQUEST, UPDATE_USER_TO_BUYER_SUCCESS, UPDATE_USER_TO_BUYER_FAILURE],
    endpoint: `lead_upgrade_to_buyer`,
    method: HTTP_METHODS.PUT,
    body: { user }
  },
})

export const updateSeller = (user) => ({
  [CALL_API]: {
    types: [UPDATE_USER_TO_SELLER_REQUEST, UPDATE_USER_TO_SELLER_SUCCESS, UPDATE_USER_TO_SELLER_FAILURE],
    endpoint: `upgrade_guest_seller`,
    method: HTTP_METHODS.PUT,
    body: { user }
  },
})

export const toggleSellerFavorite = (homeId) => ({
  [CALL_API]: {
    types: [TOGGLE_SELLER_FAVORITE_REQUEST, TOGGLE_SELLER_FAVORITE_SUCCESS, TOGGLE_SELLER_FAVORITE_FAILURE],
    endpoint: `listings/${homeId}/toggle_favorite`,
    method: HTTP_METHODS.PUT,
  },
})

export const acceptInvitation = (user) => (dispatch) => {
  const acceptInvitationAction = {
    [CALL_API]: {
      types: [ACCEPT_INVITATION_REQUEST, ACCEPT_INVITATION_SUCCESS, ACCEPT_INVITATION_FAILURE],
      endpoint: 'users/invitation',
      method: HTTP_METHODS.PUT,
      body: { user },
    },
  }

  return dispatch(acceptInvitationAction)

}

export const checkoutPayment = (charges) => ({
  [CALL_API]: {
    types: [CHECKOUT_REQUEST, CHECKOUT_SUCCESS, CHECKOUT_FAILURE],
    endpoint: `subscriptions`,
    method: HTTP_METHODS.POST,
    body: { charges }
  },
})

export const updateSubscription = (id) => ({
  [CALL_API]: {
    types: [UPDATE_SUBSCRIPTION_REQUEST, UPDATE_SUBSCRIPTION_SUCCESS, UPDATE_SUBSCRIPTION_FAILURE],
    endpoint: `subscriptions/${id}`,
    method: HTTP_METHODS.PUT,
  },
})

export const  updateCard = (charges, id) => ({
  [CALL_API]: {
    types: [UPDATE_CARD_REQUEST, UPDATE_CARD_SUCCESS, UPDATE_CARD_FAILURE],
    endpoint: `users/${id}`,
    method: HTTP_METHODS.PUT,
    body: { charges }
  },
})

export const emailConfirmation = (token) =>(dispatch) =>  {
  const emailConfirmationAction = {
    [CALL_API]: {
      types: [EMAIL_CONFIRMATION_REQUEST, EMAIL_CONFIRMATION_SUCCESS, EMAIL_CONFIRMATION_FAILURE],
      endpoint: `users/confirmation?confirmation_token=${token}`,
      method: HTTP_METHODS.GET
    }
  }

  return dispatch(emailConfirmationAction)
}

export const  retrieveInvitedUser = (invitation_token) => ({
  [CALL_API]: {
    types: [RETRIEVE_INVITED_USER_REQUEST, RETRIEVE_INVITED_USER_SUCCESS, RETRIEVE_INVITED_USER_FAILURE],
    endpoint: `users/retrieve_invited_user?invitation_token=${invitation_token}`,
    method: HTTP_METHODS.GET
  },
})

export const retrieveSpecificUsers = queryParams => ({
  [CALL_API]: {
    types: [RETRIEVE_SPECIFIC_USER_REQUEST, RETRIEVE_SPECIFIC_USER_SUCCESS, RETRIEVE_SPECIFIC_USER_FAILURE],
    endpoint: `users?${queryParams}`,
    method: HTTP_METHODS.GET
  }
})

export const removeCurrentUserListing = (id) => (dispatch) => {
  return dispatch({type: REMOVE_CURRENT_USER_LISTING_SUCCESS, payload: id})
}

export const getGuestUser = (id) => ({
  [CALL_API]: {
    types: [GET_GUEST_USER_REQUEST, GET_GUEST_USER_SUCCESS, GET_GUEST_USER_FAILURE],
    endpoint: `users/guest/${id}`,
    method: HTTP_METHODS.GET
  }
})

export const unsubscribeEmail = (id) => (dispatch) => {
  const unsubscribeEmailAction = {
    [CALL_API]: {
      types: [UNSUBSCRIBE_EMAIL_REQUEST, UNSUBSCRIBE_EMAIL_SUCCESS, UNSUBSCRIBE_EMAIL_FAILURE],
      endpoint: `unsubscribe?uid=${id}`,
      method: HTTP_METHODS.GET
    }
  }
  return dispatch(unsubscribeEmailAction)
}