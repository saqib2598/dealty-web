import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap';
import SubscriptionForm from './SubscriptionForm'
import PropTypes from 'prop-types'
import { subscribeBlogs } from '../../modules/blogs'

const mapDispatchToProps = { subscribeBlogs }

class SubscriptionContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedEmail: '',
      success: ''
    }
  }

  handleChange = (event) => {
    this.setState({selectedEmail: event.target.value});
  }

  handleUpdate = async (event) => {
    const { selectedEmail } = this.state
    const { subscribeBlogs } = this.props
    event.preventDefault();
    if (selectedEmail == '') {
      this.setState({success: 'Email Address Required'})
      this.closeAlertLater();
    }
    else if(!selectedEmail.includes('@')){
      this.setState({ success: 'Please put the correct email address'})
      this.closeAlertLater();
    }
    if(selectedEmail && selectedEmail.includes('@')){
      await subscribeBlogs({email: selectedEmail})
      .then(() => {
        this.setState({ success: 'Subscribed Successfully', selectedEmail: ''})
        this.closeAlertLater();
        })
        .catch((error) => {
        this.setState({ success: error.message})
        this.closeAlertLater();
        })
    }
  }

  closeAlertLater = () => {
    setTimeout(() => {
      this.setState({
        success: ''
      })
    }, 1500);
  }

  render() {
    return (
      <Row className="subscribe-section">
        <Col lg={6} className='subscribe'>
            <div>
              <h5>Subscribe to Stay Connected</h5>
              <p>Please enter your email address for our newsletters</p>
            </div>
        </Col>
        <Col lg={6} className='subscribe-form'>
          <SubscriptionForm
            handleChange={this.handleChange}
            handleUpdate={this.handleUpdate}
            success={this.state.success}
            selectedEmail={this.state.selectedEmail}
          />
        </Col>
      </Row>
    )
  }
}

SubscriptionContainer.propTypes = {
  subscribeBlogs: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(SubscriptionContainer)
