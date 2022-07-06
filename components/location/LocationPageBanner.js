import React, {Fragment} from 'react';
import {Container, Button} from 'reactstrap';
import SearchForm from '../buyer/home/SearchForm';
import {Form} from 'react-final-form';
import {Router} from '../../routes';

const LocationPageBanner = () => {
  const handleListPropertyClick = () => {
    Router.pushRoute('/seller/add-new-property');
  };

  const handleSearchListClick = () => {
    Router.pushRoute('/buy');
  };

  const onSubmit = () => {
    const form = document.getElementsByTagName('form')[0];
    const data = new FormData(form);
    const search = data.get('search');
    return search ? Router.push(`/buy/homes/listings?place=${search}`) : '';
  };

  const handleKeyPress = (event) => {
    if (event.key == 'Enter') {
      event.target.value &&
        Router.push(`/buy/homes/listings?place=${event.target.value}`);
    }
  };

  return (
    <Fragment>
      <div className="banner">
        <Container>
          <div className="banner-inner">
            <div className="location_caption">
              <h1>Your Personal Real Estate GPS for Buying and Selling Homes</h1>
              <p>Browse through the most comprehensive nation-wide online portal for real estate listings. Updated in real time, our location-wise home directory enables you to navigate across the USA and search for verified property listings in a jiffy.</p>
            </div>
            <div className="search_form_width">
              <Form
                component={SearchForm}
                onSubmit={onSubmit}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
          <div className="btn_area">
            <p>Real Estate made simple for everyone.</p>
            <Button className="btn_list" onClick={handleListPropertyClick}>List PROPERTY</Button>
            <Button className="btn_list" onClick={handleSearchListClick}>SEARCH LISTING</Button>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default LocationPageBanner;
