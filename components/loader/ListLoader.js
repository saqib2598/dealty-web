import React from 'react';
import { Row, Col } from 'reactstrap';
import Skeleton from 'react-loading-skeleton';

import HomeCard from '../home/HomeCard';
import { SiteFooter } from '../Footer';

const ListLoader = (loading, showMap) => (
  <Row className='home-row'>
    <Col xs='6' className='home-map-position'>
      <Skeleton width={'100%'} height={'900px'} count={1} />
    </Col>
    <Col lg='6' xs='12' className='position-left'>
      <div className='home-listings-container'>
        <Row className='home-list-details'>
          <Col sm='9' className='list-content'>
            <h5 className='list__title'>
              <Skeleton height={'30px'} width={'40%'} count={1} />
            </h5>
            <p className='list__details'>
              <span><Skeleton width={'40%'} count={1} /></span>
            </p>
          </Col>
          <Col sm='3' className='list-content'>
            <h5 className='list__title'>{<Skeleton height={'30px'} width={'160px'} count={1} />}</h5>
          </Col>
          <Col sm='12'>
            <hr />
          </Col>
        </Row>
        <Row className='feature-homes'>
          {[...Array(20)].map((i) => (
            <HomeCard loading={loading} dealtyListings={true} key={i} showMap={showMap} />
          ))}
          <SiteFooter />
        </Row>
      </div>
    </Col>
  </Row>
);

export default ListLoader;
