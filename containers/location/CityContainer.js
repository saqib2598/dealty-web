import React from 'react'
import CityPageBanner from '../../components/location/CityPageBanner'
import CityPageContent from '../../components/location/CityPageContent'
import { retrieveCity } from '../../modules/location'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const mapDispatchToProps = { retrieveCity }

const mapStateToProps = (state) => ({
  city: state.location.city
})

class CityContainer extends React.Component {

  constructor(props){
    super(props)
    this.state = {
    isLoading : true
    }
  }

  async componentDidMount(){
    const { retrieveCity } = this.props
    await retrieveCity(this.props.location.state,this.props.location.city)
    this.setState({isLoading: false})
  }

  render(){
    return (
      <div className="location_page">
        <CityPageBanner city={this.props.city} />
        {!this.state.isLoading && <CityPageContent city={this.props.city}/>}
      </div>
    )
  }
}
CityContainer.propTypes = {
  city: PropTypes.object,
  location: PropTypes.object,
  retrieveCity: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CityContainer)
