import React from 'react'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import ChangeProfileForm from '../../components/users/ChangeProfileForm'
import { Col } from 'reactstrap'
import { mapFinalFormErrors } from '../../lib/utils'
import { updateProfile, retrieveUser, selectUser } from '../../modules/users'
import ProfilePhotoForm from '../../components/users/ProfilePhotoForm'
import UserImage from '../../components/UserImage'
import PropTypes from 'prop-types'

const mapDispatchToProps = { retrieveUser , updateProfile}

const mapStateToProps = (state) => ({
  user: selectUser(state)
});

const mapErrors = mapFinalFormErrors('Failed to change profile')

let ChangeProfileContainer = class ChangeProfileContainer extends React.Component {
  state = {
    alert: null,
    visible: false,
    visiblePhoto: false,
  }

  componentDidMount() {
    const { retrieveUser } = this.props
    retrieveUser()
  }

  closeAlertLater = () => {
    this.setState({ visible: true }, ()=>{
      setTimeout(() =>{
        this.setState({ visible: false })
      }, 3000)
    });
  }

  closeAlertLaterForProfilePhoto = () => {
    this.setState({ visiblePhoto: true }, ()=>{
      setTimeout(() =>{
        this.setState({ visiblePhoto: false })
      }, 3000)
    });
  }

  onSubmit = async (values) => {
    const { sellerType } = this.state
    const { updateProfile, user } = this.props
    values.user.seller_attributes.id = user.seller.id

    try{
      await updateProfile(values, user.id)
      this.closeAlertLater('sucess')
    } catch (error) {
      return mapErrors(error)
    }
  }

  onSubmitProfilePhoto = async () => {
    const { updateProfile, user } = this.props
    const form = document.getElementById('profile-form')
    const formData = new FormData(form)
    try{
      await updateProfile(formData, user.id).then(() => { this.closeAlertLaterForProfilePhoto() })
    }
    catch (error) {
      return mapErrors(error)
    }
  }

  render() {
    const { alert, sellerType } = this.state
    const { user } = this.props

    const image = () => {
      let image='../../../static/images/user_account_pic.png'
      if (user && user.image) {
        image = user.image
      }
      return image;
    }

    let initialValues = {
      user: {
        first_name: user.firstName,
        last_name: user.lastName,
        phone: user.phone,
        email: user.email
      }
    }

    if(user.seller){
      initialValues['user']['seller_attributes'] =  {
        id: user.seller.id,
        brokerage_name: user.seller.brokerageName,
        bio: user.seller.bio,
        sellerType: user.seller.sellerType
      }
    }
    
    return (
      <div className="user-profile">
        <Col className="image-holder">
          <div>
            <UserImage img={image()} />
          </div>
        </Col>
        <Form
          component={ProfilePhotoForm}
          onSubmit={this.onSubmitProfilePhoto}
          validate={this.validate}
          alert={alert}
          user={user}
          visiblePhoto={this.state.visiblePhoto}
          {...this.props}
        />
        <Form
          component={ChangeProfileForm}
          onSubmit={this.onSubmit}
          validate={this.validate}
          alert={alert}
          user={user}
          visible={this.state.visible}
          initialValues={initialValues}
          {...this.props}
        />
      </div>
    )
  }
}

ChangeProfileContainer.propTypes = {
  user: PropTypes.object.isRequired,
  retrieveUser: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired
}

ChangeProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ChangeProfileContainer)
export default ChangeProfileContainer
