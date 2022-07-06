import ConfirmNewAddressForm from '../../components/seller/ConfirmNewAddressForm'
import { Router } from '../../routes'
import React from 'react'
import { Form } from 'react-final-form'
import { geocodeByAddress } from 'react-places-autocomplete'
import { connect } from 'react-redux'
import { mapFinalFormErrors } from '../../lib/utils'
import { createListing } from '../../modules/listings'
import { retrieveUser, selectRegistrationAddress, selectUser } from '../../modules/users'
import { retrieveActiveListing, claimListing, verifyClaim } from '../../modules/listings'
import { FORM_ERROR } from 'final-form'
import { keyBy } from  'lodash'
import ClaimListingModal from '../../components/modals/ClaimListingModal'

const mapErrors = mapFinalFormErrors('Failed to confirm address')

const mapDispatchToProps = { selectRegistrationAddress, createListing, retrieveUser, retrieveActiveListing, claimListing, verifyClaim }


const mapStateToProps = (state) => ({
  registrationAddress: selectRegistrationAddress(state),
  user: selectUser(state),
})

class ConfirmNewAddressContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      addressFieldVisible: false,
      wanna_claim: false,
      listing_params: {},
      listing_to_be_claimed: {},
      listing_claimed: false,
      seconds: 0,
      restart: 0,
      verification_code: null,
    }
    this.state = { addressFieldVisible: false,
                  listing: null }
  }

  toggleAddressField = () => {
    this.setState({
      addressFieldVisible: !this.state.addressFieldVisible,
    })
  }

  onSubmit = (values) => {
    const form = document.getElementsByTagName('form')[0]
    const data = new FormData(form)
    const search = data.get('address')
    const { createListing, retrieveUser } = this.props
    let add = values.address
    if (search != ""){
      add = search
    }
    return geocodeByAddress(add)
      .then((results) => {

        const address = results[0].address_components
        const addressObject = keyBy(address, 'types[0]')
        const location = results[0].geometry.location

        if (!(addressObject.street_number &&
          addressObject.route &&
          (addressObject.locality || addressObject.neighborhood) &&
          addressObject.administrative_area_level_1 &&
          addressObject.postal_code
        )) {
          return {[FORM_ERROR]: 'Full street address is required'}
        }

        const params = {
          address:`${addressObject.street_number.short_name} ${addressObject.route.short_name}`,
          address2: values.address2,
          city: addressObject.locality ? addressObject.locality.short_name : addressObject.neighborhood.short_name,
          state: addressObject.administrative_area_level_1.short_name,
          zip: addressObject.postal_code.short_name,
          latitude: location.lat(),
          longitude: location.lng()
        }

        return createListing(params)
          .then((a) => { this.setState({ listing: a}) })
          .then(() => retrieveUser())
          .then(() => Router.pushRoute(`/seller/property/${this.state.listing.id}`))
          .then(() => window.scrollTo(0, 0))
          .catch(mapErrors, this.setParams(params))
      })

  }

  validate = (values) => {
    const errors = {}

    if (values.address && values.address.length === 0) {
      errors.address = 'You must enter an address'
    }

    return errors
  }

  toggleModal = _ => {
    const { claimListing } = this.props
    const { listing_params, wanna_claim } = this.state

    if(!wanna_claim){
      claimListing(listing_params)
        .then((listing) => {
          this.setState({
            listing_to_be_claimed: listing,
            wanna_claim: !wanna_claim,
            seconds: 60000
          })
        })
        .catch(mapErrors)
    } else {
      this.setState({wanna_claim: !wanna_claim})
    }
  }

  resendVerificationCode = _ => {
    const { claimListing } = this.props
    const { listing_params } = this.state

    claimListing(listing_params)
      .then((listing) => {
        this.setState({
          listing_to_be_claimed: listing,
          seconds: 60000,
          restart: this.state.restart+1
        })
      })
      .catch(mapErrors)
  }

  handleErrors = _ => {
  }

  handleTick = _ => {
    this.setState({seconds: this.state.seconds - 1000, restart: this.state.restart+1})
  }

  handleCodeChange = (e) => {
    const { seconds, restart } = this.state
    if(seconds == 1000) {
      this.setState({seconds: 0, restart: restart + 1})
    }
    this.setState({verification_code: e.target.value})
  }

  setParams = (params) => {
    this.setState({listing_params: params})
  }

  verifyClaimToListing = (values) => {
    const { wanna_claim, listing_claimed, seconds, verification_code, restart, listing_to_be_claimed } = this.state
    const { verifyClaim, retrieveUser, retrieveActiveListing } = this.props

    this.setState({seconds: seconds == 1000 ? 0 : seconds, restart: restart+1})

    return verifyClaim(verification_code, listing_to_be_claimed.id)
      .then(() => this.setState({listing_claimed: true}))
      .then(() => retrieveUser())
      .then(() => retrieveActiveListing())
      .then(() => setTimeout(() => {Router.pushRoute(`/seller/property/${this.props.activeListing}`)}, 1500))
      .then(() => window.scrollTo(0, 0))
      .catch(mapErrors)
  }

  render() {
    const { addressFieldVisible, wanna_claim, listing_to_be_claimed, listing_claimed, seconds, restart } = this.state
    const { registrationAddress: { address, address2 } } = this.props

    const initialValues = {
      address: address && address.formatted_address,
      address2: address2,
    }

    return (
      <div>
        <Form
          component={ConfirmNewAddressForm}
          toggleAddressField={this.toggleAddressField}
          addressFieldVisible={addressFieldVisible}
          registrationAddress={address}
          initialValues={initialValues}
          onSubmit={this.onSubmit}
          toggleModal={this.toggleModal}
          validate={this.validate}
        />
        {wanna_claim && listing_to_be_claimed &&
          <ClaimListingModal
            toggleModal={this.toggleModal}
            isOpen={wanna_claim}
            verifyClaimListing={this.verifyClaimToListing}
            listing={listing_to_be_claimed}
            listing_claimed={listing_claimed}
            restart={restart}
            resendCode={this.resendVerificationCode}
            seconds={seconds}
            handleTick={this.handleTick}
            handleChange={this.handleCodeChange}
           />
        }
      </div>
    )
  }
}

ConfirmNewAddressContainer = connect(mapStateToProps, mapDispatchToProps)(ConfirmNewAddressContainer)

export default ConfirmNewAddressContainer
