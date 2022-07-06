import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Table } from "reactstrap";
import moment from 'moment'
import { Adsense } from '../Ads/Adsense';

const homePriceHistory = ({ home }) => {
  return <div className="price-history-block">
    {home.salesHistory ?
      <Row>
        <Col md="12">
          <h5 className="">Price History</h5>
        </Col>
        <Col xs="12">
          <div className="table-card">
            <Table responsive borderless className="price-table">
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>PRICE</th>
                  <th>EVENT</th>
                </tr>
              </thead>
              <tbody>
                {home.salesHistory.map((history, index) => {
                  if (history.amount.saleAmt > 0) return (
                    <tr key={index}>
                      <td data-head="Date">{moment(history.saleTransDate, 'YYYY-M-D').format('l')}</td>
                      <td data-head="Price">${history.amount.saleAmt}</td>
                      <td data-head="Event">{history.amount.saleTransType}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
        </Col>
        <Col>
          <Adsense/>
        </Col>
      </Row>
      :
      <Row>
        <Col md="12">
          <h5 className="property__price-history">No Price History Available</h5>
        </Col>
      </Row>
    }
  </div>
}

homePriceHistory.propTypes = {
  home: PropTypes.object.isRequired,
}

export default homePriceHistory
