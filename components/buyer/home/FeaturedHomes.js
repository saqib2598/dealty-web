import React from 'react'
import {
  Row,
  Col,
  Container
} from 'reactstrap'
import HomeCard from './Home'

const FeaturedHomes = ({ homes }) => (
  <section className="feature-homes">
    <Container>
      <Row>
        <Col className="text-center">
          <h3>Featured Properties</h3>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {homes.map((item) => <HomeCard key={item.id} sizes={{ md: 4, lg: 3 }} item={item} />)}
      </Row>
    </Container>
    <style jsx>{`
      @import "styled-jsx-helper";  
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

export default FeaturedHomes