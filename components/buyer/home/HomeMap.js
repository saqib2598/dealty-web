import React from "react"
import { compose, withProps } from 'recompose'
import { withGoogleMap, GoogleMap, InfoWindow, Polygon} from 'react-google-maps'
import { useState } from 'react'
import HomeCard from "./Home"
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel"
import { filterCoords, reversedCoords } from "../../../helpers/mapHelpers"
import ToggleMap from "../../ToggleMap";
import TogglePolygon from "../../home/TogglePolygon"
import TogglePOI from "../../home/TogglePOI"
import STYLE from '../../../constants/MapStyles'

const HomeMap = compose(
  withProps({
    loadingElement: <div style={{ height: `100%`, width: `93.5%` }} />,
    containerElement: <div style={{ height: `calc(100vh - 133px)`, position: 'relative', width: `93.5%` }} />,
    mapElement: <div style={{ height: `100%`, width: `93.5%` }} />,
  }),
  withGoogleMap
)(props => {
  const bounds = new google.maps.LatLngBounds()
  let setBound = false
  const coords = props.coords
  var style = null
  props?.showPOI ? style = STYLE.empty : style = STYLE.data

  if ((props.dealtyListings.length > 0 || coords && coords.length > 0) && props.setBound != false) {
    setBound = true
  }
  if(setBound) {
    coords && coords.map(coord => {
      const latLng = new google.maps.LatLng(coord.lng, coord.lat)
      bounds.extend(latLng);
    })
    if(bounds.isEmpty()){
      props.dealtyListings.map(home => {
        const latLng = new google.maps.LatLng(home.latitude, home.longitude)
        bounds.extend(latLng)
      })
    }
  }
  const filtered_coords = filterCoords(props.dealtyListings, props.coordinates)
  const polygon_coords = reversedCoords(coords)
  const [hover,setHover] = useState(false)
  const [homeId,sethomeId] = useState(0)

  const handlePolygon = () => {
    props.toggleShowPolygon()
    props.showPolygon ?
    props.handleHideBoundary()
    :
    props.handleShowBoundary()
  }

  const handlePOI = () => {
    props.togglePOI()
  }

  return (
    <div className="home-map">
      <GoogleMap
        options={{
          draggableCursor: "poniter",
          fullscreenControl: false,
          scrollWheel: true,
          zoomControl: true,
          mapTypeControl: true,
          streetViewControl: false,
          minZoom: 3,
          maxZoom: 19,
          styles: style
        }}
        defaultZoom={12}
        defaultCenter={{ lat: props.lat, lng: props.lng }}
        onClick={props.onClick}
        onDragEnd={props.onDragEnd}
        onZoomChanged={props.onZoomChanged}
        onTilesLoaded={props.onTilesLoaded}
        ref={map => map && ((props.handleMapMounted && props.handleMapMounted(map)) || true) && setBound && map.fitBounds(bounds)}
      >

          <TogglePolygon
            showPolygon={props.showPolygon}
            handlePolygon = {handlePolygon}
          />

          <TogglePOI
            showPOI={props.showPOI}
            handlePOI = {handlePOI}
          />

        {
          props.showPolygon&&(
          <Polygon
            paths={polygon_coords}
            options={{
              strokeColor: "#000000",
              strokeWeight:2,
              strokeOpacity: 1,
              fillOpacity: 0.0,
            }}
          />
          )
        }

        {props.sellerListings == undefined &&
          <ToggleMap
            toggleShowMap={props.toggleShowMap}
            mapHideRequest={true}
            showMap={props.showMap}
          />
        }

        {props.dealtyListings.map(home => {
          return (
            <div key={`markers-${home.id}`}>
              <MarkerWithLabel
                opacity={0}
                position={{ lat: home.latitude, lng: home.longitude }}
                labelAnchor={new google.maps.Point(8, 35)}
                animation={2}
                onClick={() => props.onClick(home)}
                onMouseOver={() => {
                  setHover(true)
                  sethomeId(home.id)
                }}
                onMouseOut={() => setHover(false)}
              >
                <div className={(((props.hoveredMarker && props.hoveredMarker.id === home.id) || (hover && (homeId===home.id)))) ? 'dlabel hover' : 'dlabel'}></div>
              </MarkerWithLabel>
              {props.selectedMarker.id === home.id &&
                <InfoWindow
                  position={{ lat: props.selectedMarker.latitude, lng: props.selectedMarker.longitude}}
                  options={{ maxWidth: 255 }}
                >
                  <div className="google_map_infobox">
                    <HomeCard item={home} colClasses="p-0" cardClasses="home-card-infowindow" />
                  </div>
                </InfoWindow>
              }
            </div>
          )
        })}
        {props.onTiles && filtered_coords.map(home => {
          return (
            <div key={`markers-${home[0]}`}>
              <MarkerWithLabel
                opacity={0}
                position={{ lat: parseFloat(home[1]), lng: parseFloat(home[2]) }}
                labelAnchor={new google.maps.Point(8, 35)}
                animation={2}
                zIndex={1}
              >
                <div className= 'plabel'></div>
              </MarkerWithLabel>
            </div>
          )
        })}
      </GoogleMap>
    </div>
  )
})
export default HomeMap
