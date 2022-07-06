import React from 'react'
import { Container } from 'reactstrap'


const Testimonial = () => (
  <section className="testimonial">
    <Container fluid>
      <h3><span className="quote">&ldquo;</span>
        I always thought I had to use an agent to sell my home, but Dealty gave me all the tools to do it on my own. It’s super easy!</h3>
      <p>- Craig S. Phoenix, AZ</p>
    </Container>
    <style jsx>{`
    @import "styled-jsx-helper";
      .testimonial{
        text-align: center;
        width: 100%;
        padding: 60px 15px;
        background-color: $light;
        color: $dark;
        z-index:50;
        position: relative;
      }
      .quote{
        text-align: center;
        margin: 0;
        line-height: 1;
        vertical-align:bottom;
        top:0;
        left:50%;
        width: 100px;
        height: 100px;
        margin-left: -50px;
        color: #999;
        font-family: Times New Roman, Georgia, serif;
        position: absolute;
        font-size: 100px;
      }
      h3{
        display:block;
        font-size:28px;
        padding-top: 80px;
        position: relative;
        max-width: 880px;
        line-height: 1.4;
        margin: 0 auto 20px auto;
      }
      p{
        margin: 0;
        font-size:22px;
        font-weight:bold;
        color: #999;
      }
      @include media-breakpoint-up(md) {
        .testimonial{
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
          height:600px;
        }
        .testimonial h3{
          font-size: 2.5rem;
        }
      }
    `}</style>
  </section>
)

export default Testimonial
