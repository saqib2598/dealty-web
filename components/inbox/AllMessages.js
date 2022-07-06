import React from 'react';
import moment from 'moment'
import SenderMessage from './SenderMessage'
import ReceiverMessage from './ReceiverMessage'
import PropTypes from 'prop-types'

const allMessages = (props) => {

  function renderMessages(messages, readflag) {
    return messages.map(message => {
      let date = moment(message.createdAt)

      return (
        <>
          {((message.userId || message.user_id) == props.user.id) ?
            <SenderMessage
              readflag={readflag}
              message={message}
              user={props.user}
              date={date}
              userImage={props.userImage}
            />
            :
            <ReceiverMessage
              userImage={props.userImage}
              chat_room={props.chat_room}
              message={message}
              date={date}
            />
          }
        </>
      )
    })
  }

  return (
    <div className='messages-container' ref={props.messagesRef}>
      {(props.messages.readMessages && props.messages.readMessages.length > 0) ||
      (props.messages.unreadMessages && props.messages.unreadMessages.length > 0) ||
      (props.new_messages && props.new_messages.length > 0) ?
        <>
          {renderMessages(props.messages.readMessages, true)}
          {props.messages.unreadMessages.length > 0 &&
            <>
              <div className='badge badge-success unread-message' ref={props.unreadMessagesRef}>Unread Messages</div>
              {renderMessages(props.messages.unreadMessages, false)}
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
        <div align='center'>
          <h1>No messages yet</h1>
          <h5>Send Your first message</h5>
        </div>
      }
    </div>
  )
}
allMessages.propTypes = {
  chat_rooms: PropTypes.array,
  active_chat: PropTypes.object,
  handleActiveChat: PropTypes.func.isRequired,
  display_messages: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  markAsReadOnFocus: PropTypes.func.isRequired,
  chat_room: PropTypes.object.isRequired,
  loading_messages: PropTypes.bool.isRequired,
  messages: PropTypes.object,
  user: PropTypes.object.isRequired,
  messagesRef: PropTypes.object.isRequired,
  unreadMessagesRef: PropTypes.object.isRequired,
  new_messages: PropTypes.array.isRequired,
  userImage: PropTypes.object.isRequired
}

export default allMessages
