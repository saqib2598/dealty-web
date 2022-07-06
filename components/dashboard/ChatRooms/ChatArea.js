import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { Container, Row, Col } from 'reactstrap'
import Layout from '../../Layout'
import '../../../styles/_inbox.scss'
import Loading from '../../Loading'
import InputForm from '../../inbox/InputForm'
import AllMessages from '../../inbox/AllMessages'
import ChatList from '../../inbox/ChatList'


const chatArea = (props) => {
  const [searchVar, setSearch] = useState('')

  function updateSearch(event) {
    setSearch(event.target.value.substr(0,20))
  }

  function userImage(img) {
    let image = '../../../static/images/user_account_pic.png'
    if (img !== null && img !== undefined){
      image = img
    }
    return image
  }
  let filteredChatRooms = props.chat_rooms.filter(
    (chat) => {
      return chat.user.displayName.indexOf(searchVar) !== -1;
    }
  );

  useEffect(() => {
    let elem = document.getElementById('column-2')
    elem.scrollTop = elem.scrollHeight
  });

  return (
    <Layout headerStyle="teal" bodyBg="light" footerStyle="white">
      <Head>
        <title>inbox</title>
      </Head>
      <Container className='container-inbox'>

        <Row className='row1'>
          <h3 className='heading'>Inbox</h3>
          <p className='subheading'>View and reply to all messages and inquires</p>
        </Row>

        <Row className='row2'>
          <Col className='col col1' lg={3} xs={12} sm={6}>
            <form>
              <input type='text' className='search-box'
                placeholder='Search...' value={searchVar}
                onChange={updateSearch}
              />
            </form>
            <img className='pencil-icon' src='../../../static/images/inbox/pencil-icon.svg' />
            <div className='chat-profile-holder'>
              <ChatList
                chat_rooms={filteredChatRooms}
                handleActiveChat={props.handleActiveChat}
                userImage={userImage}
                display_messages={props.display_messages}
                display_messages_time={props.display_messages_time}
              />
            </div>
          </Col>

          <Col id='column-2' className='col col2' lg={6} sm={6}>
            <h6 className='receiver-name'>To: {props.chat_room.user.displayName}</h6>
            <div className='all-messages'>
              {props.loading_messages ?
                <Loading />
                :
                <AllMessages
                  user={props.user}
                  messagesRef={props.messagesRef}
                  messages={props.messages}
                  new_messages={props.new_messages}
                  unreadMessagesRef={props.unreadMessagesRef}
                  userImage={userImage}
                  chat_room={props.chat_room}
                />
              }
            </div>
          </Col>


          <Col className='col col3 d-xs-none d-sm-none d-lg-block' lg={3}>
            <img className='profile-pic' src={userImage(props.chat_room.user.image)} />
            <h3 className='profile-name'>{props.chat_room.user.displayName}</h3>
            <p className='profile-location'>{props.chat_room.user.displayUserType}</p>
          </Col>
        </Row>
        <div className="contained-input">
          <InputForm
            handleSubmit={props.handleSubmit}
            markAsReadOnFocus={props.markAsReadOnFocus}
            chat_room={props.chat_room}
            active_chat_id={props.key}
          />
        </div>
      </Container>
    </Layout>
  );

}

chatArea.propTypes = {
  chat_rooms: PropTypes.array,
  active_chat: PropTypes.object,
  handleActiveChat: PropTypes.func.isRequired,
  // unreads: PropTypes.object.isRequired,
  display_messages: PropTypes.object.isRequired,
  display_messages_time: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  markAsReadOnFocus: PropTypes.func.isRequired,
  chat_room: PropTypes.object.isRequired,
  loading_messages: PropTypes.bool.isRequired,
  messages: PropTypes.object,
  user: PropTypes.object.isRequired,
  messagesRef: PropTypes.object.isRequired,
  unreadMessagesRef: PropTypes.object.isRequired,
  new_messages: PropTypes.array.isRequired,
  key: PropTypes.object.isRequired
  // readChatRoomMessages: PropTypes.func.isRequired,
}

export default chatArea;
