import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Gallery from 'react-photo-gallery';
import Carousel, { ModalGateway, Modal } from 'react-images';

export const ImagesGallery = ({ listingImages }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
  return (
    <>
      <Gallery photos={listingImages} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={listingImages.map((image) => ({
                ...image,
                srcset: image.srcSet,
                caption: image.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </>
  );
};

ImagesGallery.propTypes = {
  listingImages: PropTypes.array.isRequired,
};
