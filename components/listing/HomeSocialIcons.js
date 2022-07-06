import React from 'react'
import PropTypes from 'prop-types'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton
} from "react-share";

const homeSocialIcons = () => {
  const url = window.location.href

  return <ul className="social_icons">
    <li>
      <EmailShareButton url={url}>
        <a className="share_icon" href="#"></a>
      </EmailShareButton>
    </li>
    <li>
      <FacebookShareButton url={url}>
        <a className="facebook" href="#"></a>
      </FacebookShareButton>
    </li>
    <li>
      <TwitterShareButton url={url}>
        <a href="#"></a>
      </TwitterShareButton></li>
    <li>
      <WhatsappShareButton url={url}>
        <a className="whatsapp" href="#"></a>
      </WhatsappShareButton>
    </li>
  </ul>
}

homeSocialIcons.propTypes = {
  home: PropTypes.object.isRequired,
}

export default homeSocialIcons
