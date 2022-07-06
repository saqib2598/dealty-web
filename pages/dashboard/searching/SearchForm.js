import React from 'react'
import { Field } from 'react-final-form'
import { Button, Form } from 'reactstrap'

import SearchSvg from '../../../components/images/search'
import AddressAdapter from '../../../components/AddressAdapter'

const SearchForm = ({ handleSubmit, submitting, onKeyPress, placeHolder }) => (
  <Form onSubmit={handleSubmit} id="Search-places-form">
    <div
      className={placeHolder ? "search-container-small" : "search-container"}
    >
      {placeHolder && (
        <div className="search-icon-small">
            <SearchSvg size="15" />
          </div>)}
      <Field
        id="search"
        name="search"
        type="text"
        placeholder={
          placeHolder ? placeHolder : "Search by city or zip code..."
        }
        component={AddressAdapter}
        handleSelect={(address) => {}}
        inputOnKeyPress={onKeyPress}
      />
      {!placeHolder && (
        <Button className="search-icon" type="submit">
          <SearchSvg size="21" />
        </Button>
      )}
    </div>
  </Form>
);

export default SearchForm
