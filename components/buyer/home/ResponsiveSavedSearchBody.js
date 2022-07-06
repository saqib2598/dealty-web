import React from 'react'
import {
  Col,
  Card,
  CardText,
  CardBody,
  CardSubtitle,
  Row,
  Button,
} from 'reactstrap'
import "../../../styles/carousel.min.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHome, faBath, faBed, faDollarSign, faCalendarTimes } from '@fortawesome/free-solid-svg-icons'
import ShortenText from '../../ShortenText'
import moment from 'moment'
import PropTypes from 'prop-types'

const ResponsiveSavedSearchBody = ({ item, onViewMoreListings, onDeleteSavedHome }) => {
  return (
    <Card className={`saved-search-card`}>
      <CardBody>
        <CardSubtitle className="saved-search-subtitle-header">
          <Row className="header-row">
            <Col>
              <FontAwesomeIcon
                icon={faSearch}
                className="saved-search-icon__search"
              />
            </Col>
            <h5 className="card-title-heading">
              {ShortenText(item.nickname, "12", "...")}
            </h5>
          </Row> 
        </CardSubtitle>
          <CardText>
            <Row className="card-sub-heading-row">
              <div>
                <FontAwesomeIcon
                  icon={faHome}
                  className="saved-search-icon__home"
                />
              </div>
              <Col className="col-md-10">
                <p className="saved-search-address">{item.address}</p>
              </Col>
            </Row>
            <hr />
            <Row className="card-text-row">
              {item.baths && 
                <Col className="col-md-6">
                  <Row>
                    <FontAwesomeIcon
                      icon={faBath}
                      className="saved-search-icon__details"
                    />
                    <p className="saved-search-info">{`${item.baths} Baths`}</p>
                  </Row>
                </Col>
              }
              {item.beds && 
                <Col className="col-md-6">
                  <Row>
                    <FontAwesomeIcon
                      icon={faBed}
                      className="saved-search-icon__details"
                    />
                    <p className="saved-search-info">{`${item.beds} Beds`}</p>
                  </Row>
                </Col>
              }
            </Row>
            <Row className="card-text-row">
              {item.maxPrice && 
                <Col className="col-md-6">
                  <Row>
                    <FontAwesomeIcon
                      icon={faDollarSign}
                      className="saved-search-icon__details"
                    />
                    <p className="saved-search-info">{`${item.minPrice} - ${item.maxPrice}`}</p>
                  </Row>
                </Col>
              }
              {item.propertyType && 
                <Col className="col-md-6">
                  <Row>
                    <FontAwesomeIcon
                      icon={faHome}
                      className="saved-search-icon__details"
                    />
                    <p className="saved-search-info">{`${item.propertyType}`}</p>
                  </Row>
                </Col>
              }
            </Row>
            <Row className="card-text-row">
              {(item.openDate || item.startDate)  && 
                <React.Fragment>
                  <div>
                    <FontAwesomeIcon
                      icon={faCalendarTimes}
                      className="saved-search-icon__details"
                    />
                  </div>
                  <Col className="col-md-9">
                    {item.openDate && 
                      <Row>
                        <p className="saved-search-info saved-search-card-dates">{`${moment(item.openDate).format('LLLL')}`}</p>
                      </Row>
                    }
                    {item.startDate &&
                      <Row>
                        <p className="saved-search-info saved-search-card-dates">{`${moment(item.startDate).format('LLLL')} `}</p>
                        <p className="saved-search-info saved-search-card-dates">{`${moment(item.endDate).format('LLLL')}`}</p>
                      </Row>    
                    }
                  </Col>
                </React.Fragment>
              }
            </Row>
          <hr />
        </CardText>
        <Row className="saved-search-button">
          <Col>
            <Button
              block
              size="lg"
              outline
              color="success"
              type="submit"
              onClick={()=>{onViewMoreListings(item)}}
              className="saved-search-button"
            >View new listings</Button>
          </Col>
          <Col>
            <Button
              block
              size="lg"
              outline
              color="danger"
              type="submit"
              onClick={()=>{onDeleteSavedHome(item.id)}}
            >Delete</Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

ResponsiveSavedSearchBody.propTypes = {
  item: PropTypes.object.isRequired,
  onViewMoreListings: PropTypes.func.isRequired,
  onDeleteSavedHome: PropTypes.func.isRequired,
}

export default ResponsiveSavedSearchBody