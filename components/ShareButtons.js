import React from 'react'
import {
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  PinterestIcon,
  TwitterIcon,
  WhatsappIcon
} from "react-share";

const ShareButtons= ({url}) => {
  const size = 50, round = true
  const desc = "See more detail of listing on the web"
  return(
    <div>
      <FacebookShareButton url={url}>
        <FacebookIcon size={size} round={round} />
      </FacebookShareButton>
      <PinterestShareButton url={url} media={desc}>
        <PinterestIcon size={size} round={round} />
      </PinterestShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={size} round={round} />
      </TwitterShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon size={size} round={round} />
      </WhatsappShareButton>
    </div>
  )
}

export default ShareButtons
