import React from 'react'
import { connect } from 'react-redux'
import { Container, Alert } from 'reactstrap'
import { mapFinalFormErrors } from '../../lib/utils'
import HomeCard from '../../components/home/HomeCard'
import { selectUser, retrieveUser } from '../../modules/users'
import { retrieveListing, retrieveFavoriteListings, selectFavoriteListings, deleteFavoriteListings  } from '../../modules/listings'
import { withRouter } from 'next/router'
import Pagination from '../../components/Pagination'
import { isSignedIn as hasCredentials } from '../../lib/session'
import { favoritePaginationContainer } from '../../components/styles/HomeMapStyles'

const mapErrors = mapFinalFormErrors('Failed to un-favorite Listing')
const mapDispatchToProps = { retrieveUser, retrieveListing, retrieveFavoriteListings, deleteFavoriteListings }

const mapStateToProps = state =>({
  isSignedIn: hasCredentials(state),
  user: selectUser(state),
  favoriteListings: selectFavoriteListings(state)
})

class FavoriteContainer extends React.Component {

  onDeleteFavoriteListings = async (listingId) => {
    const { deleteFavoriteListings } = this.props
    try {
      await deleteFavoriteListings(listingId)
    } catch (error) {
      return mapErrors(error)
    }
  }


  componentDidMount() {
    const {  user, retrieveListing, retrieveFavoriteListings } = this.props
    retrieveFavoriteListings(1)

    if (user.seller && user.seller.listings) {
      if (user.seller.listings.length !== 0) {
        retrieveListing(user.seller.listings[0].id);
      }
    }
  }

  render() {
    const { favoriteListings, isSignedIn, router: { query: { message } } } = this.props
    const favListings = favoriteListings.favoriteListings
    const totalCount = favoriteListings.totalCount

    return (
        <Container className="pt-4">
          { (favListings && favListings.length <= 0) &&
            <div className="page-title">
              <b>Add properties to your favorites list and they will be saved here</b>
            </div>
          }

          {message && <Alert color="success" className="text-center">{message}</Alert>}
          {favListings && favListings.length > 0 &&
            <div>
              <div className="favorite-pagination">
                <Pagination
                  totalCount = {totalCount}
                  favoriteListings = {true}
                  style = { favoritePaginationContainer }
                  pageLimit = { 20 }
                />
              </div>
              <hr/>
              <div className= 'row'>
                {favListings.map((listing) =>
                  <HomeCard key={listing.id} item={listing}  onDeleteFavorite ={this.onDeleteFavoriteListings} favoriteListings={true} isSignedIn={isSignedIn}/>
                  )
                }
              </div>
            </div>
          }
          <style jsx>{`
          @import "styled-jsx-helper";
          .page-title{
            text-align: center;
          }
          .favorite-pagination{
            display: flex;
            justify-content: flex-end;
          }
          .add{
            border: solid 2px #e9e7e7;
            border-radius: 10px;
            width: 100%;
            color: $dark;
            cursor: pointer;
          }
          .add:hover,
          .add:focus{
            background: #fff;
            box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
            border: solid 2px #fff;
            text-decoration: none;
          }

        `}</style>
        </Container>
    )
  }
}

FavoriteContainer = connect(mapStateToProps, mapDispatchToProps)(FavoriteContainer)

export default withRouter(FavoriteContainer)
