import React from 'react'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import { createAppointment, updateAppointment } from '../../modules/appointments'
import SchedulePhotographerForm from '../../components/dashboard/SchedulePhotographerForm'
import { mapFinalFormErrors } from '../../lib/utils'
import { selectListing, retrieveListing } from '../../modules/listings'
import moment from 'moment'
import { Router } from '../../routes'

const mapErrors = mapFinalFormErrors('Failed to schedule photographer')

const mapDispatchToProps = { createAppointment, updateAppointment, retrieveListing }

const mapStateToProps = (state) => ({
  listing: selectListing(state),
})

class SchedulePhotographerContainer extends React.Component {

  async componentDidMount() {
    const { retrieveListing, propertyId } = this.props

    try{
      await retrieveListing(propertyId)
    } catch (error) {
      console.log(error)
    }
  }

  onSubmit = (values) => {
    const { createAppointment, listing, updateAppointment } = this.props

    const params = {
      ...values,
      appointmentTime: values.appointmentTime.toISOString(),
      listingId: listing.id
    }

    const action = values.id !== undefined ?
      updateAppointment(values.id, params) : createAppointment(listing, params)

    return action
      .then(() => {
        const query = { message: 'Your request so schedule a photographer has been sent successfully' }
        Router.push({pathname: `/seller/property/${listing.id}`, query})
      })
      .then(() => window.scrollTo(0, 0))
      .catch(mapErrors)
  }

  validate = (values) => {
    const errors = {}

    if (!values.appointmentTime) {
      errors.appointmentTime = 'Appointment date is required'
    }

    return errors
  }

  render() {
    const { listing } = this.props

    let initialValues = {}

    if (listing === null) return null

    if (listing.appointment) {
      initialValues = {
        ...listing.appointment,
        appointmentTime: moment(listing.appointment.appointmentTime)
      }
    }

    return (
      <Form
        component={SchedulePhotographerForm}
        onSubmit={this.onSubmit}
        validate={this.validate}
        initialValues={initialValues}
        {...this.props}
      />
    )
  }
}

SchedulePhotographerContainer = connect(mapStateToProps, mapDispatchToProps)(SchedulePhotographerContainer)

export default SchedulePhotographerContainer
