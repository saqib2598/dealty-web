import React from 'react'
import EdiText from 'react-editext'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import { Col, Row } from 'reactstrap'
import ImageUploadForm from '../../components/dashboard/ImageUploadForm'
import ImageLaterUploadForm from '../../components/dashboard/ImageLaterUploadForm'
import SchedulePhotographerForm from '../../components/dashboard/SchedulePhotographerForm'
import { mapFinalFormErrors } from '../../lib/utils'
import { selectListing, retrieveListing, updateListing, uploadListingImages, deleteImage, rotateImage, updateUpload } from '../../modules/listings'
import { Router } from '../../routes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndoAlt, faRedoAlt, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
import Reorder from 'react-reorder';
import PropTypes from 'prop-types'
import { retrieveJob } from '../../modules/jobs'
import { Progress } from 'reactstrap';
import { createProfessionalPhotos, updateProfessionalPhotos } from '../../modules/photographOrders'
import NavigationButtons from '../../components/navigationButtons'

const mapErrors = mapFinalFormErrors('Failed to upload photo')

const mapDispatchToProps = { retrieveListing, updateListing, uploadListingImages, deleteImage, rotateImage, updateUpload, retrieveJob, createProfessionalPhotos, updateProfessionalPhotos}

const mapStateToProps = (state) => ({
  listing: selectListing(state),
  activeImage: state.listings.activeImage,
  job: state.jobs.job,
})

class UploadImagesContainer extends React.Component {
  state = {
    loading: true,
    current_image: {},
    deleteSubmitter: false,
    visible: false,
    success: '',
    image_rotations: {},
    opacity: 1,
    progressBar: false,
    processing: false
  }

