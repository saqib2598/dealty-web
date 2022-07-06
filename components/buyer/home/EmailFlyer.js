import React from 'react';
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { mapFinalFormErrors } from '../../../lib/utils'
import { sendFlyerEmail } from '../../../modules/homes'
import { isSignedIn as hasCredentials } from '../../../lib/session'
import EmailFlyerForm from '../../modals/EmailFlyerForm'

const mapErrors = mapFinalFormErrors('Failed to Send Flyer Email')
const mapDispatchToProps = { sendFlyerEmail }

const mapStateToProps = (state) => ({
  isSignedIn: hasCredentials(state),
})

class EmailFlyer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      openEmailFlyer: false,
      selectedEmail: '',
      success: ''
    }
  }

  handleUpdate = async () => {
    const { selectedEmail } = this.state
    const { home, sendFlyerEmail } = this.props

    if (selectedEmail == ''){
      this.setState({ success: 'Email Address Required!!!'})
    }
    else if(!this.validateEmail(selectedEmail)){
      this.setState({ success: 'Please enter a Email Address!!!'})
    }

    if(selectedEmail && this.validateEmail(selectedEmail)){
      try {
        await sendFlyerEmail(home.id, { email: selectedEmail })
          .then(() => {
            this.setState({ success: 'Listing Flyer Sent Successfully!!!', selectedEmail: '' })
            this.closeModalLater()
          })
      }
      catch (error) {
        return mapErrors(error)
      }
    }
  }

  closeModalLater = () => {
    setTimeout(() => {
      this.toggleEmailFlyer()
    }, 2000);
  }

  handleChange = (event) => {
    this.setState({selectedEmail: event.target.value})
  }

  toggleEmailFlyer = () => {
    this.setState(prevState => ({
      openEmailFlyer: !prevState.openEmailFlyer,
      success: ''
    }))
  }

  validateEmail = email => (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))

  render(){
    const { openEmailFlyer, success, selectedEmail } = this.state
    const { home, isSignedIn } = this.props

    return(
      <React.Fragment>
        <Button style={{display: 'block', margin: '20px', backgroundColor:'#1999A9'}} onClick={this.toggleEmailFlyer}>Email Listing Flyer!</Button>

        <EmailFlyerForm
          handleChange={this.handleChange}
          handleUpdate={this.handleUpdate}
          toggleEmailFlyer={this.toggleEmailFlyer}
          openEmailFlyer={openEmailFlyer}
          selectedEmail={selectedEmail}
          success={success}
          isSignedIn={isSignedIn}
        />
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailFlyer)
