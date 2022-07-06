import React from 'react'
import { connect } from 'react-redux'
import LoadingSM from '../../components/LoadingSM'
import { retrieveListing, selectListing } from '../../modules/listings'
import { Button } from 'reactstrap'
import { Link } from '../../routes'

const mapStateToProps = (state) => ({
  listing: selectListing(state)
})

const mapDispatchToProps = { retrieveListing }


class ListingPendingContainer extends React.Component {
  state = {
    loading: true,
  }

  async componentDidMount() {
    const { retrieveListing, propertyId } = this.props

    try{
      await retrieveListing(propertyId)
      this.setState({ loading: false })
    } catch (error) {
      this.setState({ loading: false })
      console.log(error)
    }
  }

  render() {
    const { listing } = this.props
    const { loading } =  this.state

    if (listing === null) return null

    if (loading) return <LoadingSM/>

    return (
      <div className="text-center">
        <img alt="Listing Icon" src='/static/images/your-listing-icon.svg' />
        <h4>{listing.address}</h4>
        <h4>Your Listing is Active</h4>
        <div className="price">${listing.price ? listing.price.toLocaleString() : 0}</div>
        <div className="buttons">
          <Link route={`/buy/home/${listing.id}`} passHref>
          <Button
            size="lg"
            color="primary"
            outline
            block
          >View Your Listing</Button>
          </Link>
          <Link route={`/seller/property/${listing.id}`} passHref>
            <Button
              block
              size="lg"
              color="primary"
            >Edit Listing</Button>
          </Link>
        </div>
        <style jsx>{`
          @import "styled-jsx-helper";

          .price{
            font-size: 50px;
            font-family: $headings-font-family;
            font-weight: 800;
          }
          h4{
            font-size:20px;
          }
          .buttons{
            padding-top: 40px;
            max-width: 380px;
            margin: 0 auto;
          }
          @include media-breakpoint-up(md) {
            .buttons{
              padding-top: 70px;
             }
             .price{
              font-size: 80px;
            }
          }

      `}</style>
      </div>
    )
  }
}

ListingPendingContainer = connect(mapStateToProps, mapDispatchToProps)(ListingPendingContainer)

export default ListingPendingContainer