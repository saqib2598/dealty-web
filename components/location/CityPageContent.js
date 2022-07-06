import React, { Fragment } from "react"
import { Container, Button, Col, Row } from 'reactstrap'
import { Router } from '../../routes'
import GoogleMapImage from '../GoogleMapImage'
import ReviewContainer from '../../containers/review/ReviewContainer'
import PropTypes from 'prop-types'
import DealtyServices from "../static/DealtyServices"

const CityPageContent = ({ city }) => {

  const handleSellPropertyClick = () => {
    Router.pushRoute('/seller/add-new-property')
  }

  const handleBuyPropertyListClick = () => {
    Router.push(`/buy`)
  }

  return (
    <Fragment>
      <div className="location_content">
        <Container>
          <Row className="postarea">
            <Col md={6}>
              <div className="text_area">
                <h2>{city.imageTitle}</h2>
                <p>{city.imageBody}</p>
                <ul className="list_btn_property">
                  <li>
                    <Button className="btn_property" onClick={handleSellPropertyClick}>SELL PROPERTY</Button>
                  </li>
                  <li>
                    <Button className="btn_property" onClick={handleBuyPropertyListClick}>BUY PROPERTY</Button>
                  </li>
                </ul>
              </div>
            </Col>
            <Col md={6}>
              <div className="image_holder">
                <img src={city.image} alt="Post image" />
              </div>
            </Col>
          </Row>
          <DealtyServices />
          <Row className="map_block">
            <Col md={6}>
              <div className="text_area">
                <h2>{city.mapTitle}</h2>
                <p>{city.mapBody}</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="image_holder">
                {(city.latitude && city.longitude) && <GoogleMapImage
                  lat={parseFloat(city.latitude)}
                  lng={parseFloat(city.longitude)}
                  zoom={13}
                  type={'terrain'}
                  location={true}
                />}
              </div>
            </Col>
          </Row>
        </Container>
        <ReviewContainer />
      </div>
    </Fragment>
  )
}

CityPageContent.propTypes = {
  city: PropTypes.object.isRequired
}

export default CityPageContent
