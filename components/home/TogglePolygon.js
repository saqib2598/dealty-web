import React from "react"
import PropTypes from 'prop-types'

const TogglePolygon = ({
    showPolygon,
    handlePolygon,
}) => {
return (
      <button onClick={handlePolygon} className="ShowPolygonBtn">
        {showPolygon ? 'Hide Borders' : 'Show Borders'}
      </button>
);
}

TogglePolygon.propTypes = {
    handlePolygon: PropTypes.func,
    showPolygon: PropTypes.bool,
  }

export default TogglePolygon