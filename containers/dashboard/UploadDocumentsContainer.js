import React from 'react'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import { Col, Row } from 'reactstrap'
import { mapFinalFormErrors } from '../../lib/utils'
import DocumentUploadForm from '../../components/dashboard/DocumentUploadForm'
import { selectListing, retrieveListing } from '../../modules/listings'
import { retrieveListingDocuments, uploadListingDocuments, selectDocuments, deleteListingDocuments } from'../../modules/documents'
import { Router } from '../../routes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from '../../routes'
import { retrieveUser, selectUser } from '../../modules/users'
import PropTypes from 'prop-types'
import NavigationButtons from '../../components/navigationButtons'

const mapErrors = mapFinalFormErrors('Failed to upload Document')

const mapDispatchToProps = { retrieveListing, uploadListingDocuments, retrieveListingDocuments, deleteListingDocuments, retrieveUser }

const mapStateToProps = (state) => ({
  listing: selectListing(state),
  documents: selectDocuments(state),
  user: selectUser(state)
})

class UploadDocumentsContainer extends React.Component {
  state = {
    loading: true,
    success: '',
    deleteSubmitter: false,
    visible: false,
    route: null
  }

  async componentDidMount() {
    const { retrieveListing, propertyId, retrieveListingDocuments, type, user } = this.props
    if(type == 'document'){
      if(!user.plan || user.plan.perks.filter(perk => perk.key == 'document_upload').length < 1){
        this.redirectToDashboard()
      } else if( user.seller.sellerType == 'homeowner' || (user.plan && user.plan.perks.filter(perk => perk.key == 'floor_plan').length > 0)){
        this.setState({route: `/seller/property/${propertyId}/add-floor-plans`})
      }
    } else if (type == 'floor_plan') {
      if((user.seller.sellerType != "homeowner") && (!user.plan || user.plan.perks.filter(perk => perk.key == 'floor_plan').length < 1)){
        this.redirectToDashboard()
      } else if(user.seller.sellerType != 'homeowner' && user.plan && user.plan.perks.filter(perk => perk.key == 'community_info').length > 0){
        this.setState({route: `/seller/property/${propertyId}/add-community-info`})
      } else {
        this.setState({route: `/seller/property/${propertyId}/set-price`})
      }
    }

    try{
      await retrieveListing(propertyId)
      const { listing } = this.props
      if(!listing.visibility){
        this.redirectToDashboard()
      }
      await retrieveListingDocuments(propertyId, type)
    } catch (error) {
      this.setState({ loading: false })
      console.log(error)
    }
  }

  redirectToDashboard = () => {
    Router.replace('/dashboard')
  }

  closeAlertLater = () => {
    this.setState({ visible: true }, ()=>{
      window.setTimeout(() =>{
        this.setState({ visible: false })
      }, 3000)
    });
  }

  onSubmit = async () => {
    const { listing, uploadListingDocuments, type } = this.props
    const form = document.getElementById('document-form')
    const formData = new FormData(form)
    try {
      await uploadListingDocuments(formData, listing, type).then(() => { this.closeAlertLater() })
    } catch (error) {
      return mapErrors(error)
    }
  }

  onDelete = async (documentId) => {
    const { listing, deleteListingDocuments, type } = this.props
    try {
      await deleteListingDocuments(documentId, listing, type)
    } catch (error) {
      return mapErrors(error)
    }
  }

  render() {
    const { listing, documents } = this.props
    const { route } = this.state
    if (listing === null) return null

    return (
      <div>
        {documents &&
          <Row>
            {documents.map((document, id) => (
              <Col xs="6" sm="4" className="mb-4" key={id}>
                <FontAwesomeIcon icon={faTrash}  onClick={() => this.onDelete(document.id)}  style={{color: 'red'}}/>
                  <Link route ={document.original} passHref>
                    <a target="_blank">
                       <div className="img-thumb">
                       </div>
                       <style jsx>{`
                          .img-thumb{
                            background-repeat: no-repeat;
                            width: 100%;
                            height: 80px;
                            background-position: center center;
                            background-size: cover;
                            display:block;
                            background-image: url(${document.thumb});
                          }
                        `}</style>
                    </a>
                  </Link>
              </Col>
            ))}
          </Row>
          }
        <hr className="my-3"/>
        <Form
          component={DocumentUploadForm}
          onSubmit={this.onSubmit}
          visible={this.state.visible}
          {...this.props}
        />
        {listing &&
          <NavigationButtons
            routeNext={route}
            nextText='Skip'
            showNext={!listing.price}
          />
        }
      </div>
    )
  }
}

UploadDocumentsContainer.propTypes = {
  retrieveListing: PropTypes.func.isRequired,
  propertyId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  retrieveListingDocuments: PropTypes.func.isRequired,
  type: PropTypes.string,
  user: PropTypes.object,
  listing: PropTypes.object,
  uploadListingDocuments: PropTypes.func.isRequired,
  documents: PropTypes.array,
  deleteListingDocuments: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadDocumentsContainer)
