import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { retrieveHomes, selectFeaturedHomes, toggleFavorite } from '../../modules/homes'
import Featured from '../../components/landing/featured'

const mapDispatchToProps = { retrieveHomes, toggleFavorite }

const mapStateToProps = (state) => ({
  featuredHomes: selectFeaturedHomes(state),
})

class FeatureListingsContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  handleToggleFavorite = (homeId) => {
    const { toggleFavorite } = this.props
    this.setState({ isLoading: true })
    toggleFavorite(homeId)
    this.setState({ isLoading: false })
  }

  async componentDidMount() {
    const { retrieveHomes } = this.props
    try {
      await retrieveHomes()
      this.setState({ isLoading: false })
    } catch (error) {
      this.setState({ isLoading: false })
    }
  }

  render() {
    const { featuredHomes } = this.props
    const { isLoading } = this.state
    return (
      isLoading ? <></> : <Featured homes={featuredHomes && featuredHomes.slice(0, 4)} onToggleFavorite={this.handleToggleFavorite} />
    )
  }
}

FeatureListingsContainer.propTypes = {
  retrieveHomes: PropTypes.func.isRequired,
  featuredHomes: PropTypes.array,
  toggleFavorite: PropTypes.func,

}

export default connect(mapStateToProps, mapDispatchToProps)(FeatureListingsContainer)
