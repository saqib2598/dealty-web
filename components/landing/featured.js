import React from 'react';
import {Container, Row} from 'reactstrap';
import PropTypes from 'prop-types';

import HomeCard from '../buyer/home/Home';

const Featured = ({homes}) => (
  <div className='featured-list'>
    <Container>
      <h1>Latest Featured Listing</h1>
      <Row>
        {homes.map((item) => <HomeCard key={item.id} sizes={{ md: 4, lg: 3 }} item={item} />)}
      </Row>
    </Container>
  </div>
);

Featured.propTypes = {
  homes: PropTypes.array,
  onToggleFavorite: PropTypes.func,
};

export default Featured;
