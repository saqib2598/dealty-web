import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { paginationContainer, leftArrow, fontAwesomeLeftIcon, paginationText, rightArrow } from './styles/HomeMapStyles'
import { searchHomesList } from '../modules/homes'
import { getSpecificUser } from '../modules/users'
import { retrieveBlogs } from '../modules/blogs'
import { retrieveFavoriteListings  } from '../modules/listings'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const LeftIcon = <FontAwesomeIcon icon={faAngleLeft} style={ fontAwesomeLeftIcon }/>
const RightIcon = <FontAwesomeIcon icon={faAngleRight} />

const mapDispatchToProps = { getSpecificUser, retrieveFavoriteListings, searchHomesList, retrieveBlogs }
class Pagination extends React.Component {

  state={
    page: 1,
    loading: true,
    blogsLimitation: 5,
    listingLimitation: 21
  }

  getPaginatedItems (number) {
    const { page } = this.state;
    const { sellerListings, favoriteListings, blogs, retrieveHomesListings } = this.props
    this.setState({ page: page + number })
    if (sellerListings) {
      this.retrieveSellerListings(page + number)
    } else if (favoriteListings){
      this.retrieveFavoriteListings(page + number)
    } else if (blogs){
      this.retrieveLatestBlogs(page + number)
    } else {
      retrieveHomesListings(page + number)
    }
  }

  retrieveSellerListings = (page) => {
    this.props.getSpecificUser(this.props.sellerId, page)
    .then(() => this.setState({ loading: false }))
  }

  retrieveFavoriteListings = (page) => {
    this.props.retrieveFavoriteListings( page )
    .then(() => this.setState({ loading: false }))
  }

  retrieveLatestBlogs = (page) => {
    this.props.retrieveBlogs(page)
    .then(() => {
      this.setState({ loading: false })})
  }

  handleLeftButtonClick = _ => {
    const { page } = this.state;
    if (page > 0) {
      this.getPaginatedItems(-1)
    }
  }

  handleRightButtonClick = _ => {
    const { page } = this.state;
    const { totalCount } = this.props
    if (page < totalCount) {
      this.getPaginatedItems(1)
    }
  }

  verifiyPage = () => {
    const { page, blogsLimitation, listingLimitation } = this.state
    const { totalCount, blogs } = this.props

    if (blogs && totalCount < blogsLimitation && page > 1) {
      this.setState({page: 1})
    } else if (!blogs && totalCount < listingLimitation && page > 1){
      this.setState({page: 1})      
    }
  }

  render() {
    const { page } = this.state
    const { sellerListings, totalCount, style, pageLimit, blogs, homeMap, listingPagination } = this.props
    this.verifiyPage()

    return(
      <div style={ style || paginationContainer }
        className={ sellerListings ? "sellerPaginationContainer" : listingPagination ? "listings-pagination" : blogs ? "blogs-container" : homeMap ? "homeMap" : "" } >
        {
          page == 1 ?
          <div className = 'hovers' style={ leftArrow }>{ LeftIcon }</div> :
          <div style={ leftArrow } onClick={this.handleLeftButtonClick}>{ LeftIcon }</div>
        }
        {
          page * pageLimit < totalCount ?
          <div style={ paginationText }>Viewing {(page-1) * pageLimit} - {page * pageLimit} of {totalCount ? totalCount : 0}</div> :
          <div style={ paginationText }>Viewing {(page-1) * pageLimit} - {totalCount ? totalCount : 0} of {totalCount ? totalCount : 0}</div>
        }
        {
          page * pageLimit < totalCount ?
          <div style={ rightArrow } onClick={ this.handleRightButtonClick}>{ RightIcon }</div> :
          <div className = 'hovers' style={ rightArrow }>{ RightIcon }</div>
        }
      </div>
    )
  }
}

Pagination.propTypes = {
  
  randomBlogs: PropTypes.array,
  blogs: PropTypes.array,
  sellerListings: PropTypes.bool,
  listingPagination: PropTypes.bool,
  retrieveBlogs: PropTypes.func.isRequired,
  blogType: PropTypes.string,
  totalCount: PropTypes.number,
  pageLimit: PropTypes.number
}

Pagination = connect(null, mapDispatchToProps)(Pagination)
export default Pagination
