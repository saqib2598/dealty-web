import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Layout from '../../components/Layout'
import BlogsContainer from  '../../containers/blogs/blogs'
import { mapFinalFormErrors } from '../../lib/utils'
import {
    retrieveBlogs,
    selectLatestBlogs,
    selectRandomBlogs,
    selectMostLatestBlog,
    retrieveMostLatestBlog,
    retrieveRandomBlogs,
    selectTotalCount
  } from '../../modules/blogs'
import { retrieveBlogCategories } from '../../modules/blogCategories'
import { isSignedIn } from '../../lib/session'
import { CanonicalTag } from '../../components/SEO/CanonicalTag'

const mapDispatchToProps = { retrieveBlogs, retrieveBlogCategories, retrieveMostLatestBlog, retrieveRandomBlogs }

const mapStateToProps = (state) => ({
  latestBlogs: selectLatestBlogs(state),
  randomBlogs: selectRandomBlogs(state),
  blogCategories: state.blogCategories.blogCategories,
  mostLatestBlog: selectMostLatestBlog(state),
  totalCount: selectTotalCount(state)
});

const mapErrors = mapFinalFormErrors('Failed to upload photo')

class Blog extends React.Component {

  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    const { retrieveBlogs, retrieveBlogCategories, retrieveMostLatestBlog, retrieveRandomBlogs } = this.props
    try {
      retrieveBlogs(1)
      retrieveBlogCategories()
      retrieveMostLatestBlog()
      retrieveRandomBlogs()
    }
    catch(error){
      return mapErrors(error)
    }
  }

  render() {
    const { latestBlogs, randomBlogs, blogCategories, blogType, mostLatestBlog, totalCount } = this.props

    return (
      <Layout headerStyle="teal" bodyBg="light" footerStyle="white" isSignedIn={isSignedIn()}>
        <CanonicalTag title='Blogs | Dealty Homes' link='https://yourdealty.com/blog'/>
        {((latestBlogs && latestBlogs.length > 0) || (randomBlogs && randomBlogs.length > 0) && (blogCategories && blogCategories.length > 0)) &&
          <BlogsContainer
            latestBlogs = { latestBlogs }
            randomBlogs = { randomBlogs }
            mostLatestBlog = { mostLatestBlog }
            blogCategories = { blogCategories }
            blogType = { blogType }
            totalCount = { totalCount }
          />
        }

      </Layout>
    )
  }
}

Blog.propTypes = {
  retrieveBlogs: PropTypes.func.isRequired,
  retrieveBlogCategories: PropTypes.func.isRequired,
  retrieveMostLatestBlog: PropTypes.func.isRequired,
  retrieveRandomBlogs: PropTypes.func.isRequired,
  latestBlogs: PropTypes.array,
  randomBlogs: PropTypes.array,
  blogCategories: PropTypes.array,
  blogType: PropTypes.string,
  mostLatestBlog: PropTypes.object
}

Blog.getInitialProps = ({ query }) => {
  let props = { }
  if (query.type) {
    props = {
      blogType: query.type
    }
  }
  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
