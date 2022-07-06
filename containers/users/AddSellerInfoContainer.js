import React from 'react'
import { Router } from '../../routes'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import { updateSeller } from '../../modules/users'
import PropTypes from 'prop-types'
import SellerInfoForm from '../../components/users/SellerInfoForm'

const mapDispatchToProps = {
  updateSeller
}

let AddSellerInfoContainer = (props) => {

  const onSubmit = async (values)  => {
    const { updateSeller } = props
    const user = {
      seller_attributes: {
      ...values
      },
      user_id: props.userId
    }
    await updateSeller(user)
    window.location.href = `/dashboard`;
  }

  return (
    <Form
      component={SellerInfoForm}
      onSubmit={onSubmit}
    />
  )
}

AddSellerInfoContainer.propTypes = {
  userId: PropTypes.object.isRequired
}

AddSellerInfoContainer = connect(null, mapDispatchToProps)(AddSellerInfoContainer)
export default AddSellerInfoContainer
