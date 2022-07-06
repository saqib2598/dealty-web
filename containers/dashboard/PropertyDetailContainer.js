import { withRouter } from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import { Alert, Container } from 'reactstrap'
import DashboardBlock from '../../components/dashboard/DashboardBlock'
import FactSlider from '../../components/dashboard/FactSlider'
import HomeValue from '../../components/dashboard/HomeValue'
import ImagesBlock from '../../components/dashboard/ImagesBlock'
import DocumentsBlock from '../../components/dashboard/DocumentsBlock'
import CommunityInformationBlock from '../../components/dashboard/CommunityInformationBlock'
import OpenHouseDatesBlock from '../../components/dashboard/OpenHouseDatesBlock'
import DeleteBlock from '../../components/dashboard/DeleteBlock'
import LoadingSM from '../../components/LoadingSM'
import { retrieveListing, selectListing, deleteListing, updateListing } from '../../modules/listings'
import { Link , Router} from '../../routes'
import { selectUser } from '../../modules/users'
import homeInfoQuestions from '../../data/homeInfoQuestions.json'
import otherHomeUpdatesQuestions from '../../data/otherHomeUpdates.json'
import personalOpinionQuestions from '../../data/personalOpinion.json'
import { mapFinalFormErrors } from '../../lib/utils'
import FSRecordVars from '../../components/RecordFullStory'
import ListingButton from '../../components/ListingButton'
import PropTypes from 'prop-types'
import UpdateAccountModal from '../../components/modals/UpdateAccount'
import DeleteListingModal from '../../components/modals/DeleteListing'
import UpdateListingStatusModal from '../../components/modals/UpdateListingStatus'

const mapErrors = mapFinalFormErrors('Failed to upload photo')

const mapDispatchToProps = { retrieveListing, deleteListing, updateListing }

const mapStateToProps = (state) => ({
  listing: selectListing(state),
  user: selectUser(state),
})

