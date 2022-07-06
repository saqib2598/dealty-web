import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from "reactstrap";
import { Link } from '../../routes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ComparablesMap from '../buyer/home/ComparablesMap'
import { faCarAlt } from '@fortawesome/free-solid-svg-icons'

const homeComparablesMap = ({ home, handleMarkerClick,
  selectedMarker,
  handleMapClick, }) => {
  return <Row className="google-map">
    <Col md="12">
      <h5 className="property__compareables-estimates">Comparables and Estimates</h5>
    </Col>
    <Col className="d-none d-md-block">
      <Link route={'https://www.google.com/maps/search/?api=1&query=' + home.latitude + ',' + home.longitude}>
        <a target="_blank">
          <Button
            size="sm"
            className="direction-btn"
          >
            <FontAwesomeIcon
              icon={faCarAlt}
              className="direction-icon"
              style={{ cursor: 'pointer', height: '1.2em', width: '1.2em', color: 'black' }}
            />
            DIRECTIONS
        </Button>
        </a>
      </Link>
      <ComparablesMap
        home={home}
        selectedMarker={selectedMarker}
        onMarkerClick={handleMarkerClick}
        onMapClick={handleMapClick}
      />
    </Col>
  </Row>
}

homeComparablesMap.propTypes = {
  home: PropTypes.object.isRequired,
  handleMarkerClick: PropTypes.func.isRequired,
  selectedMarker: PropTypes.object,
  handleMapClick: PropTypes.func.isRequired,
}

export default homeComparablesMap
