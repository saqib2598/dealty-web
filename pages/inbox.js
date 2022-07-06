import React, { Component } from "react";
import { connect } from "react-redux";
import ChatList from "../components/dashboard/ChatRooms/ChatList";
import ChatBox from "../components/dashboard/ChatRooms/ChatBox";
import ChatArea from "../components/dashboard/ChatRooms/ChatArea";
import { acceptInvitation, selectUser } from "../modules/users";
import {
  retrieveChatRooms,
  readChatRoomMessages,
  updateChatRoomsUnReadCount,
} from "../modules/chatRooms";
import Layout from "../components/Layout";
import Head from "next/head";
import SubheaderPageTitle from "../components/SubheaderPageTitle";
import { Container } from "reactstrap";
import Loading from "../components/Loading";
import { createMessage, retrieveMessages } from "../modules/messages";
import PropTypes from "prop-types";
import { pusher } from "../static/data/pusher";
import { setNotification } from "../modules/notification";

const mapDispatchToProps = {
  retrieveChatRooms,
  createMessage,
  retrieveMessages,
  selectUser,
  readChatRoomMessages,
  setNotification,
  updateChatRoomsUnReadCount,
};

const mapStateToProps = (state) => ({
  chat_rooms: state.chatRooms.chat_rooms,
  messages: state.messages.messages,
  user: selectUser(state),
});

