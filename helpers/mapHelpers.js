import React from 'react';

export const filterCoords = (listings, coords) => {
  const plucked = [];
  listings.forEach((listing) => {
    plucked.push(listing['id']);
  });
  return coords.filter((value) => !plucked.includes(value[0]));
};

export const reversedCoords = (coords) => {
  const reversedCoords = [];
  coords && coords.map((coord) => {
    !isNaN(Number(coord.lng)) &&
    !isNaN(Number(coord.lat)) &&
    reversedCoords.push({lat: Number(coord.lng), lng: Number(coord.lat)});
  });
  return reversedCoords;
};

export const mapStyles = () => {
  return (
    {
      loadingElement: <div style={{height: `100%`, width: `100%`}} />,
      containerElement: <div style={{height: `calc(100vh - 133px)`, position: 'relative', width: `100%`}} />,
      mapElement: <div style={{height: `100%`, width: `100%`}} />,
    }
  );
};

export const polygonCoords = (coords) => {
  const polygonArray = [];
  coords.map((coord) => {
    polygonArray.push(reversedCoords(coord));
  });
  return polygonArray;
};

