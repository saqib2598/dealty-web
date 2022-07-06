import React from 'react'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import VideoUploadForm from '../../components/dashboard/VideoUploadForm'
import { mapFinalFormErrors } from '../../lib/utils'
import { selectListing, retrieveListing, uploadListingImages, deleteVideo, updateListing } from '../../modules/listings'
import { Router } from '../../routes'
import PropTypes from 'prop-types'
import NavigationButtons from '../../components/navigationButtons'
import ReactPlayer from 'react-player'

const mapErrors = mapFinalFormErrors('Failed to upload video')

const mapDispatchToProps = { retrieveListing, uploadListingImages, deleteVideo, updateListing }

const mapStateToProps = (state) => ({
  listing: selectListing(state)
})

class UploadVideoContainer extends React.Component {
  state = {
    loading: true,
    success: '',
    submitting: false,
    visible: false,
    opacity: 1
  }

  async componentDidMount() {
    const { retrieveListing, propertyId } = this.props
    try{
      await retrieveListing(propertyId)
      const { listing } = this.props
      if(!listing.visibility){
        Router.replace('/dashboard')
      }
      this.setState({ loading: false })
    }
     catch (error) {
      this.setState({ loading: false })
    }
  }

  closeAlertLater = () => {
    this.setState({ visible: true }, ()=>{
      window.setTimeout(() =>{
        this.setState({ visible: false })
      }, 3000)
    });
  }

  onSubmit = async () => {
    const { listing, uploadListingImages } = this.props
    const form = document.getElementById('video-upload-form')
    const formData = new FormData(form)
    this.setState({ success: true });
    try {
      await uploadListingImages(formData, listing)
      this.closeAlertLater()
    } catch (error) {
      this.closeAlertLater()
      return mapErrors(error)
    }
  }

  deleteVideo = async () => {
    const { listing, deleteVideo, updateListing } = this.props
    this.setState({submitting: true})
    try{
      if (listing.video.id != null)
        await deleteVideo(listing.id, listing.video.id)
      else
        updateListing({ video_link: null }, listing)
      this.setState({submitting: false})
    } catch(error) {
      return mapErrors(error)
    }
  }

  render() {
    const { listing } = this.props
    const { loading, submitting } =  this.state

    if (listing === null) return null

    return (
      <>
        {loading && 'Loading video...'}
        {!listing.video && 'No video uploaded'}

        <div className="player-wrapper">
          {listing.video &&
            <ReactPlayer
              width='100%'
              height='100%'
              controls
              url={listing.video.url}
              />
          }
        </div>

        <hr className="my-3"/>
        {listing.video ?
          <div className="actions">
            <Button
              color="danger"
              block
              disabled={submitting}
              onClick={this.deleteVideo}
            >Delete</Button>
          </div>
          :
          <Form
            component={VideoUploadForm}
            onSubmit={this.onSubmit}
            visible={this.state.visible}
            {...this.props}
          />
        }

        <NavigationButtons
         routeNext={`/seller/property/${listing.id}/add-open-house-dates`}
         nextText='Skip'
         showNext={!listing.price}
         />
      </>
    )
  }
}

UploadVideoContainer.propTypes = {
  retrieveListing: PropTypes.func.isRequired,
  propertyId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  listing: PropTypes.object,
  uploadListingImages: PropTypes.func.isRequired,
  deleteVideo: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadVideoContainer)
