import React from 'react'
import '../../../styles/_lead-chat-modal.scss'
import InputMask from 'react-input-mask'
import PropTypes from 'prop-types'
import { FaUser, FaPhone, FaEnvelope } from 'react-icons/fa'
import { Button } from 'reactstrap'

const modalContent = (props) => {

  return (
    <>
      {props.home === undefined ?
        <h5>CONTACT <span className="owner-name">{props.user.firstName} {props.user.lastName}</span></h5>
        :
        <h5>CONTACT <span className="owner-name">{props.home.owner.firstName} {props.home.owner.lastName}</span></h5>
      }
      <form className="form" onSubmit={props.handleModalSubmit }>
        <FaUser className="user-icon" />
        <FaUser className="user-icon2" />
        <FaPhone className="phone-icon" />
        <FaEnvelope className="email-icon" />
        <input name='firstname' className="input-fields firstname" placeholder="First Name" required />
        <input name='lastname' className="input-fields lastname" placeholder="Last Name" required />
        <InputMask name='phone' className="input-fields phone" placeholder="Phone" mask="+1 999 999 9999" maskChar=" " required />
        <input name='email' type="email" className="input-fields email" placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required />
        <textarea name='message' className="input-text-box" placeholder="Type Your Message..." required />
        <Button className="submit-btn" type="submit">
          {props.submitting ?
            'Sending...'
            :
            'Submit'
          }
        </Button>
      </form>
    </>
  )
}
modalContent.propTypes = {
  home: PropTypes.object.isRequired,
  handleModalSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  toggleChatOpenLead: PropTypes.func.isRequired,
  toggleSuccessOpen: PropTypes.func.isRequired

}
export default modalContent;
