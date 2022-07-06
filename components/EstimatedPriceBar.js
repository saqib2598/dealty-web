import React from 'react'
import MediaQuery from 'react-responsive'
import { Container } from 'reactstrap'

const markerLowPosition = '25%'
const markerMidPosition = '50%'
const markerHighPosition = '75%'

const EstimatedPriceBar = ({ listing }) => {
  return(
    <div>
      <Container fluid>
        <div className="mb-2"><strong>is valued at</strong></div>
        <h1>
          <span className="low-price">${Math.round(listing.priceRange.low).toLocaleString()}</span>
          <span className="to"><img alt="TO Icon" src='/static/images/icon-to.svg' /></span>
          <span className="high-price">${Math.round(listing.priceRange.high).toLocaleString()}</span>
        </h1>
        <MediaQuery minWidth={768}>
          <div className="price-bar">
            <div className="marker low">
              {listing.priceRange.low >= 1e6 ? `$${(listing.priceRange.low / 1e6).toFixed(2)}m` : `${(listing.priceRange.low / 1e3).toFixed(0)}k`}
            </div>
            <div className="marker mid">
              {listing.priceMid >= 1e6 ? `$${(listing.priceRange.mid / 1e6).toFixed(2)}m` : `${(listing.priceRange.mid / 1e3).toFixed(0)}k`}
            </div>
            <div className="marker high">
              {listing.priceRange.high >= 1e6 ? `$${(listing.priceRange.high / 1e6).toFixed(2)}m` : `${(listing.priceRange.high / 1e3).toFixed(0)}k`}
            </div>
            <div className="center-bar" />
            <div className="white-bar" />
          </div>
        </MediaQuery>
      </Container>
      <style jsx>{`
      @import "styled-jsx-helper";

      .to{
        padding: 0;
        margin: 0;
        display:block;
        position:relative;
      }
      .to img{
        position:relative;
        z-index: 10;
        border: 3px solid $teal;
      }
      .to:before{
        width: 210px;
        position: absolute;
        height:1px;
        display:block;
        content:'';
        left: 50%;
        margin-left: -105px;
        top:30px;
        border-top: 1px dashed $primary;
        z-index:0;
      }
      .price-bar{
        position: relative;
        display:block;
        width: 100%;
        padding: 0 30px 60px 30px;
        margin: 0 auto 0 auto;
        font-size: 14px;
        font-weight: bold;
        max-width: 780px;
      }
      .center-bar{
        height: 4px;
        border-radius: 4px;
        position: relative;
        width: 100%;
        margin: 0 auto;
        background: $primary;
        z-index:0;
      }
      .white-bar{
        position: absolute;
        width:50%;
        left:25%;
        background: #fff;
        height:4px;
        top:0;
      }
      .marker{
        position:absolute;
        top: 15px;
        width: 74px;
        margin-left: -37px;
      }
      .marker:before{
        content: '';
        display:block;
        margin: 0;
        position: absolute;
        width: 3px;
        border-radius: 4px;
        background: #fff;
        height: 25px;
        top: -26px;
        left: 50%;
        z-index:10;
      }
      .marker.low{
        left: ${markerLowPosition};
      }
      .marker.mid{
        left: ${markerMidPosition};
      }
      .marker.high{
        left: ${markerHighPosition};
      }

      @include media-breakpoint-up(md) {
        .to{
          display:inline-block;
          padding: 0 20px;
        }
        .to:before{
          display:none;
          border:none;
        }
      }
    `}</style>
    </div>
  )
}

export default EstimatedPriceBar;
