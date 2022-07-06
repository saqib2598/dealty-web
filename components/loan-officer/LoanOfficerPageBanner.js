import React, { useState, Fragment } from "react";
import { Container, Button, Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import ReactStars from "react-rating-stars-component";
import ContactLoanOfficerContainer from "../../containers/loan-officer/ContactLoanOfficerContainer";
import questions from "../../data/lenderPrequalificationQuestions.json";
import { FaPhone, FaMailBulk } from 'react-icons/fa';

const LoanOfficerPageBanner = ({ user }) => {

  const [openModal, setopenModal] = useState(false)

  const toggleLenderContact = () => {
    setopenModal(!openModal)
  }

  return (
    <Fragment>
      <Container>
        <ContactLoanOfficerContainer
          toggleLenderContact={toggleLenderContact}
          openLenderMessage={openModal}
          userId={user.id}
          questions={questions}
        />
        <div className="officer-banner">
          <div className="officer-banner-inner">
            <Row>
              <Col md={9}>
                <div className="homeloan_caption">
                  <h1>About {user.firstName}</h1>
                  <p>{user.loanOfficer.bio}</p>
                </div>
                <div className="btn_area">
                  <Button className="btn_list" onClick={toggleLenderContact}>
                    Purchase A New House
                  </Button>
                  <Button className="btn_list" onClick={toggleLenderContact}>
                    Refinance A Home
                  </Button>
                </div>
              </Col>
              <Col md={3}>
                <div className="user_photo-holder">
                  <div className="photo-frame">
                    <img src={user.image} alt="seach image" />
                  </div>
                  <strong className="officer_name">{`${user.firstName} ${user.lastName}`}</strong>
                  <div className='loan-officer-license'>Loan Officer | {user.loanOfficer.lisence}</div>
                  {<strong className='officer-company'>{user.loanOfficer.company}</strong>}
                    {
                      user.loanOfficer.ad &&
                      <div className='paid-contact-info'>
                        <FaMailBulk/><div className='user-email'>{user.email}</div>
                        <div className='user-phone'>
                          <FaPhone style={{transform: 'rotate(90deg)'}}></FaPhone>{user.phone}
                        </div>
                      </div>
                    }
                </div>
                <div>
                  <ReactStars
                    count={5}
                    size={27}
                    activeColor="#1999A9"
                    value={5}
                    edit={false}
                  />
                  <div className="star-rating label">(31 Reviews)</div>
                  </div>
                  </Col>
              <a className="fairway">
                {user.loanOfficer.company}
              </a>
            </Row>
          </div>
        </div>
      </Container>
    </Fragment>
  )
}

LoanOfficerPageBanner.propTypes = {
  user: PropTypes.object.isRequired,
}

export default LoanOfficerPageBanner
