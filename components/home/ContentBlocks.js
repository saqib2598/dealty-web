import React from 'react'
import { Row, Col, Container } from 'reactstrap'
import MediaQuery from 'react-responsive'

const Dealty1 = () => (
  <img
    alt="Father and Daughter Graphic"
    title="Father and Daughter Graphic"
    src="/static/images/dealty-graphic-1.jpg"
    className="img-fluid"
  />
)
const Dealty2 = () => (
  <img
    alt="Happy Couple"
    title="Happy Couple"
    src="/static/images/dealty-graphic-2.jpg"
    className="img-fluid"
  />
)
const Dealty3 = () => (
  <img
    alt="Man and dog"
    title="Man and dog"
    src="/static/images/dealty-graphic-3.jpg"
    className="img-fluid"
  />
)


const ContentBlocks = () => (
  <section className="content-blocks">
    <Container fluid>
      <Row>
        <Col xs="12" md="6"><div className="img-wrap"><Dealty1 /></div></Col>
        <Col xs="12" md="6" >
          <h4>You don’t have to be a licensed agent to sell your home</h4>
          <p>With the help of Dealty, you gain instant access to all of the tools, tips, and tricks you need to sell your home. We believe that the power should be in the homeowner's hands, not a real estate agent’s.</p>
        </Col>
      </Row>
      <Row>
        <MediaQuery maxWidth={767}>
          <Col xs="12" md="6"><div className="img-wrap"><Dealty2 /></div></Col>
        </MediaQuery>
        <Col xs="12" md="6" >
          <h4>Keep the Equity You’ve Earned</h4>
          <p>By selling without an agent, you’re putting your home's value back into your pocket. Protect your investment, save big, and keep the equity of your home. Dealty saves homeowners a minimum of $19,000 based on a national average home price.</p>
        </Col>
        <MediaQuery minWidth={768}>
        <Col xs="12" md="6"><div className="img-wrap"><Dealty2 /></div></Col>
        </MediaQuery>
      </Row>
      <Row>
        <Col xs="12" md="6"><div className="img-wrap"><Dealty3 /></div></Col>
        <Col xs="12" md="6">
          <h4>Real Estate Made Easy</h4>
          <p>In a matter of minutes, Dealty helps you determine your home’s value, set your price, and put your property on the market. You can even schedule a photo shoot with a professional photographer to capture the beauty of your home at no cost to you!</p>
        </Col>
      </Row>
    </Container>
    <style jsx>{`
      @import "styled-jsx-helper";
       .content-blocks{
        background: #fff;
        color: $dark;
        padding: 60px 0;
        text-align: center;
       }
      .content-blocks :global(img){
        margin: 0 auto;
        vertical-align: middle;
        display:block;
        width: 365px;
      }
      .img-wrap{
        min-height:86px;
        display:flex;
        align-items:center;
        margin-bottom: 20px;
      }
      h4{
        margin: 30px auto 10px auto;
        max-width: 350px;
      }
      p{
        margin: 0px auto 70px auto;
        max-width: 350px;
      }
      @include media-breakpoint-up(md) {
        .content-blocks{
          text-align:left;
        }
        .content-blocks :global(.row:nth-child(2)){
          text-align: right;
        }
        .content-blocks :global(.row){
          align-items:center;
          margin-bottom: 90px;
        }
        h4, p{
          max-width: 100%;
        }
      }
      @include media-breakpoint-up(md) {
        .content-blocks{
          padding:120px 0 30px 0;
        }
      }
    `}</style>
  </section>
)

export default ContentBlocks