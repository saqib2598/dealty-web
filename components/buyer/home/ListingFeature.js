import React from 'react'
import CapitalizeText from '../../CapitalizeText'
import PropTypes from 'prop-types'
import { propertyLabel, horseFeatures } from '../../keyLabel'

const ListingFeature = ({home}) => {
  return(
    <div className="features-list">
      <div className="feature__title">LISTING INFORMATION</div>
      {home.land ?
        <>
          {home.sqft > 0 && <div className="feature__item">{home.sqft.toLocaleString()} Square Feet</div>}
        </>
        :
        <>
          {home.bedrooms > 0 && <div className="feature__item">{home.bedrooms} Bedrooms</div>}
          {home.bathrooms > 0 && <div className="feature__item">{home.bathrooms} Bathrooms</div>}
          {home.halfBaths > 0 && <div className="feature__item">{home.halfBaths} Half Bathroom{home.halfBaths > 1 && 's'}</div>}
          {home.parkingSpaces > 0 && <div className="feature__item">{home.parkingSpaces} <CapitalizeText text={home.parkingType || 'Garage'} /> Space{home.parkingSpaces > 1 && 's'}</div>}
          {home.propertyType && <div className="feature__item">{propertyLabel(home.propertyType)}</div>}
          {home.sqft > 0 && <div className="feature__item">{home.sqft.toLocaleString()} Square Feet</div>}
          {home.yearBuilt && <div className="feature__item">Built in {home.yearBuilt}</div>}
          {home.pool == "true" && <div className="feature__item">Private Pool</div>}
          {home.newAppliances == "true" && <div className="feature__item">New Appliances</div>}
          {home.flooringType && <div className="feature__item">Flooring Type ({home.flooringType})</div>}
          {home.horsePrivileges == 'true' && <div className="feature__item"> Horse Privileges - Yes </div>}
          {home.horsePrivileges == 'true' &&
            home.horseFeatures && home.horseFeatures.map((item, index) => {
              return <div className="feature__item" key={index}>{item != 'None' && horseFeatures(item)} {item == 'Stalls' && home.horseStalls}</div>
            })
          }
          {home.lotSize > 0 && <div className="feature__item">Lot Size: {(home.lotSize/43560.0).toFixed(2).toLocaleString()} acres / {home.lotSize.toLocaleString()} sqft</div>}
          {home.homeOwner == 'true' && <div className="feature__item">Homeowner&apos;s Association</div>}
          {home.homeOwner == 'true' && <div className="feature__item">Monthly Cost: ${home.monthlyCost} </div>}
        </>
      }

      <style jsx>{`
      @import "styled-jsx-helper";
      .features-list{
        margin-bottom: 1rem;
        .updated{
          font-size: 14px;
          color: $features-updates-color;
          font-weight: 200;
        }
      }
      .feature{
        &__title{
          color: $features-title-color;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 8px;
        }
        &__item{
          color: $grey-650;
          margin-bottom: 8px;
        }
      }
    `}</style>
    </div>
  )

}

ListingFeature.propTypes = {
  home: PropTypes.object.isRequired
}

export default ListingFeature
