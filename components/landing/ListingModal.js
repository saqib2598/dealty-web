import React from 'react'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import { searchedSingleListing } from '../../modules/listings'
import { Link } from '../../routes'
import PropTypes from 'prop-types'

const mapStateToProps = (state) => ({
  searchedSingleListings: searchedSingleListing(state)
})

const ListingModal = (props) => {
    const { searchedSingleListings, searched } = props
    return (
      <Container>
        <h3 className="modalHeading">Search Results for <span className="modalSpan"> &quot;{searched}&quot; </span></h3>
        {searchedSingleListings && searchedSingleListings.listings.map((list) => {
          return (
            <>
              <Link to={`/buy/home/${list.friendlyId}`}>
                <div>
                  <img className="modalImg" src="../../static/images/house-search-icon.png" />
                  <div className="contentContainer">
                    <a className="modalAnchor">
                      <h5 key={list.friendlyId}>{list.address}</h5>
                      <p>{list.city}, {list.state}</p>
                    </a>
                  </div>
                </div>
              </Link>
            </>
          )
        })}
        {
        searchedSingleListings === null || (searchedSingleListings &&
        searchedSingleListings.listings.length === 0) &&
        <h5>No Results Found</h5>
        }
        <h6>Can&apos;t find what you are searching? Your search might be outside our 
          <Link to={'/location'}>
            <a> service areas.</a>
          </Link>
        </h6>
      </Container>
    )
}

ListingModal.propTypes = {
  searchedSingleListings: PropTypes.object,
  searched: PropTypes.string
}

export default connect(mapStateToProps, null)(ListingModal)
