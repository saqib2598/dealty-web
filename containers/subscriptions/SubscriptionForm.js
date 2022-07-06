import React from 'react'
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import { alertStyle } from '../../components/modals/styles/Modal'

const SubscriptionForm = (props) =>  {
  
    return (
      <> 
        {
          props.success !== '' &&
            <Alert color={props.success == 'Subscribed Successfully' ? 'success' : 'danger'} style={alertStyle}>{props.success}</Alert>
        }
        <form onSubmit={props.handleUpdate}>
          <input className="search-bar" type="text" value={props.selectedEmail} placeholder="Email*" onChange={props.handleChange}/>
          <button className="search-button" type="submit">Subscribe</button>
        </form>
      </>
    )
}

SubscriptionForm.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  success: PropTypes.string,
  selectedEmail: PropTypes.string
}

export default SubscriptionForm;
