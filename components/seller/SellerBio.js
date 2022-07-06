import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Col, Row} from 'reactstrap';
import UserImage from '../UserImage';
import FacebookSvg from '../images/facebook';
import InstagramSvg from '../images/instagram';
import {Link} from '../../routes';
import PropTypes from 'prop-types';
import FormatPhone from '../../components/FormatPhone';
import MediaQuery from 'react-responsive';
import {Button} from 'reactstrap';
import {createChatRoom} from '../../modules/chatRooms';
import {createLeadContact} from '../../modules/leadContact';
import ModalContent from '../buyer/home/ModalContent';
import ModalContact from '../buyer/home/ModalContact';
import getConfig from 'next/config';
import {createParams} from '../buyer/home/helpers/ListingsHelper';
import {checkChatRooms} from '../buyer/home/helpers/ListingsHelper';
import ModalSuccess from '../buyer/home/ModalSuccess';

const {publicRuntimeConfig} = getConfig();
const mapDispatchToProps = {
  createChatRoom,
  createLeadContact,
};

const mapStateToProps = (state) => ({
  chatRooms: state.chatRooms.chat_rooms,
});

const SellerBio = ({createChatRoom, createLeadContact, isSignedIn, user, chatRooms, home}) => {
  const [contactOpenLead, setContactOpenLead] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const startChatListing = () => {
    if (isSignedIn) {
      const [flag, finalRoom] = checkChatRooms(chatRooms, user);
      if (flag) {
        window.location.href = `/inbox?id=${finalRoom.id}`;
      } else {
        createChatRoom(user.seller.listings[0].id, null).then(() => {
          window.location.href = '/inbox';
        });
      }
    } else {
      setContactOpenLead(true);
    }
  };

  const handleModalSubmit = (event) => {
    event.preventDefault();
    setSuccessOpen(true);
    setContactOpenLead(false);
    createLeadContact(createParams({event: event, email: user.email, name: user.firstName}));
  };
  return (
    <Row className="main-seller-container">
      <Col>
        <UserImage img={user && user.image}/>
        <h5 className="h5 contact__name"> {user.firstName} {user.lastName} </h5>
        {
          user.seller && ['guest', 'agent'].includes(user.seller.sellerType) &&
            <h5 className="h5  seller-name">{user.seller && user.seller.brokerageName}</h5>
        }
        <h5 className="contact__info contact__agent">
          <MediaQuery maxWidth={767}>
            <a href={'tel:' + user.phone}>{ FormatPhone(user.phone) }</a>
          </MediaQuery>
          <MediaQuery minWidth={768}>
            { FormatPhone(user.phone) }
          </MediaQuery>
        </h5>
        <h5 className="contact__info contact__agent">
          <a href={'mailto:' + user.email}>{ user.email }</a>
        </h5>
        <Button className="contact-builder-btn" onClick={startChatListing}>
          Message {user.firstName} {user.lastName}
        </Button>
        <div>
          <h5 className="contact__message">
            {user.seller && user.seller.bio}
          </h5>
        </div>
      </Col>
      {
        Object.keys(user).length ? (
          <ModalSuccess
            isOpen={successOpen}
            toggle={() => setSuccessOpen(!successOpen)}
            user={user}
          />
        ) : null
      }
      <ModalContact
        isOpen={contactOpenLead}
        toggle={() => setContactOpenLead(!contactOpenLead)}
      >
        <ModalContent
          home={home}
          user={user}
          handleModalSubmit={handleModalSubmit}
          captchaNotCleared={true}
          siteToken={publicRuntimeConfig.recaptchaSite}
        />
      </ModalContact>
    </Row>
  );
};

SellerBio.propTypes = {
  user: PropTypes.object.isRequired,
  createChatRoom: PropTypes.func.isRequired,
  createLeadContact: PropTypes.func.isRequired,
  isSignedIn: PropTypes.func.isRequired,
  chatRooms: PropTypes.object.isRequired,
  home: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(SellerBio);
