import React, { useEffect } from "react";
import { Form, Field } from 'react-final-form'
import { Button } from 'reactstrap'
import InputAdapter from '../../InputAdapter'
import PropTypes from 'prop-types'
import Loading from '../../Loading';
import moment from 'moment'
import { connect } from 'react-redux'
import { readChatRoomMessages } from '../../../modules/chatRooms'
import { useWindowUnloadEffect } from './useWindowUnloadEffect'

const mapDispatchToProps = { readChatRoomMessages }

const chatBox = (props) => {
  let currentDate = null

  useWindowUnloadEffect(() => props.readChatRoomMessages(props.chat_room.id), true)

  useEffect(() => {
    return () => {
      props.readChatRoomMessages(props.chat_room.id)
    }
  }, [])
  const firstName = props.chat_room.user.displayName.split(' ')[0]
  function renderMessages(messages) {
    return messages.map(message => {
      let date = moment(message.createdAt)
      let ldate = date.format('l')
      let show_date = false
      if (currentDate != ldate) {
        currentDate = ldate
        show_date = true
      }

      if (message.chat_room_id && props.chat_room.id !== message.chat_room_id) return
      return (
        <>
          {show_date &&
            <>
              <span className='badge badge-pill badge-light sticky'>{ldate}</span>
              <hr />
            </>
          }
          <div
            className='message'
            style={{
              marginLeft: `${(message.userId || message.user_id) == props.user.id ? 'auto' : '0px'}`,
              background: `${(message.userId || message.user_id) == props.user.id ? '#09c3cc' : 'rgba(0,0,0,0.1)'}`
            }}
            key={message.id}>
            {message.body}
            <br />
            <div align='right' className='text-muted'><small>{date.format('LT')}</small></div>
          </div>
        </>
      )
    })
  }

  return (
    <div className='chat-box-container'>
      {props.loading_messages ?
        <Loading />
        :
        <>
          <h5 style={{textAlign: 'center'}}>{props.chat_room.user.displayName}</h5>
          <hr />
          <div className='messages-container' ref={props.messagesRef}>
            {(props.messages.readMessages && props.messages.readMessages.length > 0) ||
             (props.messages.unreadMessages && props.messages.unreadMessages.length > 0) ||
             (props.new_messages && props.new_messages.length > 0) ?
              <>
                {renderMessages(props.messages.readMessages)}
                {props.messages.unreadMessages.length > 0 &&
                  <>
                    <div className='badge badge-success unread-message' ref={props.unreadMessagesRef}>Unread Messages</div>
                    {renderMessages(props.messages.unreadMessages)}
                  </>
                }
                <>
                  {props.new_messages.length > 0 &&
                    <>
                      {renderMessages(props.new_messages)}
                    </>
                  }
                </>
              </>
              :
              <div className='send-message' align='center'>
                <h3>{`Send a message to ${firstName}`}</h3>
              </div>
            }
          </div>
          <Form
            onSubmit={props.handleSubmit}
            render={({ handleSubmit, form, submitting, pristine }) => (
              <form
                onSubmit={event => {
                  handleSubmit(event).then(() => form.reset())
                }}
              >
                <hr />
                <div className='message-input-container'>
                  <Field
                    onFocus={() => { props.markAsReadOnFocus(props.chat_room.id) }}
                    id="body"
                    name="body"
                    type="text"
                    autoComplete='off'
                    component={InputAdapter} />
                  <Button
                    color="info"
                    block
                    type="submit"
                    disabled={ submitting || pristine }>
                    Send
                  </Button>
                </div>
              </form>
            )}
          />
        </>
      }
    </div>
  );
}

chatBox.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  markAsReadOnFocus: PropTypes.func.isRequired,
  chat_room: PropTypes.object.isRequired,
  loading_messages: PropTypes.bool.isRequired,
  messages: PropTypes.object,
  user: PropTypes.object.isRequired,
  messagesRef: PropTypes.object.isRequired,
  unreadMessagesRef: PropTypes.object.isRequired,
  new_messages: PropTypes.array.isRequired,
  readChatRoomMessages: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(chatBox)
