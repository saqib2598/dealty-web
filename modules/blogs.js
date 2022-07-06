import { CALL_API, HTTP_METHODS } from '../middlewares/api'
import blog from '../constants/blog'

const SUBSCRIBE_BLOG_REQUEST =  'dealty/blogs/SUBSCRIBE_BLOG_REQUEST'
const SUBSCRIBE_BLOG_SUCCESS =  'dealty/blogs/SUBSCRIBE_BLOG_SUCCESS'
const SUBSCRIBE_BLOG_FAILURE =  'dealty/blogs/SUBSCRIBE_BLOG_FAILURE'

const UNSUBSCRIBE_BLOG_REQUEST =  'dealty/blogs/UNSUBSCRIBE_BLOG_REQUEST'
const UNSUBSCRIBE_BLOG_SUCCESS =  'dealty/blogs/UNSUBSCRIBE_BLOG_SUCCESS'
const UNSUBSCRIBE_BLOG_FAILURE =  'dealty/blogs/UNSUBSCRIBE_BLOG_FAILURE'

// Initial State
const initialState = {
  blog: {},
  blogs: {},
  latestBlog : {},
  randomBlogs: {}
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case blog.actions.RETRIEVE_BLOG_SUCCESS:
      return {
        ...state,
        blog: action.payload
      }
    case blog.actions.RETRIEVE_BLOGS_SUCCESS:
      return {
        ...state,
        blogs: action.payload
      }
    case blog.actions.RETRIEVE_MOST_LATEST_BLOG_SUCCESS:
      return{
        ...state,
        latestBlog: action.payload
      }
    case blog.actions.RETRIEVE_RANDOM_BLOGS_SUCCESS:
      return{
        ...state,
        randomBlogs: action.payload
      }
    default:
      return state
  }
}

// selectors

export const selectBlog = state => state.blogs.blog.blog
export const selectRelatedBlogs = state => state.blogs.blog.relatedBlogs
export const selectLatestBlogs = state => state.blogs.blogs.latestBlogs
export const selectTotalCount = state => state.blogs.blogs.totalCount
export const selectRandomBlogs = state => state.blogs.randomBlogs.randomBlogs
export const selectMostLatestBlog = state => state.blogs.latestBlog.blog

// Action Creators
export const retrieveBlog = (slug, preview) => ({
  [CALL_API]: {
    types: [blog.actions.RETRIEVE_BLOG_REQUEST, blog.actions.RETRIEVE_BLOG_SUCCESS, blog.actions.RETRIEVE_BLOG_FAILURE],
    endpoint: `blogs/${slug}?preview=${preview}`,
  }
})

export const retrieveBlogs = (page) => ({
  [CALL_API]: {
    types: [blog.actions.RETRIEVE_BLOGS_REQUEST, blog.actions.RETRIEVE_BLOGS_SUCCESS, blog.actions.RETRIEVE_BLOGS_FAILURE],
    endpoint: `blogs?page=${page}`,
    method: HTTP_METHODS.GET
  },
})

export const retrieveMostLatestBlog = () => ({
  [CALL_API]: {
    types: [blog.actions.RETRIEVE_MOST_LATEST_BLOG_REQUEST, blog.actions.RETRIEVE_MOST_LATEST_BLOG_SUCCESS, blog.actions.RETRIEVE_MOST_LATEST_BLOG_FAILURE],
    endpoint: 'blogs/latest_blog',
    method: HTTP_METHODS.GET
  },
})

export const retrieveRandomBlogs = () => ({
  [CALL_API]: {
    types: [blog.actions.RETRIEVE_RANDOM_BLOGS_REQUEST, blog.actions.RETRIEVE_RANDOM_BLOGS_SUCCESS, blog.actions.RETRIEVE_RANDOM_BLOGS_FAILURE],
    endpoint: 'blogs/random_blogs',
    method: HTTP_METHODS.GET
  },
})
export const subscribeBlogs = (params) => ({
  [CALL_API]: {
    types: [SUBSCRIBE_BLOG_REQUEST, SUBSCRIBE_BLOG_SUCCESS, SUBSCRIBE_BLOG_FAILURE],
    endpoint: 'blog_subscriptions',
    method: HTTP_METHODS.POST,
    body: {
      subscription: params
    }
  },
})

export const unSubscribeBlogs = (token) => ({
  [CALL_API]: {
    types: [UNSUBSCRIBE_BLOG_REQUEST, UNSUBSCRIBE_BLOG_SUCCESS, UNSUBSCRIBE_BLOG_FAILURE],
    endpoint: `blog_subscriptions/${token}/unsubscribe`,
    method: HTTP_METHODS.GET
  },
})
