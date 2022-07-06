import React from 'react'
import moment from 'moment'
import { capitalize } from 'lodash'
import { Row, Col } from 'reactstrap'
import PropTypes from 'prop-types'
import { propertyLabel } from '../../keyLabel'

const homeOverview = ({home}) => {
  return(
    <div className="property__overview-details">
      {home.land ?
        <>
          <Row>
            <Col sm="6">
              <p>
                {propertyLabel(home.propertyType)}
              </p>

            </Col>
            <Col sm="6" >
              <p>{home.sqft.toLocaleString()} sqft</p>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <p>{home.perSqft} / sqft</p>
            </Col>
          </Row>
          <Row>
            {home.parcelSize &&
              <Col sm="6">
                <p>Parcel Size: {home.parcelSize} sqft</p>
              </Col>
            }
          </Row>
          <Row>
            {home.zoningType &&
              <Col sm="6">
                <p>Zoning Type: {capitalize(home.zoningType)}</p>
              </Col>
            }
          </Row>
          <Row>
            <Col sm="6">
              { (home.daysOnDealty || home.daysOnDealty == 0) &&
                <p>{ home.daysOnDealty < 180 ? home.daysOnDealty : '180+' } days on Dealty</p>
              }
            </Col>
          </Row>
        </>
        :
        <>
          <Row>
            <Col sm="6">
              <p>
                {propertyLabel(home.propertyType)}
              </p>
            </Col>
            <Col sm="6" >
              <p>{home.sqft.toLocaleString()} sqft</p>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <p>{home.bedrooms} beds</p>
            </Col>
            <Col sm="6">
              <p>{home.lotSize.toLocaleString()} sqft lot size / {(home.lotSize/43560.0).toFixed(2).toLocaleString()} acres</p>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <p>{home.bathrooms} baths</p>
            </Col>
            <Col sm="6">
              <p>{home.perSqft} / sqft</p>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              {home.halfBaths > 0 && <p>{home.halfBaths} half bath{home.halfBaths > 1 && 's'}</p>}
            </Col>
            <Col sm="6">
              {home.yearBuilt && <p>Built in {home.yearBuilt}</p>}
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              { (home.daysOnDealty || home.daysOnDealty == 0) &&
                <p>{ home.daysOnDealty < 180 ? home.daysOnDealty : '180+' } days on Dealty</p>
              }
            </Col>
          </Row>
          {home.openHouseDates &&
            <Row>
              <Col sm="6">
                <h5>Open House Dates</h5>
              </Col>
            </Row>
          }
          <Row>
            <Col sm="6">
              {
                home.openHouseDates && home.openHouseDates.map((open_date) => {
                  return(
                    <p>{moment(open_date.openDate).format('MM/DD/YYYY')} {moment(open_date.startTime).format('h:mm a')} - {moment(open_date.endTime).format('h:mm a')}</p>
                  )
                })
              }
            </Col>
          </Row>
        </>
      }
    </div>
  )
}

homeOverview.propTypes = {
  home: PropTypes.object.isRequired
}

export default homeOverview
