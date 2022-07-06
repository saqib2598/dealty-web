import React from 'react';

const ToggleMap = ({toggleShowMap,showMap}) => {
  const onClick = () => {
    toggleShowMap();
  };
  return (
    <div className={showMap ? 'homeMapBtn' : 'homeMapBtn-no-map'}>
      <button onClick={ onClick} className="toggleBtn">
        {showMap ? 'Hide Map' : 'Show Map'}
      </button>
    </div>
  );
};

export default ToggleMap;

