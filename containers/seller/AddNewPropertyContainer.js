import React from 'react'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import AddressForm from '../../components/seller/AddressForm'
import { mapFinalFormErrors } from '../../lib/utils'
import { updateRegistrationAddress } from '../../modules/users'
import { Router } from '../../routes'
import { geocodeByAddress } from 'react-places-autocomplete'
const mapErrors = mapFinalFormErrors('Failed to create account')
const mapDispatchToProps = { updateRegistrationAddress }
const mapStateToProps = (state) => ({
  user: state.users.me.seller
})
class AddNewPropertyContainer extends React.Component {
  state = {
    address: null,
    address2: null,
    error: null
  }
  handleSelect = (add) => {
    this.setState({address: add})
  }
  handleAddChange = (e) => {
    this.setState({address2: e.target.value})
  }
  onSubmit = () => {
  }
  onClick = () => {
    const { updateRegistrationAddress } = this.props
    const { address, address2} = this.state
    if (address){
      this.setState({error:null})
      return geocodeByAddress(address)
        .then(results => {
          updateRegistrationAddress(results[0], address2)
        })
        .then(() => Router.pushRoute('seller/confirm-address'))
        .then(() => window.scrollTo(0, 0))
        .catch(mapErrors)
    } else {
      this.setState({error:'You must enter the address'})
    }
  }
  render() {
    const { error, address2 } = this.state
    const { user } = this.props
    console.log(this.props.user)
    return(
      user ?
        <Form
        component={AddressForm}
        onSubmit={this.onSubmit}
        validate={this.validate}
        onClick={this.onClick}
        handleChange={this.handleAddChange}
        handleSelect={this.handleSelect}
        address2={address2}
        err={error}
        /> :
        <div>
          <h5>Please, Sign up/Sign in as Seller to add a Listing.
          </h5>
        </div>
    )
  }
}
AddNewPropertyContainer = connect(mapStateToProps, mapDispatchToProps)(AddNewPropertyContainer)
export default AddNewPropertyContainer