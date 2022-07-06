import Head from "next/head";
import React from "react";
import { connect } from "react-redux";
import { Router } from "../../../routes";
import { Container } from "reactstrap";
import Layout from "../../../components/Layout";
import HomeDetails from "../../../components/buyer/home/HomeDetails";
import Loading from "../../../components/Loading";
import {
  retrieveHome,
  selectHome,
  toggleFavorite,
  setHome,
} from "../../../modules/homes";
import { humanize } from "../../../components/HumanizeText";
import PropTypes from "prop-types";
import fetch from "isomorphic-fetch";
import { requireEnvVar } from "../../../lib/utils";
import { retrieveOffers } from "../../../modules/offers";
import { isSignedIn as hasCredentials } from "../../../lib/session";
import { createChatRoom } from "../../../modules/chatRooms";
import { createLeadContact } from "../../../modules/leadContact";
import UnSignedInUser from "../../../components/UnSignedInUser";
import ModalContainer from "../../../components/buyer/home/ModalContainer";
import ModalContact from "../../../components/buyer/home/ModalContact";
import ModalContent from "../../../components/buyer/home/ModalContent";
import ModalSuccess from "../../../components/buyer/home/ModalSuccess";
import getConfig from "next/config";
import { camelizeKeys } from "humps";
import nextCookie from "next-cookies";
import { isMobile } from "react-device-detect";
import { createParams } from "../../../components/buyer/home/helpers/ListingsHelper";
import { checkChatRooms } from "../../../components/buyer/home/helpers/ListingsHelper";

const mapDispatchToProps = {
  retrieveHome,
  toggleFavorite,
  retrieveOffers,
  createChatRoom,
  setHome,
  createLeadContact,
};

const mapStateToProps = (state) => ({
  isSignedIn: hasCredentials(state),
  home: selectHome(state),
  offers: state.offers.offers,
  chat_rooms: state.chatRooms.chat_rooms,
});

const { publicRuntimeConfig } = getConfig();
class HomeDetail extends React.PureComponent {
  state = {
    loading: true,
    openLenderMessage: false,
    openSendAppointment: false,
    openSendOnlineOffer: false,
    chatOpenSignIn: false,
    contactOpenLead: false,
    successOpen: false,
    selectedMarker: null,
    submitting: true,
    captchaNotCleared: true,
    siteToken: publicRuntimeConfig.recaptchaSite,
    agent: "desktop",
  };

