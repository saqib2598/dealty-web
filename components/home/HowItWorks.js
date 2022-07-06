import React from 'react'
import { Row, Col, Container } from 'reactstrap'

const Icon1 = () => (
  <img
    alt="Create a Profile"
    title="Create a Profile"
    src="/static/images/how-it-works-a-icon.svg"
  />
)
const Icon2 = () => (
  <img
    alt="Describe Your Home"
    title="Describe Your Home"
    src="/static/images/how-it-works-b-icon.svg"
  />
)
const Icon3 = () => (
  <img
    alt="Schedule a Photographer"
    title="Schedule a Photographer"
    src="/static/images/how-it-works-c-icon.svg"
  />
)
const Icon4 = () => (
  <img
    alt="Sell Your Home"
    title="Sell Your Home"
    src="/static/images/how-it-works-d-icon.svg"
  />
)

const HowItWorks = () => (
  <section className="how text-center">
    <Container fluid>
    <h2>How Dealty Works</h2>
    <Row>
      <Col xs="12" md="6" lg="3">
        <div className="img-wrap"><Icon1 /></div>
        <h3>Create a Profile</h3>
        <p className="lead">Tell us a bit about yourself and where you live</p>
      </Col>
      <Col xs="12" md="6" lg="3">
        <div className="img-wrap"><Icon2 /></div>
        <h3>Describe Your Home</h3>
        <p className="lead">Give us any and all details that pertain to the value and condition of your home</p>
      </Col>
      <Col xs="12" md="6" lg="3">
        <div className="img-wrap"><Icon3 /></div>
        <h3>Schedule a Photographer</h3>
        <p className="lead">Capture the beauty of your home with a professional photographer</p>
      </Col>
      <Col xs="12" md="6" lg="3">
        <div className="img-wrap"><Icon4 /></div>
        <h3>Sell Your Home</h3>
        <p className="lead">Determine your value, set your price, and put your property on the market</p>
      </Col>
    </Row>
    </Container>
    <style jsx>{`
      @import "styled-jsx-helper";

      .how{
        padding:30px 0 30px 0;
        background-color: $light;
        color: $dark;
      }
      h2{
        margin: 0 auto 60px auto;
      }
      .how :global(img){
        margin: 0 auto;
        vertical-align: middle;
        display:block;
      }
      .img-wrap{
        min-height:86px;
        display:flex;
        align-items:center;
        margin-bottom: 20px;
      }
      p{
        margin: 10px auto 50px auto;
        max-width: 280px;
      }
      @include media-breakpoint-up(md) {
        .how{
          padding:120px 0 70px 0;
        }
        h2{
          margin-bottom: 60px;
        }
      }
    `}</style>
  </section>
)

export default HowItWorks