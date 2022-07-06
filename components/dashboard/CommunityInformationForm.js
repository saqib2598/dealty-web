import React from 'react'
import { Alert, Button } from 'reactstrap'
import { requiredDescription } from '../../lib/validators'
import { Form, Field } from 'react-final-form'
import InputAdapter from '../InputAdapter'

class CommunityInformationForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <form  onSubmit={this.props.handleSubmit} id = "document-form">

          <Field
            id="message"
            name= {this.props.type === 'description' ? "description" : "community_information"}
            label= {this.props.type === 'description'? "Description:" : 'Community Information*'}
            component={InputAdapter}
            validate={requiredDescription}
            type="textarea"
            rows={8}
            placeholder="Enter your message here..."
          />
          {this.props.submitError &&
              <Alert color="danger" isOpen={this.props.visible}>{this.props.submitError}</Alert>
          }
          {this.props.submitSucceeded &&
            <Alert color="success" isOpen={this.props.visible}>Your {this.props.type === 'description'? "Description" : 'Community Information'} have been Saved.</Alert>
          }
          <div className="actions">
            <Button
              color="info"
              block
              type="submit"
              disabled={this.props.submitting}
            >Save</Button>
          </div>
        </form>
    )
  }
}

export default CommunityInformationForm
