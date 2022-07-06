import React from 'react'
import LocationPageContent from '../../components/location/LocationPageContent'
import LocationPageBanner from '../../components/location/LocationPageBanner'
import { retrieveStates } from '../../modules/location'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const mapDispatchToProps = { retrieveStates }

const mapStateToProps = (state) => ({
  locationStates: state.location.locationStates
})

class LocationContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading : true
    }
  }
  
  async componentDidMount(){
    const { retrieveStates } = this.props
    await retrieveStates()
    this.setState({isLoading: false})
  }

  render(){
    return (
      <div className="location_page">
        <LocationPageBanner />
        {this.props.locationStates.length!=0 && <LocationPageContent states={this.props.locationStates} />}
      </div>  
    )
  }
}

LocationContainer.propTypes = {
  locationStates: PropTypes.array,
  retrieveStates: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationContainer)
