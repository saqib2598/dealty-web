import Head from 'next/head'
import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Layout from '../components/Layout'
import '../styles/_inbox.scss'

const inbox2 = () => {
  return (
    <Layout headerStyle="teal" bodyBg="light" footerStyle="white">
      <Head>
        <title>inbox2</title>
      </Head>
      <Container className='container-inbox'>
        <Row className='row1'>
          <h3 className='heading'>Inbox</h3>
          <p className='subheading'>View and reply to all messages and inquires</p>
        </Row>
        <Row className='row2'>
          <Col className='col col1' lg={3} xs={12} sm={6}>
            <form>
              <input type='text' className='search-box' placeholder='Search...' />
            </form>
            <svg className='pencil-icon' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 65.383 58.127'>
              <path id='Path_1' data-name='Path 1' d="M524.284,210.45l3.633-3.632a.912.912,0,0,1,1.555.647V223.97a5.45,
                5.45,0,0,1-5.449,5.448H484.066a5.45,5.45,0,0,1-5.449-5.448V184.013a5.451,5.451,0,0,
                1,5.449-5.449h31.046a.914.914,0,0,1,.647,1.555l-3.632,3.633a.9.9,0,0,
                1-.647.261H484.066V223.97h39.957V211.086A.893.893,0,0,1,524.284,210.45Zm17.776-22.907-29.808,29.809-10.262,
                1.135a4.69,4.69,0,0,1-5.176-5.176l1.135-10.262,29.809-29.809a6.625,6.625,0,0,1,9.387,0l4.9,4.9a6.65,6.65,0,0,
                1,.011,9.4Zm-11.215,3.508-6.595-6.6-21.091,21.1-.828,7.412,7.412-.829ZM538.2,182l-4.9-4.9a1.184,1.184,0,0,
                0-1.68,0l-3.508,3.507,6.6,6.6,3.507-3.508A1.209,1.209,0,0,0,538.2,182Z" transform="translate(-478.617 -171.291)"
                fill="#1999A9" />
            </svg>
            {/* DIFFERENT PROFILE MESSAGES */}
            <div className='chat-profile-holder'>
              <img className='profile-pic-small' src='../static/images/profile-pic.png' />
              <p className='profile-name-small'>Lorem Ipsum<span className='active-div-green'></span></p>
              <p className='message-time-small'>8:38 PM</p>
              <p className='message-small'>Lorem ipsum dolor sit amet, consectetuer adipi</p>
              <hr />
              <img className='profile-pic-small' src='../static/images/profile-pic.png' />
              <p className='profile-name-small'>Lorem Ipsum<span className='active-div-green'></span></p>
              <p className='message-time-small'>8:38 PM</p>
              <p className='message-small'>Lorem ipsum dolor sit amet, consectetuer adipi</p>
              <hr />
              <img className='profile-pic-small' src='../static/images/profile-pic.png' />
              <p className='profile-name-small'>Lorem Ipsum<span className='active-div-yellow'></span></p>
              <p className='message-time-small'>8:38 PM</p>
              <p className='message-small'>Lorem ipsum dolor sit amet, consectetuer adipi</p>
              <hr />
              <img className='profile-pic-small' src='../static/images/profile-pic.png' />
              <p className='profile-name-small'>Lorem Ipsum<span className='active-div-yellow'></span></p>
              <p className='message-time-small'>8:38 PM</p>
              <p className='message-small'>Lorem ipsum dolor sit amet, consectetuer adipi</p>
              <hr />
              <img className='profile-pic-small' src='../static/images/profile-pic.png' />
              <p className='profile-name-small'>Lorem Ipsum<span className='active-div-yellow'></span></p>
              <p className='message-time-small'>8:38 PM</p>
              <p className='message-small'>Lorem ipsum dolor sit amet, consectetuer adipi</p>
              <hr />
              <img className='profile-pic-small' src='../static/images/profile-pic.png' />
              <p className='profile-name-small'>Lorem Ipsum<span className='active-div-yellow'></span></p>
              <p className='message-time-small'>8:38 PM</p>
              <p className='message-small'>Lorem ipsum dolor sit amet, consectetuer adipi</p>
              <hr />
            </div>
          </Col>
          <Col className='col col2' lg={6} sm={6}>
            <h6 className='receiver-name'>To: Randy</h6>
            <div className='all-messages'>
              {/* RECEIVER MESSAGES ATTACHMENT */}
              <div className='receiver-all-messages'>
                <img className='profile-pic-small-inmessage-receiver' src='../static/images/profile-pic.png' />
                  <div className='attachment-holder-receiver'>
                    <img className='sent-message-sender-attachment' src='../static/images/profile-pic.png' />
                    <img className='download-attachment' src='../static/images/download-btn.png' />
                  </div>
                  <div className='receiver-attachment-under-info'>
                    <p className='realtime-message-time'>8:39 PM</p>
                  </div>
              </div>

              {/* SENDER MESSAGES */}
              <div className='sender-all-messages'>
                <img className='profile-pic-small-inmessage-sender' src='../static/images/profile-pic.png' />
                <div className='individual-message-sender'>
                  <div className='sent-message-sender'>Hey, Yes it is available. Do you want to Visit?</div>
                  <div className='sender-message-under-info'>
                    <p className='realtime-message-time'>8:32 PM</p>
                    <svg className='green-ticks' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14.999 15'>
                      <path id='Path_30' data-name='Path 30' d="M1004.185,539.121l-1.16-1.16a.7.7,0,0,0-.993,0l-7.015,
                        7.016-3.264-3.266a.7.7,0,0,0-.993,0l-1.163,1.162a.7.7,0,0,0,0,1l4.922,4.924a.7.7,0,0,0,.993,
                        0l8.67-8.676a.705.705,0,0,0,0-1Zm-9.5,3.105a.464.464,0,0,0,.662,0l6.092-6.1a.47.47,0,0,0,
                        0-.662l-1.324-1.327a.466.466,0,0,0-.662,0l-4.437,4.438-1.623-1.626a.466.466,0,0,0-.662,0l-1.327,
                        1.327a.47.47,0,0,0,0,.662l3.281,3.287Z" transform="translate(-989.391 -534)" fill="lime" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* RECEIVER MESSAGES */}
              <div className='receiver-all-messages'>
                <img className='profile-pic-small-inmessage-receiver' src='../static/images/profile-pic.png' />
                <div className='individual-message-receiver'>
                  <div className='sent-message-receiver'>Yes, Gladly. When are You Free?</div>
                  <div className='receiver-message-under-info'>
                    <p className='realtime-message-time'>8:33 PM</p>
                  </div>
                </div>
              </div>

              {/* SENDER MESSAGES ATTACHMENT */}
              <div className='sender-all-messages'>
                <img className='profile-pic-small-inmessage-sender' src='../static/images/profile-pic.png' />
                <div className='individual-message-sender'>
                  <div className='attachment-holder'>
                    <img className='sent-message-sender-attachment' src='../static/images/profile-pic.png' />
                    <img className='download-attachment' src='../static/images/download-btn.png' />
                  </div>
                  <div className='sender-attachment-under-info'>
                    <p className='realtime-message-time'>8:39 PM</p>
                    <svg className='green-ticks' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14.999 15'>
                      <path id='Path_30' data-name='Path 30' d="M1004.185,539.121l-1.16-1.16a.7.7,0,0,0-.993,0l-7.015,
                        7.016-3.264-3.266a.7.7,0,0,0-.993,0l-1.163,1.162a.7.7,0,0,0,0,1l4.922,4.924a.7.7,0,0,0,.993,
                        0l8.67-8.676a.705.705,0,0,0,0-1Zm-9.5,3.105a.464.464,0,0,0,.662,0l6.092-6.1a.47.47,0,0,0,
                        0-.662l-1.324-1.327a.466.466,0,0,0-.662,0l-4.437,4.438-1.623-1.626a.466.466,0,0,0-.662,0l-1.327,
                        1.327a.47.47,0,0,0,0,.662l3.281,3.287Z" transform="translate(-989.391 -534)" fill="lime" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* RECEIVER MESSAGES */}
              <div className='receiver-all-messages'>
                <img className='profile-pic-small-inmessage-receiver' src='../static/images/profile-pic.png' />
                <div className='individual-message-receiver'>
                  <div className='sent-message-receiver'>Yes, Gladly. When are You Free?</div>
                  <div className='receiver-message-under-info'>
                    <p className='realtime-message-time'>8:33 PM</p>
                  </div>
                </div>
              </div>

              {/* SENDER MESSAGES */}
              <div className='sender-all-messages'>
                <img className='profile-pic-small-inmessage-sender' src='../static/images/profile-pic.png' />
                <div className='individual-message-sender'>
                  <div className='sent-message-sender'>Hey, Yes it is available. Do you want to Visit?</div>
                  <div className='sender-message-under-info'>
                    <p className='realtime-message-time'>8:32 PM</p>
                    <svg className='green-ticks' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14.999 15'>
                      <path id='Path_30' data-name='Path 30' d="M1004.185,539.121l-1.16-1.16a.7.7,0,0,0-.993,0l-7.015,
                        7.016-3.264-3.266a.7.7,0,0,0-.993,0l-1.163,1.162a.7.7,0,0,0,0,1l4.922,4.924a.7.7,0,0,0,.993,
                        0l8.67-8.676a.705.705,0,0,0,0-1Zm-9.5,3.105a.464.464,0,0,0,.662,0l6.092-6.1a.47.47,0,0,0,
                        0-.662l-1.324-1.327a.466.466,0,0,0-.662,0l-4.437,4.438-1.623-1.626a.466.466,0,0,0-.662,0l-1.327,
                        1.327a.47.47,0,0,0,0,.662l3.281,3.287Z" transform="translate(-989.391 -534)" fill="lime" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* RECEIVER MESSAGES */}
              <div className='receiver-all-messages'>
                <img className='profile-pic-small-inmessage-receiver' src='../static/images/profile-pic.png' />
                <div className='individual-message-receiver'>
                  <div className='sent-message-receiver'>Yes, Gladly. When are You Free?</div>
                  <div className='receiver-message-under-info'>
                    <p className='realtime-message-time'>8:33 PM</p>
                  </div>
                </div>
              </div>

              {/* SENDER MESSAGES */}
              <div className='sender-all-messages'>
                <img className='profile-pic-small-inmessage-sender' src='../static/images/profile-pic.png' />
                <div className='individual-message-sender'>
                  <div className='sent-message-sender'>Hey, Yes it is available. Do you want to Visit?</div>
                  <div className='sender-message-under-info'>
                    <p className='realtime-message-time'>8:32 PM</p>
                    <img className='green-ticks' src='../static/images/single-tick.png' />
                  </div>
                </div>
              </div>

              {/* RECEIVER MESSAGES TYPING */}
              <div className='receiver-all-messages'>
                <img className='profile-pic-small-inmessage-receiver' src='../static/images/profile-pic.png' />
                <div className='individual-message-receiver-typing'>
                  <p className='typing'>Typing...</p>
                </div>
              </div>
            </div>

            <div className='input-form-container'>
              <form className='message-form'>
                <svg className='plus-sign' xmlns='http://www.w3.org/2000/svg' width='20' height='32' viewBox='0 0 24 40'>
                  <text data-name='+' transform='translate(0 31)' fill='#1999A9' fontSize='39.77' fontFamily='Helvetica'>
                    <tspan x='0' y='0'>+</tspan>
                  </text>
                </svg>
                <input className='message-input' type='text' placeholder='Type Something...' />
                <h6 className='send-btn-msg'>Send</h6>
              </form>
            </div>
          </Col>
          <Col className='col col3 d-xs-none d-sm-none d-lg-block' lg={3}>
            <img className='profile-pic' src='../static/images/profile-pic.png' />
            <h3 className='profile-name'>Randy</h3>
            <p className='profile-location'>Lorem Ipsum</p>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default inbox2;