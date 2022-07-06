import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import { mapFinalFormErrors } from '../../lib/utils'
import { selectUser, retrieveUser } from '../../modules/users'
import { retrieveSavedSearches, selectSavedSearch, deleteSavedSearch } from '../../modules/savedSearches'
import { withRouter } from 'next/router'
import { isSignedIn as hasCredentials } from '../../lib/session'
import SavedSearchCard from '../../components/buyer/home/SavedSearchCard' 
import { Router } from '../../routes'
const mapErrors = mapFinalFormErrors('Failed to Change Saved Homes')
const mapDispatchToProps = { retrieveUser, retrieveSavedSearches, deleteSavedSearch }
import PropTypes from 'prop-types'

const mapStateToProps = state =>({
  isSignedIn: hasCredentials(state),
  user: selectUser(state),
  SavedHomes: selectSavedSearch(state)
})

class SavedHomesContainer extends Component {

  componentDidMount () {
    const { retrieveSavedSearches } = this.props
    retrieveSavedSearches()
  }

  onDeleteSavedHome = async (SavedHomeId) => { 
    const { deleteSavedSearch } = this.props
    try {
      await deleteSavedSearch(SavedHomeId)
    } catch (error) {
      return mapErrors(error)
    }
  }

  onViewMoreListings = (searchedItem) => {
    localStorage.setItem('savedItem' ,JSON.stringify(searchedItem))
    Router.push({pathname: `/buy/homes/${searchedItem.address}`})
  }

  render() {
    const { isSignedIn, SavedHomes } = this.props
    
    return (
      <Container className="pt-4 saved-homes">
        {(SavedHomes && SavedHomes.length <= 0) &&
          <div className="page-title">
            <b>Save your Search Criteria and It will appear here</b>
          </div>
        } 
        {SavedHomes && SavedHomes.length > 0 &&
          <div className= 'row'>
            {SavedHomes.map((search) =>
              <SavedSearchCard 
                key={search.id} 
                item={search} 
                isSignedIn={isSignedIn} 
                onDeleteSavedHome= {this.onDeleteSavedHome} 
                onViewMoreListings = {this.onViewMoreListings} 
              />
              )
            }
          </div>
        }
      </Container>
    )
  }
}

SavedHomesContainer.propTypes = {
  retrieveSavedSearches: PropTypes.func,
  deleteSavedSearch: PropTypes.func,
  isSignedIn: PropTypes.bool,
  SavedHomes: PropTypes.object
}

SavedHomesContainer = connect(mapStateToProps, mapDispatchToProps)(SavedHomesContainer)
export default withRouter(SavedHomesContainer)
