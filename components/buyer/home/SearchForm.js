import React from 'react'
import { Field } from 'react-final-form'
import { Button, Form } from 'reactstrap'
import SearchSvg from '../../images/search'
import AddressAdapter from '../../AddressAdapter' 

const SearchForm = ({ handleSubmit, submitting, onKeyPress }) => (
  <Form onSubmit={handleSubmit} id='Search-places-form'>
    <div className="search__content">
      <span className="search__input-icon">
        <SearchSvg size="12"/>
      </span>
      <Field
        id="search"
        name="search"
        className="form-control"
        type="text"
        label=""
        placeholder='Search by city or zip code...'
        component={AddressAdapter}
        handleSelect={(address)=>{}}
        inputOnKeyPress={onKeyPress}
      />
      <Button
        block
        size="lg"
        color="primary"
        type="submit"
        disabled={submitting}
      >
        <SearchSvg size="21"/>
        <span>Search</span>
      </Button>
    </div>
    <style jsx>{`
      @import "styled-jsx-helper";
      :global(.form-group){
        margin:0px;
        width:100%;
      }
      .search__content :global(.form-group label){
        display:none;
      }
      @include media-breakpoint-up(md) {
        /*  Top Banner Search */
        .search__content{
          display: flex;
          background: $white;
          border-radius: $border-radius;
          padding: 5px;
        }
        .search__content :global(.form-control){
          background: transparent;
          border-radius: 0px;
          border: 0px;
          box-shadow: none;
          color: $grey-650;
        }
        .search__content :global(.form-control):focus{
          box-shadow: none;
          background: transparent;
        }
        .search__content :global(.btn-primary){
          padding: 0px;
          height: 60px;
          margin: 0px 0px 0px 5px;
          width: 60px;
        }
        .search__content span,
        .search__content :global(.search__input-icon){
          display: none;
        }
      }
      @include media-breakpoint-down(sm) {
        .search__content{
          position: relative;
        }
        .search__content :global(.btn-primary svg){
          display: none;
        }
        .search__content :global(.form-control){
          background: $white;
          color: $grey-650;
          padding-left: 35px;
          height: 60px;
        }
        .search__content :global(.btn-lg){
          margin-top: 0px;
        }
        :global(.btn-lg){
          padding: 1rem;
        }
        .search__content :global(.search__input-icon){
          color: $grey-650;
          position: absolute;
          top: $font-size-base;
          z-index: 2;
          left: 15px;
        }
      }
    `}</style>
  </Form>
)

export default SearchForm
