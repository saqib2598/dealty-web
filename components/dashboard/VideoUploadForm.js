import React from 'react'
import { Alert, Button } from 'reactstrap'
import { Form, Field } from 'react-final-form'
import InputAdapter from '../InputAdapter'

class VideoUploadForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      disable_video: false,
      disable_link: false
    }
  }

  handleDisableVideo = () => {
    this.setState({ disable_video: true })
  }

  handleUnDisableVideo = e => {
    if (e.target.value == "")
      this.setState({ disable_video: false })
  }


  handleDisableLink= () => {
    this.setState({ disable_link: true })
  }

  handleUnDisableLink = e => {
    if (e.target.value == "")
      this.setState({ disable_link: false })
  }

  render() {
    return(
      <Form
        onSubmit={this.props.handleSubmit}
        render={({ handleSubmit, form }) => (
          <form
            onSubmit={event => {
              handleSubmit(event).then(() => {
                form.reset();
              })
            }}
            id="video-upload-form"
          >
            {this.props.submitError &&
              <Alert color="danger" isOpen={this.props.visible}>{this.props.submitError}</Alert>
            }
            {this.props.submitSucceeded &&
              <Alert color="success" isOpen={this.props.visible}>Your video has been uploaded.</Alert>
            }
            <Field
              id="video"
              name="listing[video_attributes][video]"
              type="file"
              hideLabel
              accept="video/*"
              onFocus={this.handleDisableLink}
              onBlur={this.handleUnDisableLink}
              disabled={this.state.disable_video}
              component={InputAdapter}
            />
            <p className="mt-2 mb-4 text-muted">
              -video maximum size 100MB<br />
            </p>

            <p className="mt-2 mb-2 text-center text-muted">
              OR<br />
            </p>

            <Field
              id="video_link"
              name="listing[video_link]"
              type="link"
              label="Link"
              placeHolder="Add your video link here..."
              onFocus={this.handleDisableVideo}
              onBlur={this.handleUnDisableVideo}
              disabled={this.state.disable_link}
              component={InputAdapter}
            />

            <div className="actions">
              <Button
                color="info"
                block
                type="submit"
                disabled={this.props.submitting}
              >Upload / Attach Link</Button>
            </div>

          </form>
        )}
      />
    )
  }
}

export default VideoUploadForm
