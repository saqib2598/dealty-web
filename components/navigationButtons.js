import React from 'react'
import { Col, Row, Container } from 'reactstrap'
import { Router } from '../routes'
import PropTypes from 'prop-types'

const navigationButton = (props) => (
  <Container>
    <div>
      <hr className="dashed"/>
      <Row>
        <Col xs="6" className="text-left">
          <a className="prev-page" onClick={() => { Router.back() }}>« Back</a>
        </Col>
        {props.showNext &&
          <Col xs="6" className="text-right">
            <a className="prev-page" onClick={() => { Router.pushRoute(props.routeNext) }}>{props.nextText} »</a>
          </Col>
        }
      </Row>
    </div>
    <style jsx>{`
      @import "styled-jsx-helper";

      .prev-page{
        cursor:pointer;
        color: $brand-grey !important;
        font-size: 18px;
        font-weight:bold;
      }
    `}</style>
  </Container>
)

navigationButton.propTypes = {
  routeNext: PropTypes.string,
  nextText: PropTypes.string,
  showNext: PropTypes.bool
}

export default navigationButton;
