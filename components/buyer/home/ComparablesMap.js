import React from "react"
import { compose, withProps } from 'recompose'
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"
import { MAP_STYLES } from "../../../static/data/constants"
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel"
import { formatCurrency } from "../../../lib/utils";
import HomeCard from "./Home"

const ComparablesMap = compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `350px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withGoogleMap
)(props => {

  const bounds = new google.maps.LatLngBounds()
  const { home } = props
  let latLng = new google.maps.LatLng(home.latitude, home.longitude)
  bounds.extend(latLng)
  home.comparables && home.comparables.map(comparable => {
    latLng = new google.maps.LatLng(comparable.latitude, comparable.longitude)
    bounds.extend(latLng)
  })

  return (
    <div className='comparable-map'>
      <GoogleMap
        options={{
          styles: MAP_STYLES,
          fullscreenControl: false,
          scrollWheel: true,
          mapTypeControl: true,
          zoomControl: true,
          streetViewControl: false,
          minZoom: 3,
          maxZoom: 19
        }}
        onClick={props.onMapClick}
        ref={map => map && map.fitBounds(bounds)}
      >
        {props.home.comparables && props.home.comparables.map((comparable, index) => {
          const {latitude, longitude, bedrooms, bathrooms, sqft, address, soldPrice} = comparable

          return (
            <div key={index}>
              <Marker
                position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
                labelAnchor={new google.maps.Point(0, 0)}
                animation={2}
                onClick={() => props.onMarkerClick(comparable)}
              />
              { props.selectedMarker && props.selectedMarker.latitude === latitude && props.selectedMarker.longitude === longitude &&
                <InfoWindow position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }} options={{ maxWidth: 255 }}>
                  <div className="google_map_infobox">
                    <HomeCard
                      item={{ latitude: parseFloat(latitude),
                              longitude: parseFloat(longitude),
                              bedrooms: bedrooms,
                              bathrooms: bathrooms,
                              sqft: sqft,
                              address: address,
                              soldPrice: soldPrice}}
                      colClasses="non-dealty-home p-0"
                      cardClasses="home-card-infowindow"
                      isOtherHome={true}
                      height={{height: 100}}
                    />
                  </div>
                </InfoWindow>
              }
            </div>
          )
        })}
        <MarkerWithLabel
          opacity={0}
          position={{ lat: props.home.latitude, lng: props.home.longitude }}
          labelAnchor={new google.maps.Point(70, 39)}
          onClick={() => props.onMarkerClick(props.home)}
        >
          <div className={'dlabel'}>${formatCurrency(props.home.price)}</div>
        </MarkerWithLabel>
        {props.selectedMarker && props.selectedMarker.id === props.home.id &&
          <InfoWindow position={{ lat: props.selectedMarker.latitude, lng: props.selectedMarker.longitude }} options={{ maxWidth: 255 }}>
            <div className="google_map_infobox">
              <HomeCard item={props.home} colClasses="non-dealty-home p-0" cardClasses="home-card-infowindow" isOtherHome={true} height={{height: 100}}/>
            </div>
          </InfoWindow>
        }
      </GoogleMap>
    </div>
  )
})

export default ComparablesMap
