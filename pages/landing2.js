import React, { useState } from 'react';
import { Container } from 'reactstrap';

import Layout from '../components/Layout';
import DealtyServices from '../components/static/DealtyServices';
import DealtyDirectories from '../components/static/DealtyDirectories';
import ReviewContainer from '../containers/review/ReviewContainer';
import FeatureListingsContainer from '../containers/landing/FeatureListingsContainer';
import ListingModal from '../components/landing/ListingModal';
import ModalContainer from '../components/buyer/home/ModalContainer';
import SearchContainer from './dashboard/searching/SearchContainer';
import { CanonicalTag } from '../components/SEO/CanonicalTag';
import { Adsense } from '../components/Ads/Adsense';

const landing = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [searched, setSearch] = useState('');

  const toggleShowModal = () => {
    setShowModal(false);
  };

  return (
    <Layout headerStyle="default" bodyBg="light">
      {
        showModal &&
        <ModalContainer isOpen={showModal} toggle={toggleShowModal}>
          <ListingModal
            searched={searched}
          />
        </ModalContainer>
      }
      <CanonicalTag title='Dealty | Real Estate made simple for everyone'  link='https://yourdealty.com/'/>
      <div className="bg-white">
        <div className="banner banner-1">
          <div className="box">
            <div className='body'>
              <h1>FIND YOUR DREAM HOME</h1>
              <SearchContainer
                setSearch = {setSearch}
                setShowModal = {setShowModal}
              />
            </div>
          </div>
        </div>

        <Container>
          <FeatureListingsContainer />
          <hr />
          <div className="center">
            <h3>Dealty Has Made Real Estate Simple For Everyone</h3>
          </div>
          <DealtyServices />
          <DealtyDirectories />
          <Adsense />
        </Container>

        <ReviewContainer />
      </div>
    </Layout>
  );
};

export default (landing);
