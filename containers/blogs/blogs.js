import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col} from 'reactstrap'
import PropTypes from 'prop-types'
import { retrieveCategoryBlogs } from '../../modules/blogCategories'
import getConfig from 'next/config'
import Pagination from '../../components/Pagination'
import SubscriptionContainer from '../subscriptions/SubscriptionContainer'
import { Adsense } from '../../components/Ads/Adsense'

const mapDispatchToProps = { retrieveCategoryBlogs }

const mapStateToProps = state => ({
  categoryBlogs: state.blogCategories.categoryBlogs
})

const Blogs = ({latestBlogs, randomBlogs, blogCategories, mostLatestBlog, totalCount, ...props}) => {
  const [activeCategory, setActiveCategory] = useState('')

  useEffect(()=>{
    if (props.blogType) {
      setActiveCategory(props.blogType)
      retrieveCatBlogs(props.blogType)
    }
  },[])

  const retrieveCatBlogs = (id) => {
    const { retrieveCategoryBlogs } = props
    retrieveCategoryBlogs(id)
  }

  const renderComponent = (id) => {
    setActiveCategory(id)
    retrieveCatBlogs(id)
  }

  const getAuthorImageUrl = ( url ) => {
    const { publicRuntimeConfig } = getConfig()
    let ImageUrl = url
    if (ImageUrl == undefined){
      ImageUrl = `${publicRuntimeConfig.primaryDomain}/static/images/user_account_pic.png`
    }
    return ImageUrl
 }

  const printBlogs = (blogs) => {
    return (
      blogs && blogs.map((blog) => (
        <li key={blog.id}>
          <Row>
            <Col sm={12} xs={12} className="p-left-6" style={{marginTop: '15px'}}>
              <div className='news-content'>
                <a href={`/blog/${blog.id}`} target="_blank" rel="noopener noreferrer">{ blog.title }</a>
                <div className='panel-area'>
                  <p>{blog.authorName}</p>
                </div>
              </div>
            </Col>
          </Row>
        </li>
      )
    ))
  }

  return (
    <Container>
      <Row>
        <Col sm={3} xs={12}>
          <div className='sidebar'>
            <h1>Topics</h1>
            <ul className='topics-list'>
              {blogCategories.length > 0 && blogCategories.map((category) => {
                return(
                  <li key={category.id}
                      onClick={() => renderComponent(category.id)}
                      className={activeCategory == category.id ? 'active' : null}>
                    {category.name}
                  </li>
                )
              })}
            </ul>
          </div>
        </Col>
        <Col sm={6} style={{marginTop: '15px'}}>
          <div className='postarea'>
          {mostLatestBlog &&
            <React.Fragment>
              <div className='post-head'>
                <h6>The Latest</h6>
                <a href={`/blog/${mostLatestBlog.id}`} target="_blank" rel="noopener noreferrer">
                  <h1>{mostLatestBlog.title}</h1>
                </a>
                <strong className='author'>{mostLatestBlog.authorName}</strong>
              </div>
              <div className='post-image'>
                <img src={mostLatestBlog.coverPhoto} alt="Cover Image"/>
              </div>
            </React.Fragment>
          }
          </div>
        </Col>
        <Col sm={3}>
          <ul className='news-heading-list'>
            {printBlogs( props.categoryBlogs && props.categoryBlogs.length > 1 ? props.categoryBlogs : randomBlogs)}
          </ul>
        </Col>
      </Row>
      <Row className='latestnews-block'>
        <Col sm={3}>
        </Col>
        <Col sm={9}>
          <Pagination
            totalCount = { totalCount }
            blogs = { true }
            pageLimit = { 5 }
            className = "blogs-container"
          />
          <h1 className='latest'>The Latest</h1>
          {latestBlogs && latestBlogs.length > 0 && latestBlogs.map((blog) => {
            return (
              <Row className='news-row' key={blog.id}>
                <Col lg={8} sm={12} xs={12} className='p-mob-0'>
                  <div className='allpost-block'>
                    <ul className='allpost-list'>
                      <li>
                        <Row>
                          <Col sm={4} xs={4} className="p-right-6">
                            <div className='image-frame'>
                              <img src={blog.coverPhoto} alt="Blog Image"/>
                            </div>
                          </Col>
                          <Col sm={8} xs={8} className="p-left-6">
                            <div className='post-content'>
                              <a href={`/blog/${blog.id}`} target="_blank" rel="noopener noreferrer">
                                <strong>{blog.title}</strong>
                              </a>
                              <em className='abc'>{blog.published} I {blog.readTime}</em>
                              <Row className="small-post">
                                <Col sm={3} xs={3} className="p-right-6">
                                  <div className='image-frame d-none d-lg-block'>
                                    <img src={getAuthorImageUrl(blog.authorImage)} alt="Author Image"/>
                                  </div>
                                </Col>
                                <Col sm={9} xs={9} className="p-left-6 m-hide">
                                  <div className='post-content'>
                                    {blog.authorName}
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Col>
                        </Row>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col sm={4} xs={12} className='d-none d-lg-block'>
                  <div className='text-block d-none d-lg-block'>
                    <p>{blog.openingParagraph}</p>
                  </div>
                </Col>
              </Row>
            )
          })}

        </Col>
      </Row>
      <SubscriptionContainer />
      <Adsense />
    </Container>
  )
}

Blogs.propTypes = {
  latestBlogs: PropTypes.array,
  randomBlogs: PropTypes.array,
  blogCategories: PropTypes.array,
  categoryBlogs: PropTypes.array,
  retrieveCategoryBlogs: PropTypes.func.isRequired,
  blogType: PropTypes.string,
  mostLatestBlog: PropTypes.object,
  totalCount: PropTypes.number
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);
