import React from 'react'
import { Container, Button } from 'reactstrap'
import { Link } from '../../routes'
import HousePatternSvg from '../HousePattern'

const BottomCTA = () => (
  <section className="bottom-cta text-center">
    <div className="d-flex align-items-center">
      <Container>
      <h1>Lorem ipsum dolor sit amet  onsectetur</h1>
      <Link route="/sign-up" passHref>
        <Button color="primary" size="lg" block>Sign Up Free</Button>
      </Link>
      </Container>
    </div>
    <HousePatternSvg />
    <style jsx>{`
      @import "styled-jsx-helper";

      .bottom-cta{
        padding: 30px 0 300px 0;
        position: relative;
        z-index: 1;
        color: #fff;
        background-color: $teal;
      }
      .bottom-cta .d-flex{
        height: 300px;
      }
      .bottom-cta h1{
        margin: 0 auto 30px auto;
        color: #fff;
      }
      .bottom-cta :global(.btn){
        max-width: 270px;
        margin: 0 auto;
      }
      @include media-breakpoint-up(md) {
        .bottom-cta .d-flex{
          height: 440px;
          max-width: 600px;
          margin: 0 auto;
        }
      }
    `}</style>
  </section>
)

export default BottomCTA