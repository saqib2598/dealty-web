import React from 'react'
import HomeMap from '../../components/buyer/home/HomeMap'

class HomeMapContainer extends React.PureComponent {

    state = {
      selectedMarker: {},
      loading: true,
      onTiles: false
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

  render() {

    const {
      hoveredMarker,
      homes,
      sellerListings ,
      totalCount,
      lat,
      lng,
      filters,
      address1,
      onDragEnd,
      map,
      coords,
      handleMapMounted,
      onZoomChanged,
      bounds,
      setBound,
      coordinates,
      isFilter,
      retrieveHomesListings,
      toggleShowMap,
      showMap,
      handleHideBoundary,
      handleShowBoundary,
      toggleShowPolygon,
      showPolygon,
      showPOI,
      togglePOI,
    } = this.props
    return (
      <HomeMap
        sellerListings= {sellerListings && sellerListings}
        selectedMarker={this.state.selectedMarker}
        hoveredMarker={hoveredMarker}
        onClick={this.handleClick}
        onDragEnd={onDragEnd}
        onZoomChanged={onZoomChanged}
        onTilesLoaded={this.onTilesLoaded}
        map={map}
        coords={coords}
        onTiles={this.state.onTiles}
        handleMapMounted={handleMapMounted}
        onMapClick={this.handleMapClick}
        dealtyListings={sellerListings? homes : homes.dealtyListings }
        page={this.state.page}
        totalCount={totalCount}
        lat={lat}
        lng={lng}
        bounds={bounds}
        address1={address1}
        filters={filters}
        setBound={setBound}
        coordinates={coordinates}
        isFilter={isFilter}
        retrieveHomesListings={retrieveHomesListings}
        toggleShowMap={toggleShowMap}
        showMap={showMap}
        handleHideBoundary={handleHideBoundary}
        handleShowBoundary={handleShowBoundary}
        toggleShowPolygon={toggleShowPolygon}
        showPolygon={showPolygon}
        showPOI={showPOI}
        togglePOI={togglePOI}
      />
    )
  }
}

export default HomeMapContainer
