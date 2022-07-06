import React from 'react'
import { Button, Container } from 'reactstrap'
import { Link } from '../../routes'
import MediaQuery from 'react-responsive'

const HouseImageMobile = () =>(
  <img
    alt="House Graphic"
    title="House Graphic"
    src="/static/images/home-hero-mobile@2x.png"
    srcSet="/static/images/home-hero-mobile@2x.png,
            /static/images/home-hero-mobile@2x.png 2x,
            /static/images/home-hero-mobile@3x.png 3x"
  />
)

const TopSection = (props) => (
  <section className="top">
    <Container>
    <div className="text-wrap">
      <div>
        <h1>Take Control of Your Home Selling Process</h1>
        <p className="lead d-none d-sm-block">Dealty gives you all the tools needed to sell your home on your own, like a pro. <em>No unnecessary fees, no hidden information.</em> It's your house, sell it your way. </p>
        {!props.isSignedIn &&
        <Link route="sign-up/index" prefetch passHref>
          <Button
            size="lg"
            color="primary"
            block
          >Sign Up Free</Button>
        </Link>
        }
        </div>
      </div>
    </Container>


    <MediaQuery maxWidth={767}>
      {!props.isSignedIn &&
      <Container>
        <div className="text-wrap">
          <Link route="login" prefetch passHref>
            <Button
              size="lg"
              color="primary"
              outline
              block
            >Log In</Button>
          </Link>
        </div>
      </Container>
      }
      <div><HouseImageMobile/></div>
    </MediaQuery>


    <style jsx>{`
      @import "styled-jsx-helper";

      .top{
        color: #fff;
        width: 100%;
        position: relative;
        overflow:hidden;
        min-height: 500px;
        padding: 20px 0 30px 0;
      }
      .top h1{
        margin: 0 auto 25px auto;
        color: #fff;
        z-index: 10;
        font-size:36px;
        line-height: 1.4;
      }
      .top :global(img){
        margin: 0;
        max-width: 100%;
        width: 100%;
        display:block;
      }
      .top p{
        margin: 0 auto 35px auto;
      }
      .top :global(.btn){
        position: relative;
        z-index: 10;
        margin: 0 auto 20px auto;
      }
      .text-wrap{
        text-align: center;
        position:relative;
        z-index:10;
        padding: 0 15px;
      }
      @include media-breakpoint-up(sm) {
        .top :global(.btn){
          max-width: 315px;
        }
      }
      @include media-breakpoint-up(md) {
        .top{
          padding: 0;
          background-image: url(/static/images/home-hero@2x.png);
          background-repeat: no-repeat;
          background-size: 910px 709px;
          background-position: top right;
          min-height: 700px;
          height: 100vh;
          padding: 0;
        }
        .text-wrap{
          display: flex;
          z-index:100;
          position:relative;
          align-items: center;
          max-width: 620px;
          margin: 0 auto;
          min-height: 600px;
          height: 100vh;
          padding: 100px 0 0 0;
        }
        .top :global(img){
         top: 0;
         position: absolute;
         right: 0;
         z-index:0;
        }
        .top :global(.btn){
          margin: 0 auto;
          max-width:270px;
        }
      }
      @include media-breakpoint-up(lg) {
        .text-wrap{
          text-align: left;
          margin: 0;
        }
        .top :global(.btn){
          margin: 0;
        }
      }
    `}</style>
  </section>
)

export default TopSection