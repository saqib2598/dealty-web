import React from "react"
import PropTypes from 'prop-types'

const TogglePOI = ({
    showPOI,
    handlePOI,
}) => {
return (
      <button onClick={handlePOI} className="ShowPOIBtn">
        {showPOI ? 'Turn POI OFF' : 'Turn POI ON'}
      </button>
);
}

TogglePOI.propTypes = {
    handlePOI: PropTypes.func,
    showPOI: PropTypes.bool,
  }

export default TogglePOI
