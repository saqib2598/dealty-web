import { CALL_API, HTTP_METHODS } from '../middlewares/api'

const UPLOAD_LISTING_DOCUMENTS_REQUEST = 'dealty/documents/UPLOAD_LISTING_DOCUMENTS_REQUEST'
const UPLOAD_LISTING_DOCUMENTS_SUCCESS = 'dealty/documents/UPLOAD_LISTING_DOCUMENTS_SUCCESS'
const UPLOAD_LISTING_DOCUMENTS_FAILURE = 'dealty/documents/UPLOAD_LISTING_DOCUMENTS_FAILURE'

const RETRIEVE_LISTING_DOCUMENTS_REQUEST = 'dealty/documents/RETRIEVE_LISTING_DOCUMENTS_REQUEST'
const RETRIEVE_LISTING_DOCUMENTS_SUCCESS = 'dealty/documents/RETRIEVE_LISTING_DOCUMENTS_SUCCESS'
const RETRIEVE_LISTING_DOCUMENTS_FAILURE = 'dealty/documents/RETRIEVE_LISTING_DOCUMENTS_FAILURE'

const DELETE_LISTING_DOCUMENTS_REQUEST = 'dealty/documents/DELETE_LISTING_DOCUMENTS_REQUEST'
const DELETE_LISTING_DOCUMENTS_SUCCESS = 'dealty/documents/DELETE_LISTING_DOCUMENTS_SUCCESS'
const DELETE_LISTING_DOCUMENTS_FAILURE = 'dealty/documents/DELETE_LISTING_DOCUMENTS_FAILURE'


// Initial State
const initialState = {
  documents: null
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_LISTING_DOCUMENTS_SUCCESS:
      return {
        ...state,
        documents: [ ...state.documents, ...action.payload ]
      }
    case RETRIEVE_LISTING_DOCUMENTS_SUCCESS:
      return {
        ...state,
        documents: action.payload
      }
    case DELETE_LISTING_DOCUMENTS_SUCCESS:
      let documents = [...state.documents]
      let index = documents.findIndex((document) => document.id == action.payload.id)
      if (index !== -1) {
        documents.splice(index, 1);
      }
      return {
        ...state,
        documents: documents
      }

    default:
      return state
  }
}

export const selectDocuments = state => state.documents.documents

export const retrieveListingDocuments = (propertyId, type) => ({
  [CALL_API]: {
    types: [RETRIEVE_LISTING_DOCUMENTS_REQUEST, RETRIEVE_LISTING_DOCUMENTS_SUCCESS, RETRIEVE_LISTING_DOCUMENTS_FAILURE],
    endpoint: `listings/${propertyId}/documents?type=${type}`,
    method: HTTP_METHODS.GET,
  },
})

export const uploadListingDocuments = (values, listing, type) => ({
  [CALL_API]: {
    types: [UPLOAD_LISTING_DOCUMENTS_REQUEST, UPLOAD_LISTING_DOCUMENTS_SUCCESS, UPLOAD_LISTING_DOCUMENTS_FAILURE],
    endpoint: `listings/${listing.id}/documents`,
    method: HTTP_METHODS.POST,
    body: (values.set('document_type', type) || values)
  },
})

export const deleteListingDocuments = (documentId, listing, type) => ({
  [CALL_API]: {
    types: [DELETE_LISTING_DOCUMENTS_REQUEST, DELETE_LISTING_DOCUMENTS_SUCCESS, DELETE_LISTING_DOCUMENTS_FAILURE],
    endpoint: `listings/${listing.id}/documents/${documentId}`,
    method: HTTP_METHODS.DELETE,
  },
})