import React from 'react'
import { Button, Input } from 'reactstrap'
import { Field, Form } from 'react-final-form'
import InputAdapter from '../InputAdapter'

class AttachmentForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <Form
        onSubmit={this.props.handleSubmit}
        render={({ handleSubmit, form }) =>(
          <form
            onSubmit={this.props.handleSubmit}
            id="attachment-form"
          >
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Field
                id="image"
                style={{border: 'none', textIndent: 'initial'}}
                name="message[image_attributes][file]"
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                component={InputAdapter}
              />
              <Input
                id="chat_id"
                type="text"
                name="message[chat_room_id]"
                style={{display: 'none'}}
              />
              <Input
                id="body"
                type="text"
                name="message[body]"
                style={{display: 'none'}}
              />
            </div>
            <div className="clearfix">
              <Button
                  block
                  size="lg"
                  color="secondary"
                  type="submit"
                  disabled={(this.props.submitting )}
              >{this.props.submitting ? 'Uploading...' : 'Upload'}</Button>
            </div>
            <br />
          </form>
        )}
     />
    )
  }
}
export default AttachmentForm