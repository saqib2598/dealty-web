import React from 'react'
import {
  Row,
  Col,
  Container
} from 'reactstrap'

import HomeCard from './Home'
import Slider from "react-slick"
import settings from "./styles/CarouselSettings"
import { Adsense } from '../../Ads/Adsense'

function getCurrentSlide(homes){
  if(localStorage.getItem("ListingIndex")){
    const index = localStorage.getItem("ListingIndex")
    localStorage.removeItem("ListingIndex")
    return validListing(parseInt(index), homes)
  }
  return 0
}

function validListing(index, homes){
  if(homes[index]){
    return index
  }
  return 0
}

const NewlyListedHomes = ({ homes }) => (
  <section className="feature-homes">
    <Container>
      <Row>
        <Col className="text-center">
          <h3>Recently Viewed Properties</h3>
        </Col>
      </Row>
      <Slider {...settings} initialSlide={ getCurrentSlide(homes) }>
        {homes.map((item, key ) => <HomeCard item={item} index={key}/>)}
      </Slider>
      <Adsense/>
    </Container>
    <style jsx>{`
      @import 'styled-jsx-helper';
      .feature-homes{
        background: $grey-50;
        color: $grey-650;
        padding: 65px 0px 35px;
      }
      .feature-homes h3{
        margin-bottom: 3rem;
        color: $brand-dark;
      }
    `}</style>
  </section>
)

export default NewlyListedHomes
