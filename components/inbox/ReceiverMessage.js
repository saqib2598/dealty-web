import React, { useState } from 'react';
import PropTypes from 'prop-types'
import Modal from 'react-modal'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    marginLeft            : '15%',
    transform             : 'translate(-90%, -50%)'
  }
};

const receiverMessage = (props) =>{
  const [modalIsOpen,setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  return (
    <>
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={customStyles}
        >
        <img className='modal-image' src={props.message.attachment} />
      </Modal>
      <div className='receiver-all-messages'>
        <img className='profile-pic-small-inmessage-receiver' src={props.userImage(props.chat_room.user.image)} />
        <div className='individual-message-receiver'>
          {props.message.body !== 'file' ?
            <>
              <div className='sent-message-receiver'>{props.message.body}</div>
              <div className='receiver-message-under-info'>
                <p className='realtime-message-time'>{props.date.format('LT')}</p>
              </div>
            </>
            :
            <div className='receiver-all-messages'>
                <div className='attachment-holder-receiver' onClick={openModal}>
                  <img className='sent-message-sender-attachment' src={props.message.attachment} />
                </div>
                <div className='receiver-attachment-under-info'>
                <p className='realtime-message-time'>{props.date.format('LT')}</p>
                </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}

receiverMessage.propTypes = {
  message: PropTypes.object.isRequired,
  date: PropTypes.object.isRequired,
  userImage: PropTypes.object.isRequired,
  chat_room: PropTypes.object.isRequired
}

export default receiverMessage