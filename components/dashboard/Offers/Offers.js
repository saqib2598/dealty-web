import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'
import Offer from './Offer'
import { retrieveOffers } from '../../../modules/offers'

const mapStateToProps = state => ({
  offers: state.offers.offers
})
const mapDispatchToProps = { retrieveOffers }

const offersComponent = (props) => {

  useEffect(() => {
    const { retrieveOffers } = props
    retrieveOffers(`type=${props.type}`);
  },[])

  return(
    <Row className="pt-4 offers">
      {props.offers.length == 0 &&
        <div align="center" style={{width: '100%'}}><h3>{
          props.type === 'sent' ? "You haven't made any offer yet" : "Please create a listing to get offers"}
        </h3></div>
      }
      {props.offers && props.offers.map(offer =>
        <Col xs="12" sm="6" lg="4" key={offer.id} className="d-flex align-items-stretch mt-4">
          <Offer offer={offer} type={props.type} />
        </Col>
      )}
    </Row>
  )
}

offersComponent.propTypes = {
  retrieveOffers: PropTypes.func.isRequired,
  offers: PropTypes.array,
  type: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(offersComponent)
