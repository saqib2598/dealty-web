import React, { Fragment } from 'react';
import Skeleton from 'react-loading-skeleton';
import { FaStar } from '@react-icons/all-files/fa/FaStar';
import PropTypes from 'prop-types';
import router from 'next/router';
import { Col, Card, CardImg, CardText, CardBody, Row } from 'reactstrap';
import { Carousel } from 'react-responsive-carousel';

import GoogleMapImage from '../GoogleMapImage';
import '../../styles/carousel.min.scss';
import CapitalizeText from '../CapitalizeText';
import { getColSize } from '../buyer/home/helpers/ListingsHelper';
import { isShowBanner, calculateDate } from '../../containers/buyer/home/filters/helpers/utils'

const HomeCardSkeleton = () => {
  return (
    <Fragment>
      <div className='tag-box'>
        <Skeleton width={'20%'} height={'20px'} count={1} />
      </div>
      <div className='slider-img'>
        <Skeleton width={'100%'} height={'170px'} count={1} />
      </div>
      <CardBody>
        <Row>
          <Col className='col-md-9 card-body-row'>
            <div className='card__content'>
              <Skeleton width={'40%'} count={1} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className='col-md-9 card-body-row'>
            <div className='card__content'>
              <Skeleton width={'40%'} count={1} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className='col-md-9 card-body-row'>
            <div className='card__content'>
              <Skeleton width={'40%'} count={1} />
            </div>
          </Col>
        </Row>
      </CardBody>
    </Fragment>
  );
};

const Feature = ({ title, value }) => {
  return (
    <Col className='home-feature' sm='auto'>
      <div className='home-feature-value'>{value}</div>
      <div className='home-feature-title'>{title}</div>
    </Col>
  );
};

const Image = ({ image }) => {
  return (
    <CardImg
      top
      width='100%'
      height='200px'
      src={image}
      alt='home image'
    />
  );
};

const PendingTag = ({ status }) => {
  return (
    <div className='ribbon-wrapper'>
      <div className='ribbon'>
        <CapitalizeText text={status} />
      </div>
    </div>
  );
};

const FeaturedItem = ({ image }) => {
  return (
    <Fragment>
      <div className='featured'>
        Featured <FaStar className='star' />{' '}
      </div>
      <div className='featued-image'>
        <Image image={image} />
      </div>
    </Fragment>
  );
};

const AdItem = ({ image }) => {
  return (
    <Fragment>
      <div className='ad'>
        <p>Ad</p>
      </div>
      <div className='image-ad'>
        <Image image={image} />
      </div>
    </Fragment>
  );
};

const HomeItem = ({ image, status }) => {
  return (
    <Fragment>
      <Image image={image} />
      {status === 'pending' && <PendingTag status={status} />}
    </Fragment>
  );
};

const MapImage = ({ item }) => {
  return (
    <div className='map-image' style={{ height: 200 }}>
      <GoogleMapImage lat={item.latitude} lng={item.longitude} />
      {item.status === 'pending' && <PendingTag status={item.status} />}
    </div>
  );
};

const HourBanner = ({ image, createdAt }) => {
  const [absoluteDate, hours, minutes] = calculateDate(createdAt)
  return (
    <Fragment>
      <div className='hour'>
       { hours === 0 ? <p>{minutes} minutes ago</p> : <p>{hours} hours ago</p> }
      </div>
      <div className='image-ad'>
        <Image image={image} />
      </div>
    </Fragment>
  );
};

const CarouselImage = ({ item }) => {
  const image = item.images[0];
  const createdAt = item.createdAt;
  return (
    <Carousel
      showThumbs={false}
      showArrows={true}
      showStatus={false}
      showIndicators={item.images.length > 1}
      infiniteLoop={item.images.length > 1}
      autoPlay={false}
      emulateTouch={true}
    >
      <div className='slider-img'>
        {item.featured ? <FeaturedItem image={image} /> :
          item.ad ? <AdItem image={image} /> :
          item.featured === false && item.status === 'active' && isShowBanner(createdAt) ? <HourBanner image={image} createdAt={createdAt} /> :
          <HomeItem image={image} status={item.status} />}
      </div>
    </Carousel>
  );
};

const HomeCard = ({
  item,
  loading,
  showMap,
  isMapItem,
  isHomeListing,
}) => {
  const onClick = () => {
    router.push(`/buy/home/${item.id}`);
  };

  return (
    <div
      className={isMapItem ? 'disable-hover' :`col-sm-6 col-xs-12 ${showMap ? `col-md-${getColSize()}` : isHomeListing ? 'col-lg-3' : 'col-lg-4'}`}
    >
      <Card onClick={onClick} className={`home-listing-card ${showMap ? 'home-card' : 'home-card-no-map'}`}>
        {loading ? <HomeCardSkeleton /> : (
          <Fragment>
            {item.images && item.images.length ? <CarouselImage item={item} /> : <MapImage item={item} />}
            <CardBody className='features-wrap'>
              <div className='features-main-row'>
                <div className='feature-price-col'>
                  <div className='home-price'>
                    {item.price === null ? 'Rental' : '$'+item.price.toLocaleString()}
                  </div>
                  <CardText className='home-address'>
                    {`${item.address} ${item.address2 ? item.address2 : ''}`}
                    <br />
                    {`${item.city}, ${item.state} ${item.zip}`}
                    <br />
                  </CardText>
                </div>
                <div className='feature-col'>
                  <div className='features-row'>
                    <Feature
                      title='Beds'
                      value={item.bedrooms == null ? '0' : item.bedrooms}
                    />
                    <Feature
                      title='Baths'
                      value={`${item.bathrooms == null ? '0' : item.bathrooms
                        }${item.halfBaths > 0 ? '.5' : ''}`}
                    />
                    <Feature
                      title='Sqft'
                      value={item.sqft == null ? '0' : item.sqft.toLocaleString()}
                    />
                  </div>
                </div>
              </div>
            </CardBody>
          </Fragment>
        )}
      </Card>
    </div>
  );
};

HomeCard.propTypes = {
  item: PropTypes.array,
  sizes: PropTypes.array,
  onDeleteFavorite: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  colClasses: PropTypes.object,
  cardClasses: PropTypes.object,
  sellerListings: PropTypes.array,
  favoriteListings: PropTypes.array,
  loading: PropTypes.bool,
  onToggleFavorite: PropTypes.func,
  isOtherHome: PropTypes.bool,
  isSignedIn: PropTypes.bool,
  dealtyListings: PropTypes.bool,
  showMap: PropTypes.bool,
  isMapItem: PropTypes.bool,
  isHomeListing: PropTypes.bool,
};
FeaturedItem.propTypes = {
  image: PropTypes.string.isRequired,
};
AdItem.propTypes = {
  image: PropTypes.string.isRequired,
};
HomeItem.propTypes = {
  image: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
MapImage.propTypes = {
  item: PropTypes.object.isRequired,
};
CarouselImage.propTypes = {
  item: PropTypes.object.isRequired,
};
Image.propTypes = {
  image: PropTypes.string.isRequired,
};
Feature.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
PendingTag.propTypes = {
  status: PropTypes.string.isRequired,
};
HourBanner.propTypes = {
  image: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default HomeCard;
