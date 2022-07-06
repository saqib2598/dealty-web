import React from 'react'
import {
  Col,
  Row
} from 'reactstrap'
import { round } from 'lodash'
import ShortenText from '../../../components/ShortenText'

const PrintFlyerInfo = ({ beds, baths, sqft, yearBuilt, garage, pool, lotSize, HorseProperty, desc }) => {
  
  const convertFootToAcres = (Size) => {
    Size = Size * 0.000023
    let acres = round(Size,3)
    return acres
    
  }
  
  return (
    <React.Fragment>
      <Row className="flyer_info">
        <Col className="col-md-6 flyer_info__overview">
          {beds > 0 &&
            <Row>
              <Col className="col-md-6">Bedrooms</Col>
              <Col className="col-md-6">{beds}</Col>
            </Row>
          }
          {baths > 0 &&
            <Row>
              <Col className="col-md-6">Bathrooms</Col>
              <Col className="col-md-6">{baths}</Col>
            </Row>
          }
          {sqft > 0 &&
            <Row>
              <Col className="col-md-6">Approx sqft</Col>
              <Col className="col-md-6">{sqft}</Col>
            </Row>
          }
          <Row>
            <Col className="col-md-6">Year Built</Col>
            <Col className="col-md-6">{yearBuilt}</Col>
          </Row>
          {garage > 0 &&
            <Row>
              <Col className="col-md-6">Garage</Col>
              <Col className="col-md-6">{garage}</Col>
            </Row>
          }
          {pool == 'true' &&
            <Row>
              <Col className="col-md-6">Pool</Col>
              <Col className="col-md-6">Yes / Private</Col>
            </Row>
          }
        </Col>
        <Col className="col-md-6 flyer_info_overview">
          {lotSize > 0 &&
            <Row>
              <Col className="col-md-6">Lot Size</Col>
              <Col className="col-md-6">{lotSize} sqft/ {convertFootToAcres(lotSize)} acres</Col>
            </Row>
          }
          {HorseProperty == "true" &&
            <Row>
              <Col className="col-md-6">Horse Property</Col>
              <Col className="col-md-6">Yes</Col>
            </Row>
          }
        </Col>
      </Row>
      <Row className="flyer_info flyer_info__overview">
        <p>{ShortenText(desc, "500", "...(Visit the link to Get more info)")}</p>
      </Row>
    </React.Fragment>
  )
}

export default PrintFlyerInfo
