import React from 'react'
import PropTypes from 'prop-types'

const homeStatus = ({ home }) => {
  return <h3 className="status"><span>{home.status.charAt(0).toUpperCase().concat(home.status.slice(1))}</span></h3>
}

homeStatus.propTypes = {
  home: PropTypes.object.isRequired,
}

export default homeStatus