class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      active_chat: null,
      loading_messages: false,
      messages: {},
      new_messages: [],
      unreads: {},
      display_messages: {},
      display_messages_time: {},
      mobile_screen: false,
    };
    this.messagesRef = React.createRef();
    this.unreadMessagesRef = React.createRef();
  }

  async componentDidMount() {
    const { retrieveChatRooms } = this.props;
    this.setState({ loading: true });
    await retrieveChatRooms();
    if (this.props.chat_rooms.length == 0) {
      this.setState({ loading: false });
      return;
    }

    this.setState({
      loading: false,
    });

    const active_chat_room = this.props.initialChatId
      ? this.props.chat_rooms.filter(
          (room) => room.id == this.props.initialChatId
        )[0]
      : this.props.chat_rooms[0];
    if (window.outerWidth > 767) {
      this.handleActiveChat(active_chat_room);
    } else {
      this.setState({ mobile_screen: true });
    }
    let channels = [];
    this.props.chat_rooms.forEach((element) => {
      channels = [...channels, pusher.subscribe("room-" + element.id)];
      this.handleDisplayMessage({
        chat_room_id: element.id,
        body: element.displayMessage,
        time: element.displayMessageTime,
      });
    });

    this.setUnReadsChatListCount();

    channels.forEach((element) => {
      element.bind("send", (data) => {
        if (data.chat_room_id === this.state.active_chat.id) {
          this.setState({ new_messages: [...this.state.new_messages, data] });
          this.scrollToLastMessage();
        } else {
          this.handleUnreadMessagesCount(data);
        }
        this.handleDisplayMessage(data);
      });
    });
  }

  handleActiveChat = async (active_chat) => {
    const { retrieveMessages } = this.props;

    this.setState({ active_chat: active_chat, loading_messages: true });
    await retrieveMessages(active_chat.id);
    this.setState({ loading_messages: false });
    this.setState({ messages: this.props.messages });
    this.setState({ new_messages: [] });
    this.resetUnReadMessageCount(active_chat.id);
    this.setChatRoomsUnReadCount(active_chat.id, 0);
    this.props.messages.unreadMessages &&
      (this.props.messages.unreadMessages.length > 0
        ? this.scrollToUnreadMessage()
        : this.scrollToLastMessage());
  };

  setChatRoomsUnReadCount = (chat_room_id, unread) => {
    const { updateChatRoomsUnReadCount } = this.props;
    updateChatRoomsUnReadCount({ id: chat_room_id, unread: unread });
  };

  setUnReadsChatListCount = () => {
    if (this.props.chat_rooms && this.props.chat_rooms.length == 0) return;
    let unReadChatBox = {};
    this.props.chat_rooms.forEach((element) => {
      unReadChatBox[`${element.id}`] = element.unreads;
    });
    this.setState({ unreads: unReadChatBox });
  };

  handleUnreadMessagesCount = (data) => {
    let unReadCount = this.state.unreads;
    unReadCount[data.chat_room_id] = (unReadCount[data.chat_room_id] || 0) + 1;
    this.setState({ unreads: unReadCount });
  };

  resetUnReadMessageCount = (chat_room_id) => {
    let unReadCount = this.state.unreads;
    unReadCount[chat_room_id] = 0;
    this.setState({ unreads: unReadCount });
  };

  handleDisplayMessage = (data) => {
    let displayMessages = this.state.display_messages;
    let displayMessagesTime = this.state.display_messages_time;
    displayMessages[data.chat_room_id] = data.body;
    displayMessagesTime[data.chat_room_id] = data.time;
    this.setState({ display_messages: displayMessages });
    this.setState({ display_messages_time: displayMessagesTime });
  };

  sendMessage = async (form, flag) => {
    const { createMessage } = this.props;
    const { active_chat } = this.state;
    if (flag) {
      form.elements["message[chat_room_id]"].value = active_chat.id;
      form.elements["message[body]"].value = "file";
      const formData = new FormData(form);
      await createMessage(formData);
    } else {
      await createMessage(form);
    }
  };

  scrollToLastMessage = () => {
    if (this.messagesRef && this.messagesRef.current) {
      this.messagesRef.current.scrollTop =
        this.messagesRef.current.scrollHeight;
    }
  };

  scrollToUnreadMessage = async () => {
    if (this.unreadMessagesRef && this.unreadMessagesRef.current) {
      this.unreadMessagesRef.current.scrollIntoView();
      const { readChatRoomMessages } = this.props;
      const { active_chat } = this.state;
      await readChatRoomMessages(active_chat.id);
    }
  };

  handleNotification = (message) => {
    const { user } = this.props;
    if (!message || (message.userId || message.user_id) == user.id) {
      return;
    }
  };

  markAsReadOnFocus = (id) => {
    let unreads = this.state.unreads;
    unreads[id] = 0;
    let readList = this.state.messages.readMessages;
    let unreadList = this.state.messages.unreadMessages;
    if (
      unreadList !== null &&
      unreadList !== undefined &&
      unreadList.length > 0
    ) {
      readList = [...readList, ...unreadList];
      unreadList = [];
    }
    this.setState({
      unreads: unreads,
      messages: { readMessages: readList, unreadMessages: unreadList },
    });

    var isUnReadMessage = false;
    for (const property in unreads) {
      if (unreads[property] > 0) isUnReadMessage = true;
    }
    this.setChatRoomsUnReadCount(id, 0);
    this.props.setNotification(isUnReadMessage);
  };

  render() {
    const { chat_rooms, user } = this.props;
    const {
      loading,
      active_chat,
      loading_messages,
      messages,
      new_messages,
      unreads,
      display_messages,
      display_messages_time,
      mobile_screen,
    } = this.state;

    return (
      <>
        {loading ? (
          <Loading />
        ) : chat_rooms && chat_rooms.length > 0 ? (
          <>
            {active_chat && (
              <>
                {mobile_screen && (
                  <span
                    onClick={() => {
                      this.setState({ active_chat: null });
                    }}
                  >
                    « Back
                  </span>
                )}
                <ChatArea
                  chat_rooms={chat_rooms}
                  handleActiveChat={this.handleActiveChat}
                  active_chat={active_chat}
                  unreads={unreads}
                  display_messages={display_messages}
                  display_messages_time={display_messages_time}
                  markAsReadOnFocus={this.markAsReadOnFocus}
                  handleSubmit={this.sendMessage}
                  chat_room={active_chat}
                  messages={messages}
                  loading_messages={loading_messages}
                  user={user}
                  messagesRef={this.messagesRef}
                  unreadMessagesRef={this.unreadMessagesRef}
                  new_messages={new_messages}
                  key={active_chat.id}
                />
              </>
            )}
          </>
        ) : (
          <Layout headerStyle='teal' bodyBg='light' footerStyle='white'>
            <h1 style={{ paddingTop: "100px", textAlign: "center" }}>
              Please initiate a chat first
            </h1>
          </Layout>
        )}
      </>
    );
  }
}

Inbox.getInitialProps = ({ query }) => {
  let props = {
    initialChatId: query.id,
  };
  return props;
};

Inbox.propTypes = {
  retrieveChatRooms: PropTypes.func.isRequired,
  chat_rooms: PropTypes.array,
  createMessage: PropTypes.func.isRequired,
  retrieveMessages: PropTypes.func.isRequired,
  messages: PropTypes.object,
  selectUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  readChatRoomMessages: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  updateChatRoomsUnReadCount: PropTypes.func.isRequired,
  initialChatId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
