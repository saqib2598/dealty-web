import React from 'react';
import {
  Container,
  Row,
} from 'reactstrap';
import HomeCard from '../home/HomeCard';

const SellerListing = ({homes, sellerListings, onToggleFavorite, isSignedIn}) => {
  return (
    <section >
      <Container>
        <Row className='seller-listings-row'>
          {homes && homes.map((item) =>
            <HomeCard
              key={item.id}
              item={item}
              sellerListings={sellerListings}
              onToggleFavorite={onToggleFavorite}
              isSignedIn={isSignedIn} />)}
        </Row>
      </Container>
    </section>
  );
};
export default SellerListing;
