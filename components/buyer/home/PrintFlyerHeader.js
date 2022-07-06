import React from 'react'
import {
  Col,
  Row
} from 'reactstrap'
import PropTypes from 'prop-types'
import getConfig from 'next/config'

const PrintFlyerHeader = ({ address, city, state, zip, price, id }) => {
  const { publicRuntimeConfig } = getConfig()
  return (
    <React.Fragment>
      <a href={`${publicRuntimeConfig.primaryDomain}/buy/home/${id}`} style={{textDecoration:'none'}}>
        <Row className="printing-header">
          <Col className="col-md-5 printing-header__header-add">
            <h4>{address}</h4>
            <h4><p>{`${city}, ${state} ${zip}`}</p></h4>
          </Col>
          <Col className="col-md-3 printing-header__header-price">
            <span>${price ? price.toLocaleString() : 0}</span>
          </Col>
        </Row>
      </a>
    </React.Fragment>
  )
}

PrintFlyerHeader.propTypes = {
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zip: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  price: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
}

export default PrintFlyerHeader