  async componentDidMount() {
    const { retrieveListing, propertyId } = this.props
    try{
      await retrieveListing(propertyId)
      this.setState({ loading: false })
      const { listing } = this.props
      if(!listing.visibility){
        Router.replace('/dashboard')
      }
      listing && listing.images.map((image) => this.setState({image_rotations: { ...this.state.image_rotations, [image.id]: 0}}))
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

    const form = document.getElementById('upload-form')
    const formData = new FormData(form)
    try {
      this.setState({processing: true})
      await uploadListingImages(formData, listing)
      this.checkProgress()
      this.closeAlertLater()
      this.updateImageRotation()
    } catch (error) {
      this.setState({processing: false})
      this.closeAlertLater()
      return mapErrors(error)
    }
  }

  checkProgress = () => {
    const { listing, retrieveJob } = this.props
    const intervalId = setInterval(async () => {
      await retrieveJob(listing.jobId)
      this.setState({progressBar: true, processing: false})
      if(this.props.job && this.props.job.status === 100){
        clearInterval(intervalId)
        const { retrieveListing, propertyId } = this.props
        await retrieveListing(propertyId)
        this.setState({progressBar: false})
      }
    }, 3000);
  }

  updateImageRotation = () => {
    const { listing } = this.props
    listing.images.map((image) => {
      if (this.state.image_rotations[image.id] == undefined){
        this.setState({
          image_rotations: { ...this.state.image_rotations, [image.id]: 0}
        })
      }
    })
    this.setState({
      deleteSubmitter: false
    })
  }

  onImageLaterSubmit = async () => {
    const { listing, updateListing } = this.props
    try {
      await updateListing({set_image_later: true}, listing)
      Router.pushRoute(`/seller/property/${listing.id}`)
      window.scrollTo(0, 0)
    } catch (error) {
      return mapErrors(error)
    }
  }

  deleteImage = async (values) => {
    const { listing, deleteImage } = this.props
    this.setState({ deleteSubmitter: true, opacity: 0.5 })
    let previous = listing.images.findIndex(image => image.id == values)
    try {
      await deleteImage(values, listing)
      this.setState({ deleteSubmitter: false, opacity: 1 })
      this.updateImagesPosition(previous, listing.images.length-1)
    } catch (error) {
      return mapErrors(error)
    }
  }

  rotateImage = (rotation, id) => {
    this.setState({
      image_rotations:
      { ...this.state.image_rotations, [id]: (this.state.image_rotations[id] + rotation) % 360}
    })
  }

  submitRotateImage = async (image_id, rotation) => {
    const { listing, rotateImage } = this.props
    let values = { rotation: rotation }
    this.setState({ deleteSubmitter: true, opacity: 0.5 })
    try {
      await rotateImage(values, listing, image_id)
      this.setState({
        image_rotations: { ...this.state.image_rotations, [image_id]: 0},
        deleteSubmitter: false,
        opacity: 1
      })
    } catch (error) {
      return mapErrors(error)
    }
  }

  onReorder = async (event, previousIndex, nextIndex) => {
    const { listing } = this.props
    let reqPrev, reqNext, prev
    prev = listing.images.splice(previousIndex, 1)
    listing.images.splice(nextIndex, 0, prev[0])

    if(previousIndex < nextIndex){
      reqPrev = previousIndex
      reqNext = nextIndex
    } else {
      reqPrev = nextIndex
      reqNext = previousIndex
    }
    this.updateImagesPosition(reqPrev, reqNext)
  }

  updateImagesPosition = async (previous, next) => {
    const { listing, updateUpload } = this.props
    for( let i = previous; i <= next; i++ ){
      try{
        await updateUpload(listing.id, {position: i}, listing.images[i].id)
      }
      catch (error) {
        return mapErrors(error)
      }
    }
  }

  onSave = async (val, id) => {
    const { listing, updateUpload } = this.props
    let values = {label: val}
    try{
      await updateUpload(listing.id, values, id)
    }
    catch (error) {
      return mapErrors(error)
    }
  }

  onProfessionalPhotosSubmit = async ( values ) => {
    const { listing, createProfessionalPhotos, updateProfessionalPhotos } = this.props
    try {
      if(listing.photographOrder == null){
        await createProfessionalPhotos(listing.id, values)
        this.setState({ success: 'Order Created Successfully, we will contact you shortly !!!' })
      }
      else{
        await updateProfessionalPhotos(listing.id, listing.photographOrder.id, values)
        this.setState({ success: 'Order Updated Successfully, we will contact you shortly !!!' })
      }
      this.closeProfessionalPhotosAlertLater()
    }
    catch (error) {
      return mapErrors(error)
    }
  }

  closeProfessionalPhotosAlertLater = () => {
    setTimeout(() => {
      this.setState({
        success: ''
      })
    }, 1500);
  }

  nextButton = () => {
    const { listing } = this.props
    if(!listing.price) {
      if(listing.images.length > 0 || listing.setImageLater === true) {
        return <Col xs="6" className="text-right">
                 <a className="prev-page" onClick={() => { Router.pushRoute('/') }}>Next »</a>
               </Col>
      }
    }
  }

  render() {
    const { listing, job } = this.props
    const { loading, progressBar, processing, success } =  this.state

    if (listing === null) return null

    let initialValues = {}
    if (listing.photographOrder) {
      initialValues['packageName'] = listing.photographOrder.packageName
    }

    return (
      <>
        {loading && 'Loading images...'}
        { listing.images.length === 0 &&
          !progressBar &&
          !processing &&
          !loading && 'no images uploaded'}

        {listing.images &&
            <Row className="reorder">
              <Reorder reorderId="my-images-list" onReorder={this.onReorder.bind(this)} className="reorder">
                {listing.images.map((image, id) => (
                  <Col xs="6" sm="4" className="mb-4" key={id}>
                    <div className="img-position">{image.position + 1}</div>
                    <div className="img-thumb" />
                    <Row className ="delete-icon">
                      <FontAwesomeIcon icon={faTrash} onClick={() => !this.state.deleteSubmitter && this.deleteImage(image.id)} style= {{opacity: this.state.opacity}}/>
                    </Row>
                    <Row className="rotation-menu">
                      <div className="fa-icon-background">
                        <FontAwesomeIcon className="fa-icon" icon={faUndoAlt} onClick={() => !this.state.deleteSubmitter && this.rotateImage(270, image.id)} style={{opacity: this.state.opacity}} />
                      </div>
                      <div className="fa-icon-background">
                        <FontAwesomeIcon className="fa-icon" icon={faCheck} onClick={() => !this.state.deleteSubmitter && this.submitRotateImage(image.id, this.state.image_rotations[image.id])} style= {{opacity: this.state.opacity}} />
                      </div>
                      <div className="fa-icon-background">
                        <FontAwesomeIcon className="fa-icon" icon={faRedoAlt} onClick={() => !this.state.deleteSubmitter && this.rotateImage(90, image.id)} style= {{opacity: this.state.opacity}} />
                      </div>
                    </Row>
                    <EdiText
                      type="text"
                      hint=" Image Label"
                      value={image.label}
                      onSave={(value) => this.onSave(value, image.id)}
                    />
                    <style jsx>{`
                      .img-thumb{
                        background-repeat: no-repeat;
                        width: 100%;
                        height: 123px;
                        background-position: center center;
                        background-size: cover;
                        display:block;
                        cursor: pointer;
                        transform: rotate(${this.state.image_rotations[image.id]}deg);
                        background-image: url(${image.url});
                      }
                    `}</style>
                  </Col>
                ))}
              </Reorder>
            </Row>
        }

        {processing &&
          <Progress animated value={100} >Processing your images</Progress>
        }

        { progressBar &&
          <>
            <small>Your images will be uploaded soon, Uploading...</small>
            <Progress animated color="info" value={job && job.status} >{job && job.status}%</Progress>     
          </>
        }
        <Form
          component={ImageUploadForm}
          onSubmit={this.onSubmit}
          visible={this.state.visible}
          existingImage={listing.images.length > 0}
          uploading={processing || progressBar}
          {...this.props}
        />
        <hr className="my-3"/>
        <Form
          component={ImageLaterUploadForm}
          onSubmit={this.onImageLaterSubmit}
          existingImage={listing.images.length > 0}
          imageFlag={listing.setImageLater}
          uploading={processing || progressBar}
          {...this.props}
        />

        {listing && listing.state == 'AZ' &&
          <Form
            component={SchedulePhotographerForm}
            onSubmit={this.onProfessionalPhotosSubmit}
            success={success}
            initialValues={initialValues}
          />
        }

        <NavigationButtons
          routeNext={`/seller/property/${listing.id}/add-video`}
          nextText='Next'
          showNext={!listing.price && (listing.images.length > 0 || listing.setImageLater === true)}
         />
      </>
    )
  }
}

UploadImagesContainer.propTypes = {
  retrieveListing: PropTypes.func.isRequired,
  propertyId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number.isRequired
  ]).isRequired,
  listing: PropTypes.object,
  uploadListingImages: PropTypes.func.isRequired,
  updateListing: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
  rotateImage: PropTypes.func.isRequired,
  updateUpload: PropTypes.func.isRequired,
  retrieveJob: PropTypes.func.isRequired,
  job: PropTypes.object,
  nextPath: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadImagesContainer)
