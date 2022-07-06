import React from 'react'
import { Router } from '../../routes'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import BuyerInfoForm from '../../components/users/BuyerInfoForm'
import { updateUser } from '../../modules/users'
import PropTypes from 'prop-types'

const mapDispatchToProps = {
  updateUser
}

let AddBuyerInfoContainer = (props) => {
  const onSubmit = async (values)  => {
    const { updateUser } = props
    const { marketedBy, ...others } = values
    const user = {
      buyer_attributes: {
      ...others
      },
      userId: props.userId,
      marketedBy: marketedBy
    }
    await updateUser(user)
    const query = { message: 'Profile Updated Successfully' }
    Router.push({pathname: '/buy', query})
  }

  return (
    <Form
      component={BuyerInfoForm}
      onSubmit={onSubmit}
    />
  )
}

AddBuyerInfoContainer.propTypes = {
  userId: PropTypes.object.isRequired
}

AddBuyerInfoContainer = connect(null, mapDispatchToProps)(AddBuyerInfoContainer)
export default AddBuyerInfoContainer
