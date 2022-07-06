import React from 'react';
import { compose, withProps } from 'recompose';
import { withGoogleMap, GoogleMap, InfoWindow } from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';

import HomeCard from '../../components/home/HomeCard';
import { HomeNewBadge } from '../../components/buyer/home/HomeNewBadge';

export const SellerMap = compose(
  withProps({
    loadingElement: <div className='map-loading-element' />,
    containerElement: <div className='map-container-element' />,
    mapElement: <div className='map-element' />,
  }),
  withGoogleMap,
)((props) => {
  const style = null;
  const bounds = new google.maps.LatLngBounds();
  const getMapCenter = () => {
    const listing = props.sellerListings[0];
    return { lat: listing.latitude, lng: listing.longitude };
  };
  if (bounds.isEmpty()) {
    props.sellerListings.map((home) => {
      const latLng = new google.maps.LatLng(home.latitude, home.longitude);
      bounds.extend(latLng);
    });
  }

  return (
    <div className='seller-map'>
      <GoogleMap
        options={{
          draggableCursor: 'poniter',
          fullscreenControl: false,
          scrollWheel: true,
          zoomControl: true,
          mapTypeControl: true,
          streetViewControl: false,
          minZoom: 3,
          maxZoom: 19,
          styles: style,
        }}
        defaultZoom={12}
        defaultCenter={getMapCenter()}
        onClick={props.onClick}
      >
        {props.sellerListings.map((home) => {
          return (
            <div key={`markers-${home.id}`}>
              <MarkerWithLabel
                opacity={0}
                position={{ lat: home.latitude, lng: home.longitude }}
                labelAnchor={new google.maps.Point(0, 0)}
                onClick={() => props.onClick(home)}
                onMouseOver={() => {
                  props.setHover(true);
                  props.setHomeId(home.id);
                }}
                onMouseOut={() => {
                  props.setHover(false);
                  props.setHomeId(0);
                }}
              >
                <>
                  <HomeNewBadge createdAt={home.createdAt}/>
                  <div className={`dlabel ${props.hover && props.homeId === home.id ? 'dlabel-hover' : 'dlabel-no-hover'}`}/>
                </>
              </MarkerWithLabel>
              {props.selectedMarker.id === home.id &&
                <InfoWindow
                  position={{ lat: props.selectedMarker.latitude, lng: props.selectedMarker.longitude }}
                  options={{ maxWidth: 300 }}
                >
                  <div>
                    <HomeNewBadge createdAt={home.createdAt}/>
                    <div className='google_map_infobox'>
                      <HomeCard item={home} isMapItem={true} />
                    </div>
                  </div>
                </InfoWindow>
              }
            </div>
          );
        })}
      </GoogleMap>
    </div>
  );
});
