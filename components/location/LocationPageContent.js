import React, { Fragment } from "react"
import { Container } from 'reactstrap'
import { Link } from '../../routes'
import PropTypes from 'prop-types'

const LocationPageContent = (props) => {
  return (
    <Fragment>
      <div className="location_content locationDeatail">
        <Container>
          <div className="state-label center-div">Homes for Sale</div>
          {
            props.states.map((geoState) => {
              return <div key={geoState.id}>
                <div className="state-label">{geoState.name}</div>
                <div className="row city-row">
                  {
                    geoState.cities.map((city) => {
                      return <div className="col-md-3 col-sm-6 col-xs-6 city-name" key={city.id}><Link route={`/location/${geoState.name}/${city.name}`}>
                        <a className="city-name">{city.name}</a>
                      </Link></div>
                    })
                  }
                </div>
              </div>
            })
          }
          <div className="search_text">
            <h4>Search for Listings- City and State Wise</h4>
            <p>Still having difficulty finding your ideal home? Try the search function at the top of the
              page or get assistance from our representative in the chat box, located at the bottom right.</p>
          </div>
        </Container>
      </div>
    </Fragment>
  )
}

LocationPageContent.propTypes = {
  states: PropTypes.array.isRequired
}

export default LocationPageContent
