import React, { useEffect } from 'react'
import Head from 'next/head'
import { Container, Row, Col } from 'reactstrap'
import { Link } from '../../routes'
import { retrieveBlog, selectBlog, selectRelatedBlogs } from '../../modules/blogs'
import { retrieveBlogCategories } from '../../modules/blogCategories'
import {
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";
import Layout from '../../components/Layout'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import getConfig from 'next/config'
import { requireEnvVar } from '../../lib/utils'
import SubscriptionContainer from '../../containers/subscriptions/SubscriptionContainer'

const mapStateToProps = state => ({
  blog: selectBlog(state),
  related_blogs: selectRelatedBlogs(state),
  blog_categories: state.blogCategories.blogCategories
})

const mapDispatchToProps = { retrieveBlog, retrieveBlogCategories }

const blog = props => {

  const { publicRuntimeConfig } = getConfig()
  const fbImgSrc = "../../static/images/facebookicon.svg"
  const twImgSrc = "../../static/images/twittericon.svg"
  const emailImgSrc = "../../static/images/email_icon.svg"

  useEffect(() => {
    const { retrieveBlog, retrieveBlogCategories } = props
    retrieveBlog(props.slug, props.preview)
    retrieveBlogCategories()
  }, [])
  const { data } = props
  let blogTitle
  let blogDesc
  let BlogImageUrl
  let url
  if (props.blog) {
    url = `${publicRuntimeConfig.primaryDomain}/blog/${props.blog.id}`
  }
  if (data) {
    blogTitle = data.blog.seo_title
    blogDesc = data.blog.seo_description
    BlogImageUrl = data.blog.cover_photo
  }

  const getAuthorImageUrl = (url) => {
    const { publicRuntimeConfig } = getConfig()
    let ImageUrl = url
    if (ImageUrl == undefined) {
      ImageUrl = `${publicRuntimeConfig.primaryDomain}/static/images/user_account_pic.png`
    }
    return ImageUrl
  }

  return (
    <Layout headerStyle="teal" bodyBg="light" footerStyle="white">
      {data &&
        <Head>
          <title>{blogTitle}</title>
          <meta name="title" content={blogTitle} />
          <meta name="description" content={blogDesc} />
          <meta name="keywords" content={blogTitle} />
          <meta property="og:title" content={blogTitle} />
          <meta property="og:image" content={BlogImageUrl} />
          <meta property="og:image:secure_url" content={BlogImageUrl} />
          <meta property="og:image:width" content="640" />
          <meta property="og:image:height" content="442" />
          <meta property="og:description" content={blogDesc} />
        </Head>
      }
      <Container>
        {props.blog &&
          <>
            <Row>
              <Col sm={12} xs={12}>
                <div className='sidebar d-none d-lg-block'>
                  <h1>Topics</h1>
                  <ul className='types-list'>
                    {props.blog_categories && props.blog_categories.map((category) => (
                      <li key={category.id}><Link route={`/blog?type=${category.id}`}><a>{category.name}</a></Link></li>
                    ))}
                  </ul>
                </div>
              </Col>
              <Col sm={12}>
                <div className='single-post'>
                  <div className='post-head'>
                    <h6>{props.blog.category}</h6>
                    <h1>{props.blog.title}</h1>
                    <p>{`${props.blog.published} I ${props.blog.readTime} read I ${props.blog.views} Views`}</p>
                    <strong className='author d-none d-lg-block'>{props.blog.authorName}</strong>

                  </div>
                  <div className='post-image'>
                    <img src={props.blog.coverPhoto} alt="Directory Image"/>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className='socialnetwork-block'>
              <Col sm={1} className='d-m-none '>
                <ul className='social-icons'>
                  <li>
                    <FacebookShareButton url={url}>
                      <em><img src={fbImgSrc} alt="FB Logo" /></em>
                    </FacebookShareButton>
                  </li>
                  <li>
                    <TwitterShareButton url={url}>
                      <em><img src={twImgSrc} alt="Twitter Logo" /></em>
                    </TwitterShareButton>
                  </li>
                  <li>
                    <a href={`mailto:?subject=${props.blog.title}&body=${publicRuntimeConfig.primaryDomain}/blog/${props.blog.id}`} target='_blank' rel='noopener noreferrer'>
                      <em><img src={emailImgSrc} alt="Email Logo"/></em>
                    </a>
                  </li>
                </ul>
              </Col>
              <Col sm={11}>
                <div dangerouslySetInnerHTML={{ __html: props.blog.description }} />
              </Col>
            </Row>
            <div className='save-purchasing-block'>
              <div className='save-caption'>
                <Row className="small-post-detail">
                  <Col sm={1} xs={2} className="p-right-6">
                    <div className='image-frame'>
                      <img src={getAuthorImageUrl(props.blog.authorImage)} alt="Author Image"/>
                    </div>
                  </Col>
                  <Col sm={11} xs={10} className="p-left-6">
                    <div className='post-content post-content-left'>
                      <div className='authorname'>
                        {props.blog.authorName}
                      </div>
                      <p> Contributer</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </>
        }
        {props.related_blogs && props.related_blogs.length > 0 &&
          <Row className='latestnews-block'>
            <Col sm={12}>
              <h1> Related Blogs </h1>
              {props.related_blogs.map((blog) => (
                <Row className='news-row' key={blog.id}>
                  <Col lg={7} sm={12} xs={12} className='p-mob-0'>
                    <div className='allpost-block'>
                      <ul className='allpost-list'>
                        <li>
                          <Row>
                            <Col sm={4} xs={4} className="p-right-6">
                              <div className='image-frame-d'>
                                <img src={blog.thumb} alt="Blog Thumb"/>
                              </div>
                            </Col>
                            <Col sm={8} xs={8} className="p-left-6">
                              <div className='post-content'>
                                <a href={`/blog/${blog.id}`} target="_blank" rel="noopener noreferrer">
                                  <strong>{blog.title}</strong>
                                </a>
                                <em className='abc'>{blog.published} I {blog.readTime} read</em>
                                <Row className="small-post-detail">
                                  <Col sm={2} xs={2} className="p-right-6 d-none d-lg-block">
                                    <div className='detail-image-frame d-none d-lg-block'>
                                      <img src={getAuthorImageUrl(blog.authorImage)} alt="Author Image"/>
                                    </div>
                                  </Col>
                                  <Col sm={10} xs={10} className="p-left-6 m-hide">
                                    <div className='post-content'>
                                      <div className='authorname'>
                                        {blog.authorName}
                                      </div>
                                      <p className='d-none d-lg-block'> Contributer</p>
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
                  <Col sm={5} xs={12} className='d-none d-lg-block'>
                    <div className='text-block d-none d-lg-block'>
                      <p>{blog.openingParagraph}</p>
                    </div>
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
        }
        <SubscriptionContainer />
      </Container>
    </Layout>
  )
}

blog.getInitialProps = async ({ query }) => {
  let data = null
  try {
    const apiUrl = requireEnvVar('API_SERVER')
    const res = await fetch(`${apiUrl}/api/v1/blogs/${query.slug}?preview=true`)
    data = await res.json()
  } catch {
    data = null
  }
  let props = {
    slug: query.slug,
    data: data,
    preview: query.preview
  }
  return props
}

blog.propTypes = {
  retrieveBlog: PropTypes.func.isRequired,
  blog: PropTypes.object,
  related_blogs: PropTypes.array,
  retrieveBlogCategories: PropTypes.func.isRequired,
  blog_categories: PropTypes.array,
  slug: PropTypes.string.isRequired,
  data: PropTypes.object,
  preview: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.undefined
  ])
}

export default connect(mapStateToProps, mapDispatchToProps)(blog);
