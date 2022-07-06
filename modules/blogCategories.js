import { CALL_API, HTTP_METHODS } from '../middlewares/api'

// API Actions
const RETRIEVE_BLOG_CATEGORIES_REQUEST = 'dealty/blogs/RETRIEVE_BLOG_CATEGORIES_REQUEST'
const RETRIEVE_BLOG_CATEGORIES_SUCCESS = 'dealty/blogs/RETRIEVE_BLOG_CATEGORIES_SUCCESS'
const RETRIEVE_BLOG_CATEGORIES_FAILURE = 'dealty/blogs/RETRIEVE_BLOG_CATEGORIES_FAILURE'

const RETRIEVE_CATEGORY_BLOGS_REQUEST = 'dealty/blogs/RETRIEVE_CATEGORY_BLOGS_REQUEST'
const RETRIEVE_CATEGORY_BLOGS_SUCCESS = 'dealty/blogs/RETRIEVE_CATEGORY_BLOGS_SUCCESS'
const RETRIEVE_CATEGORY_BLOGS_FAILURE = 'dealty/blogs/RETRIEVE_CATEGORY_BLOGS_FAILURE'

// Initial State
const initialState = {
  blogCategories: [],
  categoryBlogs: []
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_BLOG_CATEGORIES_SUCCESS:
      return {
        ...state,
        blogCategories: action.payload
      }
    case RETRIEVE_CATEGORY_BLOGS_SUCCESS:
      return {
        ...state,
        categoryBlogs: action.payload
      }

    default:
      return state
  }
}

// Action Creators
export const retrieveBlogCategories = () => ({
  [CALL_API]: {
    types: [RETRIEVE_BLOG_CATEGORIES_REQUEST, RETRIEVE_BLOG_CATEGORIES_SUCCESS, RETRIEVE_BLOG_CATEGORIES_FAILURE],
    endpoint: 'blog_categories',
    method: HTTP_METHODS.GET
  },
})

export const retrieveCategoryBlogs = (id) => ({
  [CALL_API]: {
    types: [RETRIEVE_CATEGORY_BLOGS_REQUEST, RETRIEVE_CATEGORY_BLOGS_SUCCESS, RETRIEVE_CATEGORY_BLOGS_FAILURE],
    endpoint: `blog_categories/${id}`,
    method: HTTP_METHODS.GET
  },
})
