import React from 'react'
import NewHomeMap from '../../components/buyer/home/NewHomeMap'
import PropTypes from 'prop-types'
import { selectHomes, selectCoordinates } from '../../modules/homes'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  homes: selectHomes(state),
  coordinates: selectCoordinates(state) || []
})

class NewHomeMapContainer extends React.PureComponent {
  state = {
    selectedMarker: {},
    onTiles: false,
    mountRequest: true,
    showMap: true,
    showPolygon: true,
    showPOI: false,
    map: null,
    hover: false,
    homeId: 0,
  }

  handleClick = (marker) => {
    this.setState({ selectedMarker: marker })
  }

  handleMapClick = () => {
    this.setState({ selectedMarker: {} })
  }
  onTilesLoaded = () => {
    this.setState({onTiles: true})
  }

  onDragEnd = () => {
    const { showPolygon, map } = this.state
    showPolygon ? 
    this.props.handleEvents(map,showPolygon)
    :
    this.handleHideBoundary()
    this.props.handleSetBounds()
  }

  handleEvents = () => {
    const { map, mountRequest, showPolygon } = this.state
    const { mapListings, lat, lng, complete_address } = this.props
    let bounds = map.getBounds().toJSON()
    bounds=
      { south_west: [bounds.south, bounds.west],
        north_east: [bounds.north, bounds.east],
      },
    
    this.setState({bounds, zoom: map.getZoom(), isFilter: true})
    const apiProps = {latitude: lat, longitude: lng, filters: {}, page: 1, address: complete_address, bounds: null, showPolygon: showPolygon }
    !mountRequest ? mapListings(apiProps) : this.setState({ mountRequest: false })
  }

  onZoomChanged = () => {
    const { showPolygon, map } = this.state
    const { zoom } = this.props
    if(zoom != map.getZoom()) {
      this.props.handleZoom(map)
      !showPolygon?
      this.handleHideBoundary()
      :
      this.props.handleEvents(map,showPolygon)
      this.props.handleSetBounds()
    }  
  }

  handleMapMounted = (map) => {
    this.setState({map: map})
    return true
  }

  toggleShowPolygon = () => {
    this.setState({ showPolygon: !this.state.showPolygon })
  }

  handleHideBoundary = () => {  
    this.props.toggleLoading();
    const { lat, lng, mapListings, complete_address, filters, update_bounds } = this.props
    const { map, showPolygon } = this.state

    let bounds = map.getBounds().toJSON()
    bounds=
      { south_west: [bounds.south, bounds.west],
        north_east: [bounds.north, bounds.east],
      }
    update_bounds(false, bounds);
    const apiProps = {latitude: lat, longitude: lng, filters: filters, page: 1, address: complete_address, bounds: bounds }
    mapListings(apiProps).then(() => {
      this.props.toggleLoading();
    })
  }

  handleShowBoundary = () => {
    this.props.toggleLoading();
    const { lat, lng, mapListings, complete_address, filters, update_bounds } = this.props
    update_bounds(true, null);
    const apiProps = {latitude: lat, longitude: lng, filters: filters, page: 1, address: complete_address, bounds: null }
    mapListings(apiProps).then(() => {
      this.props.toggleLoading();
    }) 
  }


  togglePOI = () => {
    this.setState({showPOI: !this.state.showPOI})
  }

  handlePolygon = () => {
    const { showPolygon } = this.state
    this.toggleShowPolygon()
    showPolygon ?
    this.handleHideBoundary()
    :
    this.handleShowBoundary()
  }

  setHover = () => {
    this.setState({hover: !this.state.hover})
  }

  setHomeId = (id) => {
    this.setState({homeId: id})
  }

  render() {
    const { lat, lng, map, homes, setBound, showMap, toggleShowMap } = this.props
    const { bounds, showPOI, selectedMarker, showPolygon, hover, homeId } = this.state
    return (
      <NewHomeMap
        lat={lat}
        lng={lng}
        onClick={this.handleClick}
        onDragEnd={this.onDragEnd}
        onZoomChanged={this.onZoomChanged}
        map={map}
        showMap={showMap}
        setBound={setBound}
        showPolygon={showPolygon}
        bounds={bounds}
        showPOI={showPOI}
        coords={homes.coords}
        dealtyListings={homes.dealtyListings}
        coordinates={homes.coordinates}
        handleMapMounted={this.handleMapMounted}
        onTilesLoaded={this.onTilesLoaded}
        handlePolygon={this.handlePolygon}
        togglePOI={this.togglePOI}
        selectedMarker={selectedMarker}
        apiCall={this.apiCall}
        toggleShowMap={toggleShowMap}
        hover={hover}
        homeId={homeId}
        setHover={this.setHover}
        setHomeId={this.setHomeId}
      />
    )
  }
}

NewHomeMap.propTypes = {
  lat: PropTypes.string,
  lng: PropTypes.string,
  map: PropTypes.object
}

export default connect(mapStateToProps, null)(NewHomeMapContainer)
