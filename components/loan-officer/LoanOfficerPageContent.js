import React, { useState, Fragment } from "react"
import { Container, Button, Col, Row } from 'reactstrap'
import PropTypes from 'prop-types'
import ContactLoanOfficerContainer from "../../containers/loan-officer/ContactLoanOfficerContainer";
import questions from "../../data/lenderPrequalificationQuestions.json";

const LoanOfficerPageContent = ({ user, contactLoanOfficer }) => {

  const [openModal, setopenModal] = useState(false)

  const toggleLenderContact = () => {
    setopenModal(!openModal)
  }

  return (
    <Fragment>
      <ContactLoanOfficerContainer
        toggleLenderContact={toggleLenderContact}
        openLenderMessage={openModal}
        userId={user.id}
        questions={questions}
      />
      <div className="homeloan_content">
        <Container>
          <div className="jerey-text-caption">
            <h1>What Can {user.firstName} Help You with Today?</h1>
            <p>Our clients love working with us because of our friendly, transparent and easy to follow process. Getting into a new property or refinancing your current home has never been easier! See how we can help you achieve your goals.</p>
          </div>
          <Row className="tab_box_option">
            <Col md={4}>
              <div className="tab_box_cal">
                <strong className="title">Purchase A Home</strong>
                <div className="icon_game">
                  <img src="/static/images/f_icon1.svg" alt="Post image" />
                </div>
                <div className="tab_textarea">
                  <p>See how much you can afford with our easy to use qualifying tool.</p>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="tab_box_cal">
                <strong className="title">Refinance</strong>
                <div className="icon_game">
                  <img src="/static/images/f_icon2.svg" alt="icon2" />
                </div>
                <div className="tab_textarea">
                  <p>Try our online refinancing tool to get started.</p>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="tab_box_cal">
                <strong className="title">Apply Today</strong>
                <div className="icon_game">
                  <img src="/static/images/f_icon3.svg" alt="Icon 3 " />
                </div>
                <div className="tab_textarea">
                  <p>Are you ready to buy a house? Speed up the process and apply quickly and easily now.</p>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="tab_box_cal">
                <div className="tab_textarea">
                  <Button onClick={toggleLenderContact}>Get Preqalified</Button>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="tab_box_cal">
                <div className="tab_textarea">
                  <Button onClick={toggleLenderContact}>Refinance</Button>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="tab_box_cal">
                <div className="tab_textarea">
                  <Button onClick={toggleLenderContact}>Skip the line, Apply Today</Button>
                </div>
              </div>
            </Col>

          </Row>
          <div className="owners_info">
            <h2>What Amazing Home Owners Have Said About {user.firstName}</h2>
            <Row>
              <Col className={6}>
                <div className="owners_info_inner">
                  <div className="rating_head">
                    <p>Simply the Best</p>
                  </div>
                  <p>{user.firstName} was recommended to us by a close friend and we couldn't be happier with his loan services. He made financing our loan as simple as possible and gave us the best rates on the market with lots of options to meet our family's needs. He was always available to assist us with running numbers or just loan questions. We even closed early thanks to all his hard work! Thank you {user.firstName}!</p>
                </div>
              </Col>
              <Col className={6}>
                <div className="owners_info_inner">
                  <div className="rating_head">
                    <p>Great experience!</p>
                  </div>
                  <p>{user.firstName} was easy to work with. He was professional and he was available to assist us during the whole process. I would contact {user.firstName} again if I ever need a mortgage loan again.</p>
                </div>
              </Col>
            </Row>
          </div>
          <Row>
            <Col md={12}>
              <div className="jerey-text-caption">
                <h1>How Fast Is The Process !</h1>
                <p>What is it like working with the Arizona Home Lending team? Kinda like a walk in the park. We’ve simplified the home loan process into 4 easy steps to ensure a positive experience. See how easy it really is.</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <div className="tab_box">
                <div className="icon_game">
                  <img src="/static/images/p_icon3.svg" alt="Post image" />
                </div>
                <div className="tab_textarea">
                  <span className="step">Step One</span>
                  <strong className="title">Pre-Approval</strong>
                  <p>Help determine which loan option is right for you.</p>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="tab_box">
                <div className="icon_game">
                  <img src="/static/images/p_icon4.svg" alt="icon2" />
                </div>
                <div className="tab_textarea">
                  <span className="step">Step Two</span>
                  <strong className="title">Consultation</strong>
                  <p>A home loan expert will help you define your goals.</p>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="tab_box">
                <div className="icon_game">
                  <img src="/static/images/p_icon1.svg" alt="Icon 3 " />
                </div>
                <div className="tab_textarea">
                  <span className="step">Step Three</span>
                  <strong className="title">Application</strong>
                  <p>A home loan officer will help you prepare your application. The process is made simple, so you can get your application submitted quickly.</p>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="tab_box">
                <div className="icon_game">
                  <img src="/static/images/p_icon2.svg" alt="Post image" />
                </div>
                <div className="tab_textarea">
                  <span className="step">Step Four</span>
                  <strong className="title">Approval</strong>
                  <p>The home loan officer will be with you every step of the way, obtain refinancing or a pre-qualification to purchase your new home.</p>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Button className="contact_btn" onClick={contactLoanOfficer}>
              <img src={'../static/images/contact_icon.svg'} alt="Contact Icon"/>
              &nbsp;Contact {user.firstName}
            </Button>
          </Row>
        </Container>
      </div>
    </Fragment>
  )
}

LoanOfficerPageContent.propTypes = {
  user: PropTypes.object.isRequired,
  contactLoanOfficer: PropTypes.func.isRequired
}

export default LoanOfficerPageContent
