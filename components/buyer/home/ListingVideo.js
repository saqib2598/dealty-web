import React from 'react'
import { Row, Col } from 'reactstrap';
import ReactPlayer from 'react-player'

const ListingVideo = ({ home, videoStyle }) => {
  return (
    <Row>
      <Col>
        <div className="player-wrapper">
          {home.video &&
            <ReactPlayer
              width='100%'
              height='100%'
              controls
              url={home.video.url}
              />
          }
        </div>
      </Col>
    </Row>
  )
}

export default ListingVideo;
