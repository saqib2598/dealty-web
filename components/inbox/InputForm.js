import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import InputEmoji from 'react-input-emoji'
import { Form } from 'react-final-form'
import Modal from 'react-modal';
import AttachmentForm from './AttachmentForm'


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


const inputForm = (props) => {
  const textInput = useRef(null);
  const id = props.chat_room.id
  const [ text, setText ] = useState('')
  const [modalIsOpen,setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  function handleOnEnter(text) {
    const message = {
      body: text,
      chat_room_id: id
    }
    props.handleSubmit(message, false)
  }

  function handleAttachmentSubmission() {
    closeModal()
    const form = document.getElementById('attachment-form')
    let valueOfAttachment = form.elements["message[image_attributes][file]"].value
    let jpeg = valueOfAttachment.includes(".jpeg")
    let jpg = valueOfAttachment.includes(".jpg")
    let png = valueOfAttachment.includes(".png")
    if (valueOfAttachment === "") {
      alert("No File Selected")
    }
    else if ((jpeg || jpg || png) && valueOfAttachment !== "") {
      props.handleSubmit(form, true)

    }
    else{
      alert("Only Images Should be Attached")
    }

  }
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <h3>Add Attachment</h3>
        <Form
          component={AttachmentForm}
          onSubmit={handleAttachmentSubmission}
          {...props}
        />
      </Modal>

      <img onClick={openModal} className='plus-sign' src='../../../static/images/inbox/plus-sign.svg' />
      <div className='input-form'>
        <InputEmoji
          ref={textInput}
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Type Something..."
          style={{overflow:scroll}}
        />
      </div>
    </>
  )
}

inputForm.propTypes = {
  handleSubmit: PropTypes.object.isRequired,
  markAsReadOnFocus: PropTypes.object.isRequired,
  chat_room: PropTypes.object.isRequired,
  scroll_ref: PropTypes.object.isRequired,
  active_chat_id: PropTypes.object.isRequired
}

export default inputForm