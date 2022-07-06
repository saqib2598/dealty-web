import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import ListingImages from '../../../components/buyer/home/ListingImages'
import ListingVideo from '../../../components/buyer/home/ListingVideo'
import ListingDocuments from '../../../components/buyer/home/ListingDocuments'

class LisingMediaContainer extends React.Component {
  constructor(props){
    super(props)
    this.state= {
      showImages: true,
      showVideo: false,
      showDocuments: false,
      showFloorPlans: false
    }
  }

  renderComponent = ( component ) => {
    let linksState = {images: false, video: false, documents: false, floor_plans: false}
    linksState[component] = true
    this.setState({
      showImages: linksState.images,
      showVideo: linksState.video,
      showDocuments: linksState.documents,
      showFloorPlans: linksState.floor_plans
    })
  }

  render(){
    const { showImages, showVideo, showDocuments, showFloorPlans } = this.state
    const { home } = this.props
    const documents = home ? (home.documents && home.documents.filter(document => document.documentType === 'document')) : []
    const floor_plans = home ? (home.documents && home.documents.filter(document => document.documentType === 'floor_plan')) : []
    const videoStyle = {
      width: '100%'
    }

    return (
      <div>
        <Nav tabs>
          {home.images.length > 0 &&
            <NavItem>
              <NavLink href="#" className={showImages ? 'active' : null}  onClick={() => this.renderComponent('images')}>Images</NavLink>
            </NavItem>
          }
          {home.video &&
            <NavItem>
              <NavLink href="#" className={showVideo ? 'active' : null} onClick={() => this.renderComponent('video')}>Video</NavLink>
            </NavItem>
          }
          {(documents && documents.length) > 0 &&
            <NavItem>
              <NavLink href="#" className={showDocuments ? 'active' : null} onClick={() => this.renderComponent('documents')}>Documents</NavLink>
            </NavItem>
          }
          {(floor_plans && floor_plans.length) > 0 &&
            <NavItem>
              <NavLink href="#" className={showFloorPlans ? 'active' : null} onClick={() => this.renderComponent('floor_plans')}>Floor Plan</NavLink>
            </NavItem>
          }
        </Nav>
        { showImages &&
          <ListingImages home={home} />
        }

        { showVideo &&
          <ListingVideo home={home} videoStyle={videoStyle} />
        }

        { showDocuments &&
          <ListingDocuments documents={documents} />
        }

        { showFloorPlans &&
          <ListingDocuments
            documents={floor_plans}
          />
        }
      </div>
    );
  }
}

export default LisingMediaContainer;
