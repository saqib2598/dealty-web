import React from 'react'
import { Alert, Button } from 'reactstrap'
import { Form, Field } from 'react-final-form'
import InputAdapter from '../InputAdapter'

class DocumentUploadForm extends React.Component {
  constructor(props) {
    super(props);
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
            id="document-form"
          >
            {this.props.submitError &&
              <Alert color="danger" isOpen={this.props.visible}>{this.props.submitError}</Alert>
            }
            {this.props.submitSucceeded &&
              <Alert color="success" isOpen={this.props.visible}>Your document have been uploaded.</Alert>
            }
            <Field
              id="images"
              name="document[][upload_attributes][document]"
              type="file"
              hideLabel
              component={InputAdapter}
              multiple={true}
            />
            <div className="actions">
              <Button
                color="info"
                block
                type="submit"
                disabled={this.props.submitting}
              >Upload</Button>
            </div>
          </form>
        )}
      />  
    )  
  }
}

export default DocumentUploadForm
