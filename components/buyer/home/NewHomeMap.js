import React from 'react';
import { compose, withProps } from 'recompose';
import { withGoogleMap, GoogleMap, InfoWindow, Polygon } from 'react-google-maps';

import HomeCard from '../../home/HomeCard';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { filterCoords, polygonCoords, mapStyles } from '../../../helpers/mapHelpers';
import ToggleMap from '../../ToggleMap';
import TogglePolygon from '../../home/TogglePolygon';
import TogglePOI from '../../home/TogglePOI';
import STYLE from '../../../constants/MapStyles';
import { HomeNewBadge } from './HomeNewBadge';

const NewHomeMap = compose(
  withProps(mapStyles),
  withGoogleMap,
)((props) => {
  const bounds = new google.maps.LatLngBounds();
  const coords = props.coords;
  const style = props.showPOI ? STYLE.empty : STYLE.data;
  const filteredCoords = filterCoords(props.dealtyListings, props.coordinates);
  const polygonArray = polygonCoords(coords);
  let setBound = false;

  if ((props.dealtyListings.length > 0 || coords && coords.length > 0) && props.setBound != false) {
    setBound = true;
  }
  if (setBound) {
    coords && coords.map((zipCoords) => {
      zipCoords.map((coord) => bounds.extend(new google.maps.LatLng(coord.lng, coord.lat)));
    });
    if (bounds.isEmpty()) {
      props.dealtyListings.map((home) => {
        const latLng = new google.maps.LatLng(home.latitude, home.longitude);
        bounds.extend(latLng);
      });
    }
  }

  return (
    <div className="new-home-map">
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
        defaultZoom={11}
        defaultCenter={{ lat: props.lat, lng: props.lng }}
        onClick={props.onClick}
        onDragEnd={props.onDragEnd}
        onZoomChanged={props.onZoomChanged}
        onTilesLoaded={props.onTilesLoaded}
        ref={(map) => map && ((props.handleMapMounted && props.handleMapMounted(map)) || true) && setBound && map.fitBounds(bounds)}
      >
        <TogglePolygon
          showPolygon={props.showPolygon}
          handlePolygon={props.handlePolygon}
        />
        <TogglePOI
          showPOI={props.showPOI}
          handlePOI={props.togglePOI}
        />
        {
          props.showPolygon && (
            <Polygon
              paths={polygonArray}
              options={{
                strokeColor: '#000000',
                strokeWeight: 1,
                strokeOpacity: 0,
                fillColor: 'teal',
                fillOpacity: 0.3,
              }}
            />
          )
        }
        <ToggleMap
          toggleShowMap={props.toggleShowMap}
          showMap={props.showMap}
        />

        {props.dealtyListings.map((home) => {
          return (
            <div key={`markers-${home.id}`}>
              <MarkerWithLabel
                opacity={0}
                position={{ lat: home.latitude, lng: home.longitude }}
                labelAnchor={new google.maps.Point(5, 15)}
                animation={2}
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
export default NewHomeMap;
