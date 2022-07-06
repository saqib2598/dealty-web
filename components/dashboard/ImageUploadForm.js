import React from 'react'
import { Alert, Button } from 'reactstrap'
import { Form, Field } from 'react-final-form'
import InputAdapter from '../InputAdapter'

class ImageUploadForm extends React.Component {
  state = {
    chooseImage: false,
  }

  render() {
    const handleChooseImage = () => {
      this.setState({chooseImage:true})
    }
    return(
      <Form
        onSubmit={this.props.handleSubmit}
        render={({ handleSubmit, form }) => (
          <form
            onSubmit={event => {
              handleSubmit(event).then(() => {
                form.reset();
                this.setState( {chooseImage:false} )
              })
            }}
            id="upload-form"
          >
            {this.props.submitError &&
              <Alert color="danger" isOpen={this.props.visible}>{this.props.submitError}</Alert>
            }
            <Field
              id="images"
              name="listing[images_attributes][][file]"
              type="file"
              multiple={true}
              hideLabel
              accept="image/*"
              component={InputAdapter}
              disabled={this.props.uploading}
              onClick={handleChooseImage}
            />
              <Button
                style={{width:150, marginLeft:'28%'}}
                className='save-changes'
                color="info"
                block
                type="submit"
                disabled={this.props.submitting || this.props.uploading || !this.state.chooseImage}
              > 
                Upload
              </Button>
              <p><b>Note:</b> You can upload multiple images at once.</p>
          </form>
        )}
      />
    )
  }
}

export default ImageUploadForm
