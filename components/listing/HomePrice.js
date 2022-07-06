import React from 'react'
import PropTypes from 'prop-types'

const homePrice = ({ home }) => {
  return (
    <h3 className='price'>
      <strong>$</strong>{" "}
      <span>{home.price ? home.price.toLocaleString() : "Rental"}</span>
    </h3>
  );
}

homePrice.propTypes = {
  home: PropTypes.object.isRequired,
}

export default homePrice
