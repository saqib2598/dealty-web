import { retrieveChatRooms, updateChatRoomsUnReadCount } from '../modules/chatRooms'
import { setNotification } from '../modules/notification'
import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { pusher } from '../static/data/pusher'

const mapDispatchToProps = { retrieveChatRooms, setNotification, updateChatRoomsUnReadCount }

const NotificationSubscription = ({
  retrieveChatRooms,
  setNotification,
  user,
  updateChatRoomsUnReadCount
}) => {

  const audio = new Audio('../static/audios/notification.mp3')

  const notificationPermission = () => {
    if (Notification.permission !== "granted") {
      if (!("Notification" in window)) {
        console.log("This browser does not support desktop notification");
      } else {
        Notification.requestPermission();
      }
    }
  }

  const showNotification = (message) => {
    let options = {
      icon: 'https://res.cloudinary.com/haqkfrsyz/image/upload/v1547576785/logo-footer.png',
      body: message.body
    }
    new Notification('New Message', options)
  }

  const subscribe = chatRooms => {
    notificationPermission()
    let channels = [];
    setNotification(false)
    chatRooms.forEach(element => {
      channels = [...channels, pusher.subscribe('room-' + element.id)]
      if (element.unreads && element.unreads > 0)
        setNotification(true)
    })

    channels.forEach(element => {
      bindNotifyEvent(element)
    })

    const newChatChannel = pusher.subscribe('new-chat')
    newChatChannel.bind('create', data => {
      if (user.id !== data.user_id) {
        const channel = pusher.subscribe('room-' + data.id)
        bindNotifyEvent(channel)
      }
    })
  }

  const bindNotifyEvent = channel => {
    channel.unbind('notify')
    channel.bind('notify', data => {
      if (user.id !== data.user_id) {
        setNotification(true)
        updateChatRoomsUnReadCount({ id: data.chat_room_id, unread: 1 })
        audio.play()
        showNotification(data)
      }
    })
  }

  useEffect(() => {
    retrieveChatRooms().then(response => {
      (user && user.id) && subscribe(response)
    });
  }, [user]);
  return <></>;
}

NotificationSubscription.propTypes = {
  retrieveChatRooms: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  updateChatRoomsUnReadCount: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default connect(null, mapDispatchToProps)(NotificationSubscription);
