import React from 'react'
import { Button, Alert } from 'reactstrap'
import { Field, Form } from 'react-final-form'
import InputAdapter from '../InputAdapter'

class ProfilePhoto extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <Form
        onSubmit={this.props.handleSubmit}
        render={({ handleSubmit, form }) =>(
          <form
            onSubmit={event => {
              handleSubmit(event).then(() =>{
                form.reset();
              })
            }}
            id="profile-form"
          >
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Field
                id="image"
                style={{border: 'none', textIndent: 'initial'}}
                name="user[image_attributes][file]"
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                component={InputAdapter}
            />
            </div>
            <div className="clearfix">
              <Button
                block
                size="lg"
                color="secondary"
                disabled={(this.props.submitting )}
                type="submit"
              >{this.props.submitting ? 'Uploading...' : 'Upload'}</Button>
            </div>
            <br />
            {this.props.submitError &&
              <Alert color="danger" isOpen={this.props.visiblePhoto}>{this.props.submitError}</Alert>
            }
            {this.props.submitSucceeded &&
              <Alert color="success" isOpen={this.props.visiblePhoto}>Profile Picture updated successfully!</Alert>
            }
            <hr className="dashed" />
            <style jsx>
            {`
              .clearfix{
                padding-top: 15px;
              }

            `}
            </style>
          </form>
        )}
      />
    )
  }
}
export default ProfilePhoto
