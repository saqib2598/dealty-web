import React from "react";
import UserImage from '../../UserImage'
import ShortenText from '../../../components/ShortenText'
import PropTypes from 'prop-types'

const chatList =  (props) => (
  <div className='chat-list-items'>
    {props.chat_rooms.map(chat => {
      return (
        <div
          className={`chat-list-item ${props.active_chat && chat.id == props.active_chat.id ? 'active' : null }`}
          key={chat.id}
          onClick={() => props.handleActiveChat(chat)}
        >
          <div className='chat-list-box'>
            <div className='user-info'>
              <UserImage img={chat.user.displayImage}/>
              <strong>{ShortenText(chat.user.displayName, 10, '.')}</strong>
            </div>
            <p className='message-info'>
              <small>
                {ShortenText(props.display_messages[chat.id], 20, '...')}
              </small>
              {props.unreads[`${chat.id}`] > 0 && <span className='badge badge-success'>{props.unreads[`${chat.id}`] < 100 ? props.unreads[`${chat.id}`] : '99+'}</span>}
            </p>
          </div>
        </div>
      );
    })}
  </div>
);

chatList.propTypes = {
  chat_rooms: PropTypes.array,
  active_chat: PropTypes.object,
  handleActiveChat: PropTypes.func.isRequired,
  unreads: PropTypes.object.isRequired,
  display_messages: PropTypes.object.isRequired
}

export default chatList;
