import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ContactSeller = ({ email, phone, startChatListing }) => {
  const [showContactDetails, setContactDetails] = useState(false);
  const onClick = () => setContactDetails(true);
  return (
    <div>
      {showContactDetails ? (
        <ul className='brokerage-contact-fields'>
          <li>
            <FontAwesomeIcon
              icon={faPhoneAlt}
              className='direction-icon'
              style={{
                color: 'black',
              }}
            />
            {phone ? ' ' + phone : ' ***-***-****'}
          </li>
          <li>
            <FontAwesomeIcon
              icon={faEnvelope}
              className='direction-icon'
              style={{
                color: 'black',
              }}
            />
            {email ? ' ' + email : ' ************'}
          </li>
          <li>
            <Button className='contact-builder-btn' onClick={startChatListing}>
              Message
            </Button>
          </li>
        </ul>
      ) : null}
      {!showContactDetails && (
        <Button className='contact-builder-btn' onClick={onClick}>
          Contact Seller
        </Button>
      )}
    </div>
  );
};

const HomeOwner = ({ home, sellerTypeTBD, startChatListing }) => {
  const router = useRouter();
  const handleSellerClick = () => router.replace(`/seller/${home.owner.id}`);

  return (
    <div className='builder-info-block'>
      <>
        <a onClick={handleSellerClick}>
          <div className='builder-image'>
            {home.owner.image ? (
              <img
                className='user-image'
                src={home.owner.image}
                alt='User Icon'
              />
            ) : (
              <img
                className='user-image'
                src='/static/images/user_account_pic.png'
                alt='User Icon'
              />
            )}
          </div>
        </a>
      </>
      <div className='bulider-info'>
        {['agent', 'guest', 'investor', 'home builder'].includes(
          sellerTypeTBD.toLowerCase()
        ) ? (
          <>
            <a onClick={handleSellerClick}>
              <strong className='broker-name'>{`${home.owner.firstName} ${home.owner.lastName}`}</strong>
            </a>
            <p></p>
          </>
        ) : (
          <>
            <h4>
              <strong>{` ${home.owner.lastName}`}</strong>
            </h4>
          </>
        )}
      </div>
      <div className='brokerage-detail'>
        <ul className='brokerage-name-fields'>
          {home.brokerageName && home.mlsId == 0 && (
            <li>({home.brokerageName})</li>
          )}
          {home.listingOffice && <li>({home.listingOffice})</li>}
          {home.mlsId != 0 && <li>MLS # {home.mlsId}</li>}
        </ul>
        <ContactSeller
          email={home.listingAgentEmail}
          phone={home.listingAgentPhone}
          sellerTypeTBD={sellerTypeTBD}
          startChatListing={startChatListing}
        />
      </div>
    </div>
  );
};
HomeOwner.propTypes = {
  home: PropTypes.object.isRequired,
  sellerTypeTBD: PropTypes.string.isRequired,
};

export default HomeOwner;
