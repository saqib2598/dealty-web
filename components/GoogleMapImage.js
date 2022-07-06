import { compose, withProps } from 'recompose'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const GoogleMapImage = compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withGoogleMap
  )((props) => (
    <GoogleMap
      defaultZoom={props.zoom ? props.zoom : 19}
      defaultMapTypeId={props.type ? props.type : 'hybrid'}
      defaultTilt={0}
      defaultCenter={{
        lat: props.lat,
        lng: props.lng
      }}
    >
    <Marker position={{
      lat: props.lat,
      lng: props.lng
    }} />
  </GoogleMap>
))

export default GoogleMapImage