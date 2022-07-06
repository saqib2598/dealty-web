import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Table } from "reactstrap";
import moment from 'moment'

const homeComparablesTable = ({ home }) => {
  return <>
  {(home.comparables && home.comparables.length > 0) ?
    <>
      <Row className="mt-4">
        <Col xs="12">
          <div className="table-card">
            <Table borderless responsive className="price-table">
              <thead>
                <tr>
                  <th>ADDRESS</th>
                  <th>DISTANCE</th>
                  <th>TYPE</th>
                  <th>SOLD PRICE</th>
                  <th>SOLD DATE</th>
                  <th>BED</th>
                  <th>BATH</th>
                  <th>SQFT</th>
                </tr>
              </thead>
              <tbody>
                {home.comparables.map((comparable, index) => {
                  return (
                    <tr key={index}>
                      <td data-head="Address">{comparable.address}</td>
                      <td data-head="Distance">{parseFloat(comparable.distance).toFixed(2)}</td>
                      <td data-head="Type">{comparable.type}</td>
                      <td data-head="Sold Price">${parseFloat(comparable.soldPrice).toLocaleString()}</td>
                      <td data-head="Sold Date">{moment(comparable.soldDate).format('l')}</td>
                      <td data-head="Bed">{comparable.bedrooms}</td>
                      <td data-head="Bath">{comparable.bathrooms}</td>
                      <td data-head="Sqft">{parseFloat(comparable.sqft).toLocaleString()}</td>
                    </tr>
                  )
                }
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </>
    :
    <Row className="google-map">
      <Col md="12">
        <h5 className="property__compareables-estimates">No Immediate Comparables Available</h5>
      </Col>
    </Row>
  }</>
}

homeComparablesTable.propTypes = {
  home: PropTypes.object.isRequired,
}

export default homeComparablesTable
