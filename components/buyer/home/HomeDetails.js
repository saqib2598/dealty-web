import React from 'react';
import PropTypes from 'prop-types';
import Linkify from 'react-linkify';
import Head from 'next/head';
import { Row, Col } from 'reactstrap';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ContactLenderContainer from '../../../containers/buyer/home/ContactLenderContainer';
import ListingMediaContainer from '../../../containers/buyer/home/ListingMediaContainer';
import SendOnlineOfferContainer from '../../../containers/buyer/home/SendOnlineOfferContainer';
import SendAppointmentContainer from '../../../containers/buyer/home/SendAppointmentContainer';
import PrintListingContainer from '../../../containers/buyer/home/PrintListingContainer';
import HomeAddress from '../../../components/listing/HomeAddress';
import HomePrice from '../../../components/listing/HomePrice';
import HomeSocialIcons from '../../listing/HomeSocialIcons';
import HomeInfoList from '../../listing/HomeInfoList';
import HomeMeetings from '../../listing/HomeMeetings';
import { HomeFeatures } from '../../listing/HomeFeatures';
import HomeOwner from '../../listing/HomeOwner';
import HomePriceHistory from '../../listing/HomePriceHistory';
import HomeComparablesMap from '../../listing/HomeComparablesMap';
import HomeComparablesTable from '../../listing/HomeComparablesTable';
import questions from '../../../data/lenderPrequalificationQuestions.json';
import HomeOverview from '../../listing/HomeOverview';
import EmailFlyer from './EmailFlyer';
import { replaceString } from '../../../containers/buyer/home/filters/helpers/utils';

const HomeDetails = ({
  home,
  toggleLenderContact,
  toggleSendOnlineOffer,
  openSendOnlineOffer,
  openLenderMessage,
  sellerTypeTBD,
  handleMarkerClick,
  selectedMarker,
  handleMapClick,
  openSendAppointment,
  toggleSendAppointment,
  startChatListing,
}) => (
  <div className='property-detail'>
    <div className='social-panel-area'>
      <Head>
        <title>
          {`${home.address} ${home.city}, ${home.state} ${home.zip}`} | Dealty{' '}
        </title>
      </Head>
      <Row>
        <Col md={3}>
          <HomeAddress home={home} />
        </Col>
        <Col md={3}>
          <HomePrice home={home} />
        </Col>
        <Col md={6}>
          <HomeSocialIcons home={home} />
        </Col>
      </Row>
      <HomeInfoList home={home} />
    </div>

    <div className='two-columns'>
      <Row>
        <Col md={8} sm={12}>
          <div className='slider'>
            <ListingMediaContainer home={home} />
          </div>
          <div className='description-block'>
            <h2>
              <FontAwesomeIcon
                icon={faInfoCircle}
                className='direction-icon'
                style={{
                  marginRight: '6px',
                }}
              />
              Description
            </h2>
            <Linkify>{home.description}</Linkify>
            {home.source == 'MLS' && home.compliance && (
              <div className='disclaimer-box'>
                {home.compliance.logoUrl && <img src={home.compliance.logoUrl}></img>}
                <p className='disclaimer-text'>{replaceString(home.compliance.copyright, '{current_date_year}', new Date().getFullYear())}</p>
                <p className='disclaimer-text'>
                  {(() => {
                    const disclaimer = home.compliance.disclaimer;
                    const lastUpdated = home.compliance.lastUpdated;
                    switch (home.compliance.title) {
                      case 'armls': return `${disclaimer} ${replaceString(lastUpdated, '{listing_last_updated}', home.lastUpdated && home.lastUpdated.slice(0, 10))}`;
                      case 'tarmls': return replaceString(disclaimer, '{site_owner_office}', 'Dealty, Inc');
                      default: return disclaimer;
                    }
                  })()}
                </p>
              </div>
            )}
          </div>
          <HomeMeetings
            toggleLenderContact={toggleLenderContact}
            toggleSendAppointment={toggleSendAppointment}
            toggleSendOnlineOffer={toggleSendOnlineOffer}
            sellerTypeTBD={sellerTypeTBD}
          />
        </Col>
        <Col md={4} sm={12}>
          <HomeFeatures home={home} />
          <HomeOwner
            home={home}
            sellerTypeTBD={sellerTypeTBD}
            startChatListing={startChatListing}
          />
          <HomeOverview home={home} />
        </Col>
      </Row>
    </div>

    <HomePriceHistory home={home} />

    <hr></hr>

    <HomeComparablesMap
      home={home}
      handleMarkerClick={handleMarkerClick}
      selectedMarker={selectedMarker}
      handleMapClick={handleMapClick}
    />

    <HomeComparablesTable home={home} />

    <SendOnlineOfferContainer
      toggleSendOnlineOffer={toggleSendOnlineOffer}
      openSendOnlineOffer={openSendOnlineOffer}
      home={home}
    />
    <ContactLenderContainer
      toggleLenderContact={toggleLenderContact}
      openLenderMessage={openLenderMessage}
      homeId={home.id}
      questions={questions}
    />
    <SendAppointmentContainer
      toggleSendAppointment={toggleSendAppointment}
      openSendAppointment={openSendAppointment}
      home={home}
    />

    <Row>
      <Col>
        <PrintListingContainer home={home} />
      </Col>
      <Col>
        <EmailFlyer home={home} />
      </Col>
    </Row>
  </div>
);
HomeDetails.propTypes = {
  home: PropTypes.object.isRequired,
  toggleLenderContact: PropTypes.func.isRequired,
  toggleSendOnlineOffer: PropTypes.func.isRequired,
  openSendOnlineOffer: PropTypes.bool.isRequired,
  openLenderMessage: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  sellerTypeTBD: PropTypes.string.isRequired,
  sellerType: PropTypes.string.isRequired,
  handleMarkerClick: PropTypes.func.isRequired,
  selectedMarker: PropTypes.object,
  handleMapClick: PropTypes.func.isRequired,
  sentOffer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  toggleSendAppointment: PropTypes.func.isRequired,
  openSendAppointment: PropTypes.bool.isRequired,
  startChatListing: PropTypes.func.isRequired,
};
export default HomeDetails;
