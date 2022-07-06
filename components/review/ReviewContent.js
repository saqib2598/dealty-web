import React from "react"
import { Button, Col, Row } from 'reactstrap'
import PropTypes from 'prop-types'

const ReviewContent = ({ review }) => {
  return (
    <Row>
      <Col md={6}>
        <div className="blockqude_img_holder">
          <img src={review.image} alt="Post image" />
        </div>
      </Col>
      <Col md={6} className="p-l-0">
        <div className="text_area">
          <h4>{review.title}</h4>
          <div className="blockqude_inner">
            <p>{review.description}</p>
          </div>
        </div>
        <Button className="btn_reviews">READ MORE REVIEWS</Button>
      </Col>
    </Row>
  )
}

ReviewContent.propTypes = {
  review: PropTypes.object
}

export default ReviewContent