  async componentDidMount() {
    const { data, retrieveHome, id, retrieveOffers, setHome } = this.props;

    if (isMobile) {
      this.state.agent = "mobile";
    }
    try {
      const { isSignedIn } = this.props;
      if (data) {
        setHome(camelizeKeys(data));
      } else {
        await retrieveHome(id, this.state.agent);
      }
      if (isSignedIn) {
        retrieveOffers("type=sent");
      }
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
  }

  toggleLenderContact = () => {
    this.setState((prevState) => ({
      openLenderMessage: !prevState.openLenderMessage,
    }));
  };

  toggleSendOnlineOffer = () => {
    this.setState((prevState) => ({
      openSendOnlineOffer: !prevState.openSendOnlineOffer,
    }));
  };

  toggleSendAppointment = () => {
    this.setState((prevState) => ({
      openSendAppointment: !prevState.openSendAppointment,
    }));
  };

  toggleChatOpenSignIn = () => {
    this.setState((prevState) => ({
      chatOpenSignIn: !prevState.chatOpenSignIn,
    }));
  };

  toggleChatOpenLead = () => {
    this.setState((prevState) => ({
      contactOpenLead: !prevState.contactOpenLead,
    }));
  };

  toggleSuccessOpen = () => {
    this.setState((prevState) => ({
      successOpen: !prevState.successOpen,
    }));
  };

  handleToggleFavorite = () => {
    const { home, toggleFavorite } = this.props;
    toggleFavorite(home.id);
  };

  handleMarkerClick = (marker) => {
    this.setState({ selectedMarker: marker });
  };

  handleMapClick = () => {
    this.setState({ selectedMarker: null });
  };

  handleModalSubmit = async (e) => {
    e.preventDefault();
    this.toggleChatOpenLead();
    this.toggleSuccessOpen();
    const { createLeadContact, home } = this.props;
    await createLeadContact(createParams({event: e, email: home.owner.email, address: home.address}));
  };

  chatCreated = (chat_rooms, home) => {
    chat_rooms.map((room) => {
      if (home.owner.id == room.ownerId) {
        return true;
      }
    });
  };

  startChatListing = () => {
    const { createChatRoom, home, isSignedIn, chat_rooms } = this.props;
    if (isSignedIn) {
      const [flag, finalRoom] = checkChatRooms(chat_rooms, home);
      if (flag || home.userRoomId != null) {
        window.location.href = `/inbox?id=${
          home.userRoomId == null ? finalRoom.id : home.userRoomId
        }`;
      } else {
        createChatRoom(home.id, null).then(() => {
           window.location.href = '/inbox'
        });
      }
    } else {
      this.toggleChatOpenLead();
    }
  };

  createTitleMeta = (address, city, state, zip) => {
    let str = address;
    if (city != null) {
      str = str.concat(" ", city, ",");
    }
    if (state != null) {
      str = str.concat(" ", state);
    }
    if (zip != null) {
      str = str.concat(" ", zip);
    }
    return str;
  };

  createDescMeta = (sqft, price, bedrooms, bathrooms) => {
    let str = "Sqft: " + sqft + " | Price: $" + price;
    if (bedrooms > 0) {
      str = str.concat(" | Bed: ", bedrooms);
    }
    if (bathrooms > 0) {
      str = str.concat(" | Bath: ", bathrooms);
    }
    return str;
  };

  createImageMeta = (url) => {
    const { publicRuntimeConfig } = getConfig();
    let ImageUrl = url;
    if (ImageUrl == undefined) {
      ImageUrl = `${publicRuntimeConfig.primaryDomain}/static/images/dealty-home.jpg`;
    }
    return ImageUrl;
  };

  render() {
    const { home, data, offers } = this.props;
    const homeDetail = data ? camelizeKeys(data) : home;
    const sentOffer = offers.filter(
      (offer) => offer.listingId == homeDetail.id
    )[0];
    const {
      loading,
      openLenderMessage,
      openSendOnlineOffer,
      selectedMarker,
      openSendAppointment,
      chatOpenSignIn,
      contactOpenLead,
      successOpen,
      captchaNotCleared,
      siteToken,
    } = this.state;
    let seller_type = "Homeowner";
    let homeData = null;
    let homeTitle;
    let homeDesc;
    let ImageUrl;
    if (data) {
      homeData = {
        title: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
        sqft: data.sqft,
        ImageUrl: data.images[0],
        price: data.price,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
      };
      homeTitle = this.createTitleMeta(
        homeData.title,
        homeData.city,
        homeData.state,
        homeData.zip
      );
      homeDesc = this.createDescMeta(
        homeData.sqft,
        homeData.price,
        homeData.bedrooms,
        homeData.bathrooms
      );
      ImageUrl = this.createImageMeta(homeData.ImageUrl);
    }
    if (homeDetail && homeDetail.owner && homeDetail.owner.seller) {
      if (homeDetail.owner.seller.sellerType) {
        seller_type = homeDetail.owner.seller.sellerType;
      } else if (homeDetail.owner.plan) {
        seller_type = homeDetail.owner.plan.nickname;
      }
    }

    return (
      <div className='property-detail'>
        {data && (
          <Head>
            <title>{homeTitle}</title>
            <meta name='title' content={homeTitle} />
            <meta name='description' content={homeDesc} />
            <meta name='keywords' content={homeData.title} />
            <meta property='og:title' content={homeTitle} />
            <meta property='og:image' content={ImageUrl} />
            <meta property='og:image:secure_url' content={ImageUrl} />
            <meta property='og:image:width' content='640' />
            <meta property='og:image:height' content='442' />
            <meta property='og:description' content={homeDesc} />
          </Head>
        )}
        {loading ? (
          <Loading />
        ) : (
          <Layout
            isBuyer={true}
            headerStyle='default'
            bodyBg='grey'
            footerStyle='white'
          >
            <ModalContainer
              isOpen={chatOpenSignIn}
              toggle={this.toggleChatOpenSignIn}
            >
              <h4 className='modal-heading'>Chat</h4>
              <UnSignedInUser />
            </ModalContainer>
            <ModalSuccess
              isOpen={successOpen}
              toggle={this.toggleSuccessOpen}
              home={home && home}
            />
            <ModalContact
              isOpen={contactOpenLead}
              toggle={this.toggleChatOpenLead}
            >
              <ModalContent
                home={home}
                handleModalSubmit={this.handleModalSubmit}
                captchaNotCleared={captchaNotCleared}
                siteToken={siteToken}
              />
            </ModalContact>
            <Container>
              <HomeDetails
                openLenderMessage={openLenderMessage}
                toggleLenderContact={this.toggleLenderContact}
                home={home}
                sellerTypeTBD={
                  seller_type === "Home Builder"
                    ? seller_type
                    : humanize(seller_type)
                }
                onToggleFavorite={this.handleToggleFavorite}
                openSendOnlineOffer={openSendOnlineOffer}
                toggleSendOnlineOffer={this.toggleSendOnlineOffer}
                sellerType={seller_type}
                selectedMarker={selectedMarker}
                handleMarkerClick={this.handleMarkerClick}
                handleMapClick={this.handleMapClick}
                sentOffer={sentOffer}
                openSendAppointment={openSendAppointment}
                toggleSendAppointment={this.toggleSendAppointment}
                startChatListing={this.startChatListing}
              />
            </Container>
          </Layout>
        )}
      </div>
    );
  }
}

HomeDetail.getInitialProps = async (ctx) => {
  const { query } = ctx;
  let data = null;

  try {
    const auth_headers = nextCookie(ctx).auth_headers;
    const apiUrl = requireEnvVar("API_SERVER");
    const res = await fetch(`${apiUrl}/api/v1/listings/${query.id}`, {
      headers: auth_headers,
      agent: this.state.agent,
    });
    data = await res.json();
  } catch {
    data = null;
  }
  let props = {
    id: query.id,
    data: data,
  };
  return props;
};

HomeDetail.propTypes = {
  retrieveHome: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  home: PropTypes.object,
  toggleFavorite: PropTypes.func.isRequired,
  retrieveOffers: PropTypes.func.isRequired,
  offers: PropTypes.array,
  data: PropTypes.object,
  isSignedIn: PropTypes.bool.isRequired,
  createChatRoom: PropTypes.func.isRequired,
  setHome: PropTypes.func.isRequired,
  createLeadContact: PropTypes.func.isRequired,
  chat_room: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeDetail);
