import SetPriceForm from '../../components/dashboard/SetPriceForm'
import { mapFinalFormErrors } from '../../lib/utils'
import { retrieveListing, selectListing, updateListing } from '../../modules/listings'
import { Router } from '../../routes'
import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-final-form'
import EstimatedPriceBar from '../../components/EstimatedPriceBar'
import { AddressSection } from '../../components/EstPriceContainerComps'
import PropTypes from 'prop-types'

const mapErrors = mapFinalFormErrors('Failed to submit price')

const mapDispatchToProps = { updateListing, retrieveListing }

const mapStateToProps = (state) => ({
  listing: selectListing(state)
})

let SetPriceContainer = class SetPriceContainer extends React.Component {
  constructor() {
    super()
    this.state = { setPriceModalVisible: false }
  }

  toggleSetPriceModal = () => {
    this.setState({
      setPriceModalVisible: !this.state.setPriceModalVisible,
    })
  }

  async componentDidMount() {
    const { retrieveListing, propertyId } = this.props

    try{
      await retrieveListing(propertyId)
    } catch (error) {
      console.log(error)
    }
  }

  onSubmit = (values) => {
    const { updateListing, listing } = this.props

    return updateListing(values, listing)
      .then(() => this.toggleSetPriceModal())
      .then(() => Router.pushRoute(`/seller/property/${listing.id}/listing-pending`))
      .then(() => window.scrollTo(0, 0))
      .catch(mapErrors)
  }

  handleKeyPress = event => {
    const reg = /^\d+$/;
    if (!reg.test(event.key)) {
      event.preventDefault();
    }
  }

  validate = (values) => {
    const errors = {}

    if (values.price && values.price.length === 0) {
      errors.price = 'You must enter a price'
    }

    return errors
  }

  render() {
    const { listing } = this.props
    const { setPriceModalVisible } = this.state

    if (listing === null) return null

    const initialValues = {
      price: listing.price || '',
    }

    return (
      <>
        {listing.valuationFlag &&
          <div style={{width: 'max-content', textAlign: 'center', margin: 'auto'}}>
            <AddressSection listing={listing} />
            <EstimatedPriceBar listing={listing} />
          </div>
        }
        <Form
          component={SetPriceForm}
          initialValues={initialValues}
          toggleSetPriceModal={this.toggleSetPriceModal}
          onSubmit={this.onSubmit}
          setPriceModalVisible={setPriceModalVisible}
          validate={this.validate}
          handleKeyPress={this.handleKeyPress}
          {...this.props}
        />
      </>
    )
  }
}

SetPriceContainer.propTypes = {
  retrieveListing: PropTypes.func.isRequired,
  propertyId: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
              ]).isRequired,
  updateListing: PropTypes.func.isRequired,
  listing: PropTypes.object,
}

SetPriceContainer = connect(mapStateToProps, mapDispatchToProps)(SetPriceContainer)

export default SetPriceContainer
