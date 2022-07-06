import React from 'react'
import {
  Col,
  Row
} from 'reactstrap'
import UserImage from '../../../components/UserImage'
import FormatPhone from '../../../components/FormatPhone'
import getConfig from 'next/config'
import PropTypes from 'prop-types'

const PrintFlyerOwnerInfo = ({ owner, sellerType, id }) => {
  const { publicRuntimeConfig } = getConfig()

  return (
    <React.Fragment>
      <a href={`${publicRuntimeConfig.primaryDomain}/buy/home/${id}`} style={{textDecoration:'none'}}>
        <Row className="printing-header flyer_owner_info">
          <Col className="col-md-12 flyer_owner_info__contact_owner">{sellerType.toUpperCase()} CONTACT</Col>
        </Row>
      </a>
      <Row className="profile sellerInfo flyer_owner_info__owner">
        <Col className="col-md-3">
          <UserImage
            img={owner && owner.image}
            printFlag={true}
          />
        </Col>
        <Col className="col-md-4">
        <a href={`${publicRuntimeConfig.primaryDomain}/buy/home/${id}`} style={{textDecoration:'none', color: 'black'}}>
          <h5>{owner.firstName}
          {!(owner.seller.sellerType.toLowerCase() == 'homeowner' ) &&
            ' ' + owner.lastName
          }
          </h5>
          {owner.seller.sellerType.toLowerCase() == 'agent' &&
            <span className="flyer_owner_info__broker_name">
              {owner.seller.brokerageName}
            </span>
          }
          {!(owner.seller.sellerType.toLowerCase() == 'homeowner' ) &&
            <React.Fragment>
              <h6 className="flyer_owner_info__contact_email">{owner.email}</h6>
              <h6>{FormatPhone(owner.phone)}</h6>
            </React.Fragment>
          }
          </a>
        </Col>
      </Row>
    </React.Fragment>
  )
}

PrintFlyerOwnerInfo.propTypes = {
  owner: PropTypes.object.isRequired,
  sellerType: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
}

export default PrintFlyerOwnerInfo
