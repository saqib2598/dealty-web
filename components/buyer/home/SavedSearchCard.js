import React from 'react'
import MediaQuery from 'react-responsive'
import SavedSearchBody from './SavedSearchBody'
import ResponsiveSavedSearchBody from './ResponsiveSavedSearchBody'
import PropTypes from 'prop-types'

const SavedSearchCard = ({ sizes, onMouseEnter, onMouseLeave, colClasses, item, onDeleteSavedHome, onViewMoreListings }) => {
  
  return (
    <div {...sizes}
      onMouseEnter={onMouseEnter ? () => onMouseEnter(item) : undefined}
      onMouseLeave={onMouseLeave ? () => onMouseLeave() : undefined}
      className={colClasses}
    >
      <MediaQuery minWidth={768}>
        <div className={`saved-search-card`}>
          <SavedSearchBody 
            item={item}
            onDeleteSavedHome={onDeleteSavedHome}
            onViewMoreListings={onViewMoreListings}
          />
        </div>
      </MediaQuery>
      
      <MediaQuery maxWidth={767}>
        <ResponsiveSavedSearchBody 
          item={item}
          onDeleteSavedHome={onDeleteSavedHome}
          onViewMoreListings={onViewMoreListings}
        />
      </MediaQuery>   
    </div>
  )
}

SavedSearchCard.propTypes = {
  item: PropTypes.object.isRequired,
  onViewMoreListings: PropTypes.func.isRequired,
  onDeleteSavedHome: PropTypes.func.isRequired,
}

export default SavedSearchCard
