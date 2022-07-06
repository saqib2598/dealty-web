import React from 'react'
import PropTypes from 'prop-types'

const homeAddress = ({ home }) => {
  return <div className="address-holder">
    <img src="/static/images/featured/images/map_icon.svg" alt='Map Icon'/>
    <div className="address_info">
      <h5>{home.address}</h5>
      <p>{`${home.city}, ${home.state} ${home.zip}`}</p>
    </div>
  </div>
}

homeAddress.propTypes = {
  home: PropTypes.object.isRequired,
}

export default homeAddress
