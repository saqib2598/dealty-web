import React from 'react';
import ShortenText from '../ShortenText'
import Moment from 'react-moment';
import PropTypes from 'prop-types'

const chatList = (props) => {
  return (
    <>
      {props.chat_rooms.map((chat) => {
        return (
          <div className='individual-chat-list' key={chat.id} onClick={() => props.handleActiveChat(chat)}>
            <img className='profile-pic-small' src={props.userImage(chat.user.image)}></img>
            <p className='profile-name-small'>{chat.user.displayName}</p>
            <p className='message-time-small'>
              {
                props.display_messages_time[chat.id] === null ?
                <></>
                :
                <Moment format="hh:mm A">
                  {props.display_messages_time[chat.id]}
                </Moment>
              }
            </p>
            <p className='message-small'>{ShortenText(props.display_messages[chat.id], 20, '...')}</p>
            <hr />
          </div>
        )
      })}
    </>
  )
}

chatList.propTypes = {
  chat_rooms: PropTypes.array,
  userImage: PropTypes.object.isRequired,
  handleActiveChat: PropTypes.object.isRequired,
  display_messages: PropTypes.object.isRequired,
  display_messages_time: PropTypes.object.isRequired
}

export default chatList