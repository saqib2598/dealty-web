import React from 'react'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import { mapFinalFormErrors } from '../../lib/utils'
import CommunityInformationForm from '../../components/dashboard/CommunityInformationForm'
import { selectListing, retrieveListing, updateListing } from '../../modules/listings'
import NavigationButtons from '../../components/navigationButtons'
import { selectUser } from '../../modules/users'
import { Router } from '../../routes'
import PropTypes from 'prop-types'

const mapErrors = mapFinalFormErrors('Failed to upload Document')

const mapDispatchToProps = { retrieveListing , updateListing, selectUser }

const mapStateToProps = (state) => ({
  listing: selectListing(state),
  user: selectUser(state)
})

class CommunityInformationContainer extends React.Component {
  state = {
    loading: true,
    success: '',
    deleteSubmitter: false,
    visible: false
  }

  async componentDidMount() {
    const { retrieveListing, propertyId, user } = this.props

    if(this.props.type === 'community_information'){
      if (!user.plan || user.plan.perks.filter(perk => perk.key == 'community_info').length == 0) {
        Router.pushRoute('/dashboard')
      }
    }

    try{
      await retrieveListing(propertyId)
      const { listing } = this.props
      if(!listing.visibility){
        Router.replace('/dashboard')
      }
    } catch (error) {
      this.setState({ loading: false })
      console.log(error)
    }
  }

   closeAlertLater = () => {
    this.setState({ visible: true }, ()=>{
      window.setTimeout(() =>{
        this.setState({ visible: false })
      }, 3000)
    });
  }

  onSubmit = async (values) => {
    const { updateListing, listing, type } = this.props

    try {
      await updateListing(values, listing)
      this.closeAlertLater()
      type == 'description' && setTimeout(()=>{
        Router.pushRoute(`/seller/property/${listing.id}`)
              .then(() => window.scrollTo(0, 0))
      }, 1500)
    }
     catch (error) {
      return mapErrors(error)
    }
  }

  render() {
    const { listing, type } = this.props
    let initialValues;
    if (listing === null) return null

    if (type === 'description'){
      initialValues = {  description: listing &&  listing.description }
    }
    else{
      initialValues = {  community_information: listing &&  listing.communityInformation }
    }

    const nextButtonText = () => {
      if(type == 'description'){
        return listing.description ? 'Next' : 'Skip'
      } else {
        return listing.communityInformation ? 'Next' : 'Skip'
      }
    }

    return (
      <div>
        <Form
          component={CommunityInformationForm}
          onSubmit={this.onSubmit}
          {...this.props}
          visible= {this.state.visible}
          initialValues= {initialValues}
        />
        {listing &&
          <NavigationButtons
            routeNext={`/seller/property/${listing.id}/set-price`}
            nextText={nextButtonText()}
            showNext={type != 'description' && !listing.price}
          />
        }
      </div>
    )
  }
}

CommunityInformationContainer.propTypes = {
  retrieveListing: PropTypes.func.isRequired,
  propertyId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  user: PropTypes.object,
  type: PropTypes.string,
  listing: PropTypes.object,
  updateListing: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityInformationContainer)

