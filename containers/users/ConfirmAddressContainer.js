import { Router } from '../../routes'
import React from 'react'
import { Form } from 'react-final-form'
import { geocodeByAddress } from 'react-places-autocomplete'
import { connect } from 'react-redux'
import { mapFinalFormErrors } from '../../lib/utils'
import { createListing } from '../../modules/listings'
import { retrieveUser, selectRegistrationAddress, selectUser } from '../../modules/users'
import { retrieveActiveListing } from '../../modules/listings'
import ConfirmAddressForm from '../../components/users/ConfirmAddressForm'
import { FORM_ERROR } from 'final-form'
import { keyBy } from  'lodash'

const mapErrors = mapFinalFormErrors('Failed to confirm address')

const mapDispatchToProps = { selectRegistrationAddress, createListing, retrieveUser, retrieveActiveListing }

const mapStateToProps = (state) => ({
  registrationAddress: selectRegistrationAddress(state),
  activeListing: state.listings.activeListing,
  user: selectUser(state),
})

class ConfirmAddressContainer extends React.Component {
  constructor() {
    super()
    this.state = { addressFieldVisible: false }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  toggleAddressField = () => {
    this.setState({
      addressFieldVisible: !this.state.addressFieldVisible,
    })
  }

  onSubmit = (values) => {
    const { createListing, retrieveUser, retrieveActiveListing } = this.props

    return geocodeByAddress(values.address)
      .then((results) => {
        const address = results[0].address_components
        const addressObject = keyBy(address, 'types[0]')

        if (!(addressObject.street_number &&
          addressObject.route &&
          addressObject.locality &&
          addressObject.administrative_area_level_1 &&
          addressObject.postal_code
        )) {
          return {[FORM_ERROR]: 'Full street address is required'}
        }

        const params = {
          address:`${addressObject.street_number.short_name} ${addressObject.route.short_name}`,
          address2: values.address2,
          city: addressObject.locality.short_name,
          state: addressObject.administrative_area_level_1.short_name,
          zip: addressObject.postal_code.short_name,
        }

        return createListing(params)
          .then(() => {
            retrieveUser()
          })
          .then(() => retrieveActiveListing())
          .then(() => Router.replaceRoute(`/seller/property/${this.props.activeListing}`))
          .then(() => window.scrollTo(0, 0))
          .catch(mapErrors)
      })

  }

  validate = (values) => {
    const errors = {}

    if (values.address && values.address.length === 0) {
      errors.address = 'You must enter an address'
    }

    return errors
  }

  render() {
    const { addressFieldVisible } = this.state
    const { registrationAddress: { address, address2 } } = this.props

    const initialValues = {
      address: address && address.formatted_address,
      address2: address2,
    }

    return (
      <Form
        component={ConfirmAddressForm}
        toggleAddressField={this.toggleAddressField}
        addressFieldVisible={addressFieldVisible}
        registrationAddress={address}
        initialValues={initialValues}
        onSubmit={this.onSubmit}
        validate={this.validate}
      />
    )
  }
}

ConfirmAddressContainer = connect(mapStateToProps, mapDispatchToProps)(ConfirmAddressContainer)

export default ConfirmAddressContainer
