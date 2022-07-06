import React from 'react';
import { Row, Col, Container } from 'reactstrap'
import { Link } from '../routes'
import Parallax, { Layer } from 'react-parallax-scroll';
import Layout from '../components/Layout'

const landing = () => {
  const icon1 = '../static/images/icon1.png'
  const icon2 = '../static/images/icon2.png'
  const icon3 = '../static/images/icon3.png'
  const icon4 = '../static/images/icon4.png'
  const no1 = '../static/images/number1.png'
  const no2 = '../static/images/number2.png'
  const no3 = '../static/images/number3.png'
  const dealtyimg = '../static/images/dealty-graphic-3.jpg'

  return (
    <Layout headerStyle="default" bodyBg="light" footerStyle="white">
      <Parallax>
        <Layer className="banner banner-1"  settings={{ speed: 0.15 }}>
          <div className="box">
            <div className='body'>
              <h1>Putting the Power of Real Estate in Your Hands. Search for Homes Today!</h1>
              <p>Real Estate made simple for everyone.</p>
            </div>
            <div>
              <ul className="btn-area">
                <li>
                  <Link route="/seller/add-new-property">
                    <a>List Property</a>
                  </Link>
                </li>
                <li>
                  <Link route="/buy">
                    <a>Search Listings</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Layer>
      </Parallax>
      <Container className="four_columns">
        <Row>
          <Col sm={3}>
            <img src={icon3} alt="icon" />
            <h3>Sell and Buy on Your Own</h3>
            <p>Gain instant access to all of the tools and tips you need to buy or sell your home. We believe that the power should be in the homeowner's hands, not a real estate agent’s.</p>
          </Col>
          <Col sm={3}>
            <img src={icon1} alt="icon" />
            <h3>Keep Your Equity</h3>
            <p>Sell without an agent and put your home's value back into your pocket. Dealty saves homeowners a minimum of $19,000 based on a national average home price.</p>
          </Col>
          <Col sm={3}>
            <img src={icon4} alt="icon" />
            <h3>Selling Made Easy</h3>
            <p>Determine your home’s value, set your price, and put your property on the market. Next, schedule a photo shoot of your home with a professional photographer at no cost to you!</p>
          </Col>
          <Col sm={3}>
            <img src={icon2} alt="icon" />
            <h3>Buy with Confidence.</h3>
            <p>Communicate directly with the homeowner and be sure you’re getting the best deal with our price comparison map of listings. </p>
          </Col>
        </Row>
      </Container>
      <Container className="three_columns">
        <div className="inner-block">
          <h1>How it Works</h1>
          <Row>
            <Col sm={4}>
              <img src={no1} alt="icon1"/>
              <h3>Create a Profile</h3>
              <p>Tell us a bit about yourself, where you live, or the area you’re relocating to.</p>
            </Col>
            <Col sm={4}>
              <img src={no2} alt="icon2" />
              <h3>Describe Your Home</h3>
              <p>Give details pertaining to the value and condition of your home, or the requirements of the home you’re searching for.</p>
            </Col>
            <Col sm={4}>
              <img src={no3} alt="icon" />
              <h3>Sell or Buy Your Home</h3>
              <p>Determine your value and price to put your property on the market, or chat with homeowners to tour and buy your dream home.</p>
            </Col>
          </Row>
          <div>
            <ul className="btn-area">
              <li>
                <Link route="/seller/add-new-property"><a>Sell Now</a></Link>
              </li>
              <li>
                <Link route="/buy"><a>Buy Now</a></Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <div className="two_columns">
        <Container>
         <div className="inner-block">
            <h1>Accessible, Easy, Empowering — That’s Dealty.</h1>
            <Row>
              <Col sm={4}>
                <div className="image-holder">
                  <img src={dealtyimg} alt="icon" />
                </div>
              </Col>
              <Col sm={8} className="p-05">
                <div className="caption_box">
                  <p>“I always thought I had to use an agent to sell my home, but Dealty gave me all the tools to do it on my own. It’s super easy!”</p>
                  <p>— Craig S. Phoenix, AZ</p>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <div>
        <Parallax>
          <Layer className="buyandsale banner-2"  settings={{ speed: 0.30 }}>
            <div className="box">
              <h1>Real Estate made simple for everyone.</h1>
                <div>
              <ul className="btn-area">
                <li>
              <Link route="/seller/add-new-property"><a>Sell Now</a></Link>
            </li>
            <li>
              <Link route="/buy"><a>Buy Now</a></Link>
            </li>
              </ul>
            </div>
            </div>
          </Layer>
        </Parallax>
      </div>
    </Layout>
  );
}

export default landing;
