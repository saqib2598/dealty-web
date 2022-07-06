import React from 'react'
import { Container } from 'reactstrap'
import HousePattern from '../HousePattern'
import HeaderActions from '../ListingHeaderActions'
import EstimatedPriceBar from '../EstimatedPriceBar'
import { NoEstimatedPrice, AddressSection } from '../EstPriceContainerComps'
import PropTypes from 'prop-types'


const HomeValue = ({listing, questionsCompleted, handleOnClick}) => {
  if (listing === null) return null
  return(
    <div className="home-value text-center">
      <AddressSection listing={listing} />
      <Container fluid>
        {listing.valuationFlag === false ?
          <>
            <div className="my-2">
              <NoEstimatedPrice />
              {listing.status !== 'sold' &&
                <HeaderActions listing={listing} handleOnClick={handleOnClick} />
              }

            </div>
          </>
          :
          <>
            <EstimatedPriceBar
              listing={listing}
            />
            {questionsCompleted &&
              <div>
                {listing.status !== 'sold' &&
                  <HeaderActions listing={listing} handleOnClick={handleOnClick} />
                }
              </div>
            }
          </>
        }
      </Container>
      <HousePattern />
      <style jsx>{`
      @import "styled-jsx-helper";

      .home-value{
        width: 100%;
        background: $teal;
        min-height: 470px;
        position: relative;
        padding: 35px 0 100px 0;
        margin: 0;
        color: #fff;
      }
      .home-value :global(.container-fluid){
        z-index: 12;
        position: relative;
        padding-bottom: 50px;
      }
      .home-value :global(h4){
        margin: 0 0 0 0;
        font-size: 20px;
      }
      .home-value :global(h1){
        margin: 0 0 40px 0;
        font-size:50px;
        line-height: 1.1;
      }
      .home-value :global(.btn){
        max-width: 370px;
        margin: 0 auto;
      }

      @include media-breakpoint-up(md) {
        .home-value{
          min-height: 560px;
          padding: 0px 0 100px 0;
        }

        .home-value :global(h4){
         font-size: 24px;
        }
      }
    `}</style>
    </div>
  )
}

HomeValue.propTypes = {
  listing: PropTypes.object.isRequired,
  questionsCompleted: PropTypes.bool.isRequired,
  handleOnClick: PropTypes.func
}

export default HomeValue
