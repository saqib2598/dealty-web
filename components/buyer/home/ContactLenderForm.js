import React from 'react'
import { Row, Col, Form } from 'reactstrap'
import ContactHomeOwnerIconSvg from '../../images/contact-home-owner-iconsvg'
import LenderQuestionForm from './LenderQuestionForm'
import { func, string, bool, object, number } from 'prop-types'
import UnSignedInUser from '../../UnSignedInUser'
import ModalContainer from './ModalContainer'

ContactLenderForm.propTypes = {
  toggleLenderContact: func.isRequired,
  openLenderMessage: bool.isRequired,
  submitting: bool.isRequired,
  handleSubmit: func.isRequired,
  heading: string,
  isSignedIn: bool.isRequired,
  submitFailed: bool.isRequired,
  submitError: bool,
  question: object,
  currentQuestion: number,
  prevQuestion: func
}

function ContactLenderForm({ openLenderMessage, toggleLenderContact, heading, isSignedIn, handleSubmit, question, currentQuestion, prevQuestion}) {
  return(
    <div className="contact-lender-form modal-form">
      <ModalContainer isOpen={openLenderMessage} toggle={toggleLenderContact}>
        <div className="icon"><ContactHomeOwnerIconSvg /></div>
        <h4 className="modal-heading">{heading}</h4>
        {isSignedIn &&
          <Form onSubmit={handleSubmit}>
            <div className="question" >
              <div className={"initial-question " + (question.question_type === 'thanksGiving' ? 'show' : 'hidden')}>
                {question.label}
                {(question.question_type === 'multiple_options') &&
                  <div className="small">
                    Check all that apply
                  </div>
                }
              </div>

              <LenderQuestionForm
                question={question}
                toggleLenderContact={toggleLenderContact}
              />

              {currentQuestion !==  0 &&
                <div>
                  <hr className="dashed"/>
                  <Row>
                    <Col xs="6" className="text-left">
                      <a className="prev-question" onClick={prevQuestion}>« Back</a>
                    </Col>
                  </Row>
                </div>
              }
            </div>
          </Form>
        }

        {!isSignedIn &&
          <UnSignedInUser />
        }
      </ModalContainer>
      <style jsx>{`
        @import "styled-jsx-helper";
        .question{
          text-align:center;
          display:block;
          margin: 0 0 20px 0;
          font-size:20px;
        }
        .initial-question.hidden{
          margin: 0 0 20px 0;
          font-size: 25px;
        }
        .initial-question.show {
          font-size: 35px;
          margin-bottom: 20px;
        }
        .contact-lender-form .modal-header{
          border-bottom: none !important;
          margin-top: -58px;
          margin-bottom: -40px;
          margin-right: -54px;
        }
        .contact-lender-form .close{
          border-radius: 50%;
        }
        .prev-question{
          cursor: pointer;
          color: $brand-grey !important;
        }
    `}</style>
    </div>
  )
}

export default ContactLenderForm
