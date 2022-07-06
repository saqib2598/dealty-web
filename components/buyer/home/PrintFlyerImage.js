import React from 'react'
import {
  Col,
  Row
} from 'reactstrap'
import PropTypes from 'prop-types'
import getConfig from 'next/config'

const PrintFlyerImage = ({ images, id }) => {
  const { publicRuntimeConfig } = getConfig()
  return (
    <React.Fragment>
      <Row className="flyer-images">
        <Col className={images.length <= 2 ? "col-md-12" : "col-md-8"}>
          <img className="flyer-images__flyer-cover" src={images[0]} alt="Flyer cover" />
        </Col>
        {images.length > 2 &&
          <React.Fragment>
            <Col className="col-md-4">
              <Row><img className="flyer-images__flyer-secondary" src={images[1]} alt="Flyer Image" /></Row>
              <Row><img className="flyer-images__flyer-secondary" style={{'margin-top':'20px'}} src={images[2]} alt="Flyer Image" /></Row>
            </Col>
          </React.Fragment>
        }
      </Row>
      <a href={`${publicRuntimeConfig.primaryDomain}/buy/home/${id}`} style={{textDecoration:'none'}}>
        <Row className="printing-header">
          <Col className="col-md-5 flyer-images__flyer-info">FOR MORE PHOTOS VISIT</Col>
          <Col className="col-md-6 flyer-images__flyer-info">{`${publicRuntimeConfig.primaryDomain}/buy/home/${id}`}</Col>
        </Row>
      </a>
    </React.Fragment>
  )
}

PrintFlyerImage.propTypes = {
  images: PropTypes.array,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

export default PrintFlyerImage