let PropertyContainer = class PropertyContainer extends React.Component {
  state = {
    loading: true,
    updateAccountModalVisible: true,
    deleteListingModalVisible: false,
    updateListingStatusModalVisible: false,
    deleteSubmitter: false,
    updateSubmitter: false,
    listingStatus: '',
    selectedListingStatus: '',
    selectedSoldPrice: '',
    selectedSoldDate: '',
    soldPrice: '',
    soldDate: new Date(),
    success: '',
  }

  async componentDidMount() {
    const { retrieveListing, propertyId, user } = this.props
    FSRecordVars(user)
    try{
      await retrieveListing(propertyId)
      const { listing } = this.props
      if(!listing.visibility){
        Router.replace('/dashboard')
      }
      this.setState({ loading: false })
    } catch (error) {
      this.setState({ loading: false })
      console.log(error)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.listing) {
      const { listingStatus, soldPrice, soldDate } = this.state
      this.setState({ listingStatus: nextProps.listing.status, soldPrice: nextProps.listing.soldPrice, soldDate: nextProps.listing.soldDate || new Date() })
      this.setState({selectedListingStatus: listingStatus , selectedSoldDate: soldDate , selectedSoldPrice: soldPrice})
    }
  }

  toggleUpdateAccountModal = () => {
    this.setState((prevState) => {
      return {updateAccountModalVisible: !prevState.updateAccountModalVisible}
    })
  }

  toggleDeleteListingModal = () => {
    this.setState((prevState) => {
      return {deleteListingModalVisible: !prevState.deleteListingModalVisible}
    })
  }

  toggleUpdateListingStatusModal = () => {
    const { listingStatus, soldDate, soldPrice} = this.state
    this.setState({
      updateListingStatusModalVisible: !this.state.updateListingStatusModalVisible,
      selectedListingStatus: listingStatus,
      selectedSoldDate: soldDate,
      selectedSoldPrice: soldPrice,
    })
  }
  closeAlertMessage = () => {
    setTimeout(() => {
      this.setState({
        success: '',
        updateSubmitter: false
      })
    }, 6000);
  }

  closeModalLater = () => {
    setTimeout(() => {
      this.setState({
        updateListingStatusModalVisible: false,
        success: '',
        updateSubmitter: false
      })
    }, 1500);
  }

  handleDelete = async () => {
    const { propertyId, deleteListing } = this.props

    this.setState({ deleteSubmitter: true })
    try {
      await deleteListing(propertyId)
      .then(() => Router.pushRoute('/dashboard'))
    } catch (error) {
      return mapErrors(error)
    }
  }

  handleUpdate = async () => {
    const { listing, updateListing } = this.props
    const { selectedListingStatus, selectedSoldPrice, selectedSoldDate } = this.state
    let sold_date = null
    if (selectedListingStatus != 'sold'){
      this.setState({selectedSoldDate : null})
    }
    else {
      sold_date= new Date(selectedSoldDate)
    }
    this.setState({ updateSubmitter: true })
    try {
      await updateListing({status: selectedListingStatus, sold_price: selectedSoldPrice, sold_date: sold_date}, listing)
      .then(() => { this.setState({ success: 'Status Updated Successfully'}) })
      .then(() => { this.closeModalLater() })
    } catch (error) {
      this.setState({ success: error.message, updateSubmitter: false})
      return mapErrors(error)
    }

  }

  handleChange = (event) => {
    this.setState({selectedListingStatus: event.target.value});
  }

  handlePriceChange = (event) => {
    const selectedSoldPrice = event.target.value
    const minValue = 0
    const maxValue =  2147483647
    if (selectedSoldPrice >= minValue && selectedSoldPrice <= maxValue){
      this.setState({selectedSoldPrice: selectedSoldPrice });
    } else {
      this.setState({ success: 'Sold Price is not appropriate'})
      this.closeAlertMessage()
    }

  }

  handleDateChange = date =>{
    this.setState({selectedSoldDate: date});
  }

  render() {
    const { listing, router: {query: { message }}, user } = this.props
    const { loading, updateAccountModalVisible, deleteListingModalVisible, deleteSubmitter, updateSubmitter,  updateListingStatusModalVisible, listingStatus, selectedListingStatus, selectedSoldPrice, selectedSoldDate } =  this.state
    const documents = listing ? (listing.documents && listing.documents.filter(document => document.documentType === 'document')) : []
    const floor_plans = listing ? (listing.documents && listing.documents.filter(document => document.documentType === 'floor_plan')) : []
    const isSold = listingStatus === 'sold'

    if (listing === null) return null

    if (loading) return <LoadingSM/>
    let percentage1, percentage2, percentage3
    percentage1 = percentage2 = percentage3 = '100%'
    let questionCount1, questionCount2, questionCount3, answerCount1, answerCount2, answerCount3
    questionCount1 = questionCount2 = questionCount3 = answerCount1 = answerCount2 = answerCount3 = 0

    if (listing && !listing.land) {
      questionCount1 = homeInfoQuestions.length
      answerCount1 =  listing.confirmHomeInfo
      percentage1 =  Math.floor((answerCount1 / questionCount1) * 100) + '%'

      questionCount2 = otherHomeUpdatesQuestions.length
      answerCount2 = listing.otherHomeUpdates
      percentage2 = Math.floor((answerCount2 / questionCount2) * 100) + '%'

      questionCount3 = personalOpinionQuestions.length
      answerCount3 = listing.personalOpinion
      percentage3 = Math.floor((answerCount3 / questionCount3) * 100) + '%'
    }
    if(listing.land) {
      questionCount1 = 4
      answerCount1 =  listing.confirmHomeInfo
      percentage1 =  Math.floor((answerCount1 / 4) * 100) + '%'
    }

    const renderQuizSection = (name) => {
      if (user.email.startsWith("dealty") || listing.status === 'sold' || listing.land) return
      Router.pushRoute(`/seller/property/${listing.id}/${name}`)
    }
    let profileCompletionPercentage = 0.0

    let percentage1Completed = percentage1 === '100%' || (percentage1 === '90%' && listing.monthlyCost == null) || (percentage1 === '75%' && listing.monthlyCost == null && listing.parcelSize == null && listing.zoningType == null) || (percentage1 === '83%' && listing.parcelSize == null && listing.zoningType == null)
    let percentage2Completed = percentage2 === '100%' || (percentage2 === '90%' && listing.horseStalls == null) || (percentage2 === '80%' && listing.horseFeatures == null && listing.horseStalls == null)

    if (percentage1Completed) {profileCompletionPercentage += 0.25} else {renderQuizSection('confirm-home-info')}
    if (percentage2Completed) {
      profileCompletionPercentage += 0.25
    }
    else if (profileCompletionPercentage === 0.25){
      renderQuizSection('other-home-updates')
    }
    if (percentage3 === '100%') {profileCompletionPercentage += 0.25} else if (profileCompletionPercentage === 0.5) {renderQuizSection('personal-opinion')}
    if (!listing.description && profileCompletionPercentage === 0.75) {
      renderQuizSection('add-description')
    }else if (listing.appointment || listing.images.length > 0) {
      profileCompletionPercentage += 0.25
    } else if (listing.setImageLater === false && profileCompletionPercentage === 0.75) {
      renderQuizSection('add-images')
    }

    const allQuestionsCompleted = percentage1Completed && percentage2Completed && percentage3 === '100%' && (listing.appointment || listing.images.length > 0 || listing.setImageLater) && !!listing.description

    const homeProfileText = () => {
      if (allQuestionsCompleted && (listing.appointment === true || listing.images.length > 0) && listing.price === null) {
        return <p className="lead">Your Dealty Home Profile is <span className="text-primary">100% Complete!</span>  Your evaluation price above has been optimized. <br />Now <Link route={`/seller/property/${listing.id}/set-price`} passHref><a>Set A Price & List Your Home</a></Link> above.</p>
      } else if (profileCompletionPercentage > 0.0){
        return <p className="lead">Your Dealty Home Profile is <span className="text-primary">{Math.round(profileCompletionPercentage * 100)}% Complete!</span>  Continue filling out the items below to get a more accurate home evaluation price above.  The more you share, the narrower our estimate becomes.</p>
      } else if (listing.price > 0) {
        return
      }
      else {
        return <p className="lead">Welcome to Your Dealty Home Profile! Fill out the items below to get a more accurate home evaluation price above. The more you share, the narrower our estimate becomes.</p>
      }
    }

    return (
        <>
        { user.email.startsWith("dealty") &&
          <UpdateAccountModal
            isOpen={updateAccountModalVisible}
            toggleUpdateAccountModal={this.toggleUpdateAccountModal}
          />
        }

        <DeleteListingModal
          isOpen={deleteListingModalVisible}
          handleDelete={this.handleDelete}
          disabled={deleteSubmitter}
          toggleDeleteListingModal={this.toggleDeleteListingModal}
          />

        <UpdateListingStatusModal
          isOpen={updateListingStatusModalVisible}
          success={this.state.success}
          selectedListingStatus={selectedListingStatus}
          handleChange={this.handleChange}
          selectedSoldDate={selectedSoldDate}
          selectedSoldPrice={selectedSoldPrice}
          handlePriceChange={this.handlePriceChange}
          handleDateChange={this.handleDateChange}
          handleUpdate={this.handleUpdate}
          updateSubmitter={updateSubmitter}
          toggleUpdateListingStatusModal={this.toggleUpdateListingStatusModal}
        />

        <HomeValue
          listing={listing}
          questionsCompleted={allQuestionsCompleted}
          handleOnClick={this.toggleUpdateListingStatusModal}
        />

        <FactSlider listing={listing} />
        <Container fluid>

          {message && <Alert color="success" className="text-center mt-4">{message}</Alert>}

          <div className="dashboard-text text-center">
            <h1>Home Profile</h1>
            { homeProfileText() }
          </div>

          <DashboardBlock
            title='Confirm Home Info'
            icon='icon-home-info'
            path={`/seller/property/${listing.id}/confirm-home-info`}
            questionCount={questionCount1}
            answerCount={answerCount1}
            percentage={percentage1}
            completed={percentage1 === '100%' || (percentage1 === '90%' && listing.monthlyCost == null) || (percentage1 === '75%' && listing.monthlyCost == null && listing.parcelSize == null && listing.zoningType == null) || (percentage1 === '83%' && listing.parcelSize == null && listing.zoningType == null)}
            isSold={isSold}
          />

          {!listing.land &&
            <>
              <DashboardBlock
                title='Other Home Updates'
                icon='icon-other'
                path={`/seller/property/${listing.id}/other-home-updates`}
                questionCount={questionCount2}
                answerCount={answerCount2}
                percentage={percentage2}
                completed={percentage2 === '100%' || (percentage2 === '90%' && listing.horseStalls == null) || (percentage2 === '80%' && listing.horseFeatures == null && listing.horseStalls == null)}
                isSold={isSold}
              />

              <DashboardBlock
                title='Personal Opinion'
                icon='icon-opinion'
                path={`/seller/property/${listing.id}/personal-opinion`}
                questionCount={questionCount3}
                answerCount={answerCount3}
                percentage={percentage3}
                completed={questionCount3 === answerCount3}
                isSold={isSold}
              />
            </>
          }

          <CommunityInformationBlock
            title='Description'
            icon='icon-photo'
            route={`/seller/property/${listing.id}/add-description`}
            communityInfoAdded= {listing.description}
            type='Description'
            isSold={isSold}
          />

          <ImagesBlock
            title='Images'
            icon='icon-photo'
            listingId={listing.id}
            photographerScheduled={listing.appointment}
            imagesUploaded={listing.images.length > 0}
            isSold={isSold}
          />

          <ImagesBlock
            title='Video'
            icon='icon-photo'
            listingId={listing.id}
            imagesUploaded={listing.video}
            isSold={isSold}
          />

          <OpenHouseDatesBlock
            title='Open House Dates'
            icon='icon-opinion'
            openHouseDatesUploaded = {listing.openHouseDates}
            route={`/seller/property/${listing.id}/add-open-house-dates`}
            isSold={isSold}
          />

          { user.plan && user.plan.perks.filter(perk => perk.key == 'document_upload').length > 0 &&
            <DocumentsBlock
              title='Documents'
              icon='icon-photo'
              route={`/seller/property/${listing.id}/add-documents`}
              documentsUploaded={documents && documents.length > 0}
              type='Documents'
              isSold={isSold}
            />
          }

          { ((user.seller.sellerType == "homeowner") || (user.plan && user.plan.perks.filter(perk => perk.key == 'floor_plan').length > 0)) &&
            <DocumentsBlock
              title='Floor Plan'
              icon='icon-photo'
              route={`/seller/property/${listing.id}/add-floor-plans`}
              documentsUploaded={floor_plans && floor_plans.length > 0}
              type='Floor Plan'
              isSold={isSold}
            />
          }

          { user.plan && user.plan.perks.filter(perk => perk.key == 'community_info').length > 0 &&
            <CommunityInformationBlock
              title='Community Information'
              icon='icon-photo'
              route={`/seller/property/${listing.id}/add-community-info`}
              communityInfoAdded= {listing.communityInformation}
              type='Community Information'
              isSold={isSold}
            />
          }

          <DeleteBlock
            title='Delete This Listing'
            icon='icon-opinion'
            handleOnClick={this.toggleDeleteListingModal}
            isSold={isSold}
          />

          {(listing.valuationFlag === false || allQuestionsCompleted) && listingStatus !== 'sold' &&
            <div className="home-value text-center">
              <ListingButton listing={listing} />
            </div>
          }
          <div className="back-link mt-4 pt-4">
            <Link route="/dashboard">
              <a className="font-weight-bold py-4 text-info">‹ Back to Dashboard</a>
            </Link>
          </div>
          <style jsx>{`
          .dashboard-text{
            max-width: 980px;
            margin: 30px auto 60px auto;
          }
          .dashboard-text :global(.lead){
            font-size:18px;
            font-weight: 800;
          }
          .back-link{
            margin: 0 auto;
            display: block;
            max-width: 980px;
          }
          .home-value{
            width: 100%;
            position: relative;
            padding: 35px 0 0 0;
            margin: 0;
            color: #fff;
          }
          .home-value :global(.btn){
            max-width: 370px;
            margin: 0 auto;
          }
        `}</style>
        </Container>
      </>
    )
  }
}

PropertyContainer.propTypes = {
  user: PropTypes.object.isRequired,
  plan: PropTypes.object,
  listing: PropTypes.object,
  router: PropTypes.object.isRequired,
  retrieveListing: PropTypes.func.isRequired,
  propertyId: PropTypes.string.isRequired,
  deleteListing: PropTypes.func.isRequired,
  updateListing: PropTypes.func.isRequired
}

PropertyContainer = connect(mapStateToProps, mapDispatchToProps)(PropertyContainer)

export default withRouter(PropertyContainer)
