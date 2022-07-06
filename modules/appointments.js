import { createSelector } from 'reselect'
import { CALL_API, HTTP_METHODS } from '../middlewares/api'

// API Actions
const CREATE_APPOINTMENT_REQUEST                    = 'dealty/users/CREATE_APPOINTMENT_REQUEST'
const CREATE_APPOINTMENT_SUCCESS                    = 'dealty/users/CREATE_APPOINTMENT_SUCCESS'
const CREATE_APPOINTMENT_FAILURE                    = 'dealty/users/CREATE_APPOINTMENT_FAILURE'

const UPDATE_APPOINTMENT_REQUEST                    = 'dealty/users/UPDATE_APPOINTMENT_REQUEST'
const UPDATE_APPOINTMENT_SUCCESS                    = 'dealty/users/UPDATE_APPOINTMENT_SUCCESS'
const UPDATE_APPOINTMENT_FAILURE                    = 'dealty/users/UPDATE_APPOINTMENT_FAILURE'

const RETRIEVE_APPOINTMENTS_REQUEST                   = 'dealty/users/RETRIEVE_APPOINTMENTS_REQUEST'
const RETRIEVE_APPOINTMENTS_SUCCESS                   = 'dealty/users/RETRIEVE_APPOINTMENTS_SUCCESS'
const RETRIEVE_APPOINTMENTS_FAILURE                   = 'dealty/users/RETRIEVE_APPOINTMENTS_FAILURE'

// Initial State
const initialState = {
  appointments: []
}


// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_APPOINTMENTS_SUCCESS:
    return{
      ...state,
      appointments: action.payload
    }

    case UPDATE_APPOINTMENT_SUCCESS:
      let appointments = [...state.appointments]
      appointments[state.appointments.findIndex((appointment) => appointment.id == action.payload.id)] = action.payload
      return {
        ...state,
        appointments: appointments
      }

    default:
      return state
  }
}

//SELECTORS

// Action Creators
export const createAppointment = (listing, appointment) => ({
  [CALL_API]: {
    types: [CREATE_APPOINTMENT_REQUEST, CREATE_APPOINTMENT_SUCCESS , CREATE_APPOINTMENT_FAILURE ],
    endpoint: `listings/${listing.id}/appointments`,
    method: HTTP_METHODS.POST,
    body: {
      appointment: appointment
    }
  },
})

export const updateAppointment = (id, appointment) => ({
  [CALL_API]: {
    types: [UPDATE_APPOINTMENT_REQUEST, UPDATE_APPOINTMENT_SUCCESS, UPDATE_APPOINTMENT_FAILURE],
    endpoint: `appointments/${id}`,
    method: HTTP_METHODS.PUT,
    body: {
      appointment: appointment
    }
  },
})

export const retrieveAppointments = (type) => ({
  [CALL_API]: {
    types: [RETRIEVE_APPOINTMENTS_REQUEST, RETRIEVE_APPOINTMENTS_SUCCESS, RETRIEVE_APPOINTMENTS_FAILURE],
    endpoint: `appointments?type=${type}`,
    method: HTTP_METHODS.GET
  },
})


