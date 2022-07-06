import React from 'react'
import {
  Row,
  Col,
  Button
} from 'reactstrap'
import ContactHomeOwnerIconSvg from '../../images/contact-home-owner-iconsvg'
import { Link } from '../../../routes'
import UserPubInfo from '../../../components/buyer/home/UserPubInfo'
import Licences from '../../modals/Licences'
import PropTypes from 'prop-types'

class ContactHomeOwner extends React.Component {

  state = {
    ShowSellerDetails: false
  }

  toggleSellerDetails = () => {
    this.setState(( prevState ) => {
      return{ ShowSellerDetails: !prevState.ShowSellerDetails }
    })
  }

  render() {
    let sellerType = this.props.sellerTypeTBD

    return(
      <div className="contact-detail">
        <Row className="text-center text-md-left">
          <div className="col-md-8 col-12 ">
            <Row>
              <Col className="col-md-auto col-12">
                {this.props.icon ?
                  <img src={this.props.icon} className="user-icon" alt="User Icon"/>
                  :
                  <span className="contact__icon"><ContactHomeOwnerIconSvg /></span>
                }
              </Col>
              <Col>
                <Col className="col-md-8">
                  <h1 className="h5 contact__homeowner">Contact {this.props.sellerTypeTBD}</h1>
                </Col>
                <Col className="col-md-12">
                  <div className="contact__message">If you&apos;re interested in this listing, please contact the {this.props.sellerTypeTBD == 'Guest' ? 'Lister' : this.props.sellerTypeTBD} to schedule a tour or ask any questions you may have.</div>
                </Col>
              </Col>
            </Row>

          </div>
          <div className="col-md-4">
            <Col>
              {
                (sellerType.toLowerCase()== 'agent' || sellerType.toLowerCase() == 'investor' || sellerType.toLowerCase() == 'home builder') ?
                  <Link route={`/seller/${this.props.sellerId}`} >
                    <a className="bm-item">
                      <UserPubInfo
                        user={this.props}
                        sellerType={sellerType}
                      />
                    </a>
                  </Link>
                :
                  <UserPubInfo
                    user={this.props}
                    sellerType={sellerType}
                  />
              }
              <h5 className="contact__info contact__agent">
              { this.props.brokerageName && this.props.brokerageName }
              { this.props.sellerDetails && this.props.sellerDetails.length > 0 &&
                <React.Fragment>
                  <br/>
                    <a className="bm-item licence_link" onClick={()=> this.toggleSellerDetails(true)}>
                      License Numbers
                    </a>
                </React.Fragment>
              }
              </h5>
              <Licences
                sellerDetails = {this.props.sellerDetails}
                ShowSellerDetails = {this.state.ShowSellerDetails}
                toggleSellerDetails = {this.toggleSellerDetails}
              />
              <div align="center">
                <Button className="px-3 contact-button" color="primary" onClick={this.props.startChatListing}>Contact {this.props.sellerTypeTBD}</Button>
              </div>
            </Col>
          </div>
        </Row>
        <style jsx>{`
          @import "styled-jsx-helper";
          .licence_link{
            cursor: pointer;
            color: #0F8B96 !important;
          }
        `}</style>
      </div>
    )
  }
}

ContactHomeOwner.propTypes = {
  sellerTypeTBD: PropTypes.string.isRequired,
  icon: PropTypes.string,
  startChatListing: PropTypes.func.isRequired,
  sellerId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  brokerageName: PropTypes.bool.isRequired,
  sellerDetails: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ])
}

export default ContactHomeOwner
