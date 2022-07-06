import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-final-form';
import { geocodeByAddress } from 'react-places-autocomplete';

import SearchForm from './SearchForm';
import { Router } from '../../../routes';
import { retrieveSingleListing } from '../../../modules/listings';
import { searchedSingleListing } from '../../../modules/listings';
import ModalContainer from '../../../components/buyer/home/ModalContainer';
import ListingModal from '../../../components/landing/ListingModal';
import { defaultFilter } from '../../../static/data/constants';

const SearchContainer = ({
  retrieveSingleListing,
  searchedSingleListing,
  placeHolder,
  filter,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [searched, setSearch] = useState('');

  const toggleShowModal = () => {
    setShowModal(false);
  };

  const onSubmit = async () => {
    const form = document.getElementsByTagName('form')[0];
    const data = new FormData(form);
    const search = data.get('search');
    setSearch(search);
    handleAllSubmissions(search);
  };

  const handleKeyPress = async (event) => {
    if (event.key == 'Enter') {
      if (event.target.value != null && event.target.value != undefined) {
        const search = event.target.value;
        setSearch(search);
        handleAllSubmissions(search);
      }
    }
  };

  const getLatLng = async (address) => {
    let address1 = address;
    let complete_address = address;
    await geocodeByAddress(address)
      .then((results) => {
        complete_address = results[0].formatted_address;
        address1 = address;
      })
      .catch(() => {
        address.length && setShowModal(true);
      });
    return { complete_add: complete_address, address1: address1 };
  };

  const openSearchedQuery = (address) => {
    if (searchedSingleListing && searchedSingleListing.listings.length == 1) {
      Router.push(
        `/buy/home/${
          searchedSingleListing.listings &&
          searchedSingleListing.listings[0].friendlyId
        }`
      );
    } else {
      setShowModal(true);
    }
  };

  const handleAllSubmissions = async (search) => {
    try {
      await getLatLng(search).then((results) => {
        const address_check = results.complete_add.split(',');
        const address = results.complete_add;
        if (address_check[2].trim() === 'USA') {
          Router.push(`/buy/homes/listings?place=${address}&status=active&listingType=${filter || defaultFilter}`);
        } else {
          retrieveSingleListing(address);
          openSearchedQuery(address);
        }
      });
    } catch (error) {
      setShowModal(true);
    }
  };

  return (
    <div className='search_form'>
      {showModal && (
        <ModalContainer isOpen={showModal} toggle={toggleShowModal}>
          <ListingModal searched={searched} />
        </ModalContainer>
      )}
      <Form
        component={SearchForm}
        placeHolder = {placeHolder}
        onSubmit={onSubmit}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

const mapDispatchToProps = {retrieveSingleListing}
const mapStateToProps = (state) => ({
  searchedSingleListing: searchedSingleListing(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
