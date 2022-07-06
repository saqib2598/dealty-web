import React from "react"
import { Container, Col, Row } from 'reactstrap'
import Link from 'next/link'

const DealtyDirectories = () => {
  return (
    <Row>
      <Col md={4} xs={12} sm={12}>
        <div className="directory-box">
          <div className="directory-text">
            <h3>Agent Directory</h3>
            <p>On Dealty you always have options. You can buy or sell on your own or find an agent in your area to assist you.</p>
          </div>
          <Link href={{ pathname: '/resources', query: { tab: 'agent' }}}><a className="btn-find">Find Agents</a></Link>
        </div>
      </Col>
      <Col md={4} xs={12} sm={12}>
        <div className="directory-box">
          <div className="directory-text">
            <h3>Builder Directory</h3>
            <p>Search home builders in your area and talk to home builders directly to find your next dream home.</p>
          </div>
          <Link href={{ pathname: '/resources', query: { tab: 'builder' }}}><a className="btn-find">Find Builders</a></Link>
        </div>
      </Col>
      <Col md={4} xs={12} sm={12}>
        <div className="directory-box">
          <div className="directory-text">
            <h3>Loan Officers</h3>
            <p>Qualifying for a home or refinancing your existing home has never been easier. Contact a loan officer who will make the process simple.</p>
          </div>
          <Link href={{ pathname: '/resources', query: { tab: 'officer' }}}><a className="btn-find">Find Lenders</a></Link>
        </div>
      </Col>
    </Row>
  )
}

export default DealtyDirectories
