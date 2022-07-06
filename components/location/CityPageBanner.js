import React, { Fragment } from "react"
import { Container, Button } from 'reactstrap'
import SearchForm from '../buyer/home/SearchForm'
import { Form } from 'react-final-form'
import { Router } from '../../routes'
import PropTypes from 'prop-types'
import { Link } from '../../routes'

const CityPageBanner = ({ city }) => {

  const handleListPropertyClick = () => {
    Router.pushRoute('/seller/add-new-property')
  }

  const handleSearchListClick = () => {
    Router.push('/buy')
  }

  const onSubmit = () => {
    const form = document.getElementsByTagName('form')[0]
    const data = new FormData(form)
    const search = data.get('search')
    return search ? Router.push(`/buy/homes/listings?place=${search}`) : ''    
  }

  const handleKeyPress = event => {
    if (event.key == 'Enter') {
      event.target.value && Router.push(`/buy/homes/listings?place=${event.target.value}`)
    }
  }

  return (
    <Fragment>
      <div className="banner" style={{backgroundImage:`"url(${city.backgroundImage})"`}}>
          <Container>
            <div className="banner-inner">
              <div className="location_caption">
                <h1>{city.headTitle}</h1>
                <p>{city.headBody}</p>
              </div>
              <div className="search_form_width">
                <Form
                  component={SearchForm}
                  onSubmit={onSubmit}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>
            <div className="btn_area">
              <p>Real Estate made simple for everyone.</p>
              <Button className="btn_list" onClick={handleListPropertyClick}>List PROPERTY</Button>
              <Button className="btn_list" onClick={handleSearchListClick}>SEARCH LISTING</Button>
            </div>
          </Container>
        </div>
    </Fragment>
  )
}

CityPageBanner.propTypes = {
  city: PropTypes.object.isRequired
}

export default CityPageBanner
