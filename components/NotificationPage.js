import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'

const notificationPage = props => (
  <div className="notification" align="center">
    <Head><title>Dealty | Notification</title></Head>
    <h1>{props.wish}</h1>
    <h5>{props.message}</h5>
    <h5>{props.regards}</h5>
    <style jsx="true">{`
      .notification{
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: #007793;
        padding-top: 15%;
        color: white;

        :global(a:hover) {
          color: darkturquoise;
        }
      }
    `}
    </style>
  </div>
)

notificationPage.propTypes = {
  wish: PropTypes.string,
  message: PropTypes.any,
  regards: PropTypes.string
}

export default notificationPage
