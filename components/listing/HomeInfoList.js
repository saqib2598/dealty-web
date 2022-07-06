import React, {Fragment} from "react";
import PropTypes from "prop-types";

const InfoItem = ({ label, value, iconPath }) => {
  return (
    <Fragment>
      {value && (
        <li>
          <img src={iconPath} alt="Icon" />
          {label === "Lot Size" ? (
            <span>{`${value} sqft lot size / ${(value / 43560.0).toFixed(2)} acres`}</span>
          ) : (
            <span>
              {value} {label}
            </span>
          )}
        </li>
      )}
    </Fragment>
  );
};

const homeInfoList = ({ home }) => {
  return (
    <ul className="property-info-list">
      {home.land || home.propertyType === "Land" ? (
        <>
          <InfoItem
            label="Lot Size"
            value={home.lotSize}
            iconPath="/static/images/propertydetail/h-fets-icon.svg"
          />
          <InfoItem
            label=""
            value={home.propertyType}
            iconPath="/static/images/propertydetail/single-icon.svg"
          />
        </>
      ) : (
        <>
          <InfoItem
            label="Beds"
            value={home.bedrooms}
            iconPath="/static/images/propertydetail/bed.svg"
          />
          <InfoItem
            label="Baths"
            value={home.bathrooms}
            iconPath="/static/images/propertydetail/baths.svg"
          />
          <InfoItem
            label="Sqft"
            value={home.sqft}
            iconPath="/static/images/propertydetail/h-fets-icon.svg"
          />
          <InfoItem
            label="Lot Size"
            value={home.lotSize}
            iconPath="/static/images/propertydetail/h-fets-icon.svg"
          />
          <InfoItem
            label=""
            value={home.propertyType}
            iconPath="/static/images/propertydetail/single-icon.svg"
          />
        </>
      )}
    </ul>
  );
};

homeInfoList.propTypes = {
  home: PropTypes.object.isRequired
};

export default homeInfoList;
