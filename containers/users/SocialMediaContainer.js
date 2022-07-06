import React from 'react'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import SocialLinksForm from '../../components/users/SocialLinksForm'
import { mapFinalFormErrors } from '../../lib/utils'
import { retrieveUser, selectUser } from '../../modules/users'
import { createSocialLinks, updateSocialLinks, selectLinks, retrieveSocialLinks } from '../../modules/links'

const mapDispatchToProps = {  retrieveUser, createSocialLinks, updateSocialLinks, selectLinks, retrieveSocialLinks }

const mapStateToProps = (state) => ({
  user: selectUser(state),
  links: selectLinks(state)
});

const mapErrors = mapFinalFormErrors('Failed to update links')

class SocialMediaContainer extends React.Component {
  state = {
    alert: null
  }

  componentDidMount() {
    const { user, retrieveSocialLinks } = this.props
    if(user.links){
      retrieveSocialLinks(user.links.id)
    }
  }

  onSubmit = (values) => {
    const { user, links } = this.props
    if(links){
      const { updateSocialLinks } = this.props
      values.id = links.id
      return updateSocialLinks(values)
        .then((resp) => {
          this.setState ({ alert: 'Links have been updated successfully!' }, () => {
            window.setTimeout(() =>{
              this.setState({ alert: '' })
            }, 3000)
          })
        })
        .catch(mapErrors)
    } else {
      const { createSocialLinks } = this.props
      return createSocialLinks(values)
        .then(() => {
          this.setState ({ alert: 'Links have been created successfully!' }, () => {
            window.setTimeout(() =>{
              this.setState({ alert: '' })
            }, 3000)
          })
        })
        .catch(mapErrors)
    }
  }

  validate = (values) => {
    const errors = {}

    if (values.facebook && !values.facebook.startsWith('https://')) {
      errors.facebook = 'Must starts with https://'
    }

    if (values.instagram && !values.instagram.startsWith('https://')) {
      errors.instagram = 'Must starts with https://'
    }

    if (values.website && !values.website.startsWith('https://') && !values.website.startsWith('http://')) {
      errors.website = 'Must starts with http:// or https://'
    }

    return errors
  }

  render() {
    const { alert } = this.state
    const { user, links } = this.props
    let initialValues = null
    if(links){
      initialValues = {
        facebook: links.facebook,
        instagram: links.instagram,
        website: links.website
      }
    }

    return (
      <Form
        component={SocialLinksForm}
        onSubmit={this.onSubmit}
        alert={alert}
        {...this.props}
        user={user}
        initialValues={initialValues}
        validate={this.validate}
      />
    )
  }
}


SocialMediaContainer = connect(mapStateToProps, mapDispatchToProps)(SocialMediaContainer)

export default SocialMediaContainer
