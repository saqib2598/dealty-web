import React, { useState} from 'react';
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

const senderMessage = (props) => {

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
      <div className='sender-all-messages'>
        <img className='profile-pic-small-inmessage-sender' src={props.userImage(props.user.image)} />
        <div className='individual-message-sender'>
          {props.message.body !== 'file' ?
            <>
              <div className='sent-message-sender'>{props.message.body}</div>
              <div className='sender-message-under-info'>
                <p className='realtime-message-time'>{props.date.format('LT')}</p>
                  {props.readflag === true ?
                    <img className='green-ticks' src='../../../static/images/inbox/greentick.svg' />
                    :
                    <img className='green-ticks' src='../../../static/images/unread-tick.png' />
                  }
              </div>
            </>
            :
            <div className='sender-all-messages'>
              <div className='individual-message-sender'>
                <div className='attachment-holder' onClick={openModal}>
                  <img className='sent-message-sender-attachment' src={props.message.attachment} />
                </div>
                <div className='sender-attachment-under-info'>
                  <p className='realtime-message-time'>{props.date.format('LT')}</p>
                  {props.readflag === true ?
                    <img className='green-ticks' src='../../../static/images/inbox/greentick.svg' />
                    :
                    <img className='green-ticks' src='../../../static/images/unread-tick.png' />
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}

senderMessage.propTypes = {
  message: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  readflag: PropTypes.object.isRequired,
  date: PropTypes.object.isRequired,
  userImage: PropTypes.object.isRequired
}

export default senderMessage