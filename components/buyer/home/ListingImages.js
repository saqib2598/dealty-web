import React, { useState } from 'react';
import { Row, Col, Modal, ModalHeader } from 'reactstrap';
import { Carousel } from 'react-responsive-carousel';

import '../../../styles/carousel.min.scss';
import GoogleMapImage from '../../GoogleMapImage';
import { ImagesGallery } from '../../modals/ImagesGallery';
import { setImagesStyle } from '../../../components/buyer/home/helpers/ListingsHelper'

const ListingImages = ({ home }) => {
  let listingImages;
  const [imagesModalVisibility, setImageModalVisibility] = useState(false);
  home.mlsImageUrls
    ? (listingImages = [...home.images, ...home.mlsImageUrls])
    : (listingImages = [...home.images]);

  return (
    <>
      <div className='listing-images'>
        <Modal className='images-modal' isOpen={imagesModalVisibility}>
          <ModalHeader toggle={() => setImageModalVisibility(false)} />
          <ImagesGallery listingImages={setImagesStyle(listingImages)} />
        </Modal>
        <Row>
          <Col>
            {listingImages.length > 0 ? (
              <Carousel
                showThumbs={false}
                showArrows={true}
                showStatus={false}
                showIndicators={listingImages.length > 1}
                infiniteLoop={listingImages.length > 1}
                autoPlay={true}
                emulateTouch={true}
              >
                {listingImages.map((item) => {
                  return (
                    <div
                      key={item}
                      onClick={() => setImageModalVisibility(true)}
                    >
                      <img src={item} alt='home image' />
                    </div>
                  );
                })}
              </Carousel>
            ) : (
              <div className='map-image' style={{ height: 567 }}>
                <GoogleMapImage lat={home.latitude} lng={home.longitude} />
              </div>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ListingImages;
