import React from "react"
import { Container, Col, Row } from 'reactstrap'

const DealtyServices = () => {
  return (
    <div className="location_content">
      <Container>
        <Row>
          <Col md={3}>
            <div className="tab_box">
              <div className="icon_game">
                <img src="/static/images/location-images/sell_icon1.svg" alt="Post image" />
              </div>
              <div className="tab_textarea">
                <strong className="title">Search Homes</strong>
                <p>All the tools and tips you need to buy or sell your home.</p>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="tab_box">
              <div className="icon_game">
                <img src="/static/images/location-images/sell_icon3.svg" alt="icon2" />
              </div>
              <div className="tab_textarea">
                <strong className="title">Sell Your Home</strong>
                <p>Whether you choose to sell on your own or you are looking for an agent to assist you, Dealty has the tools.</p>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="tab_box">
              <div className="icon_game">
                <img src="/static/images/location-images/sell_icon4.svg" alt="Icon 3 " />
              </div>
              <div className="tab_textarea">
                <strong className="title">Selling Made Easy</strong>
                <p>Determine your home’s value, set your price, and put your property on the market.</p>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="tab_box">
              <div className="icon_game">
                <img src="/static/images/location-images/sell_icon2.svg" alt="Post image" />
              </div>
              <div className="tab_textarea">
                <strong className="title">Buy with Confidence</strong>
                <p>Communicate directly with the sellers or the listing agents, those that know the property best.</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default DealtyServices
