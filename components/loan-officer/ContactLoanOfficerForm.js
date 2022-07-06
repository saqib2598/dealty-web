import React from 'react'
import { Row, Col, Form } from 'reactstrap'
import ContactHomeOwnerIconSvg from '../images/contact-home-owner-iconsvg'
import LoanOfficerQuestionForm from './LoanOfficerQuestionForm'
import { func, string, bool, object, number } from 'prop-types'
import UnSignedInUser from '../UnSignedInUser'
import ModalContainer from './ModalContainer'

const ContactLoanOfficerForm = ({
  openLenderMessage,
  toggleLenderContact,
  heading,
  isSignedIn,
  handleSubmit,
  question,
  currentQuestion,
  prevQuestion
}) => {

  const renderQuestionForm = () => {
    return <Form onSubmit={handleSubmit}>
      <div className="question" >
        <div className={"initial-question " + (question.question_type === 'thanksGiving' ? 'show' : 'hidden')}>
          {question.label}
          {(question.question_type === 'multiple_options') &&
            <div className="small">
              Check all that apply
        </div>
          }
        </div>
        <LoanOfficerQuestionForm
          question={question}
          toggleLenderContact={toggleLenderContact}
        />
        {currentQuestion !== 0 &&
          <div>
            <hr className="dashed" />
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

  return (
    <div className="contact-lender-form modal-form">
      <ModalContainer isOpen={openLenderMessage} toggle={toggleLenderContact}>
        <div className="icon"><ContactHomeOwnerIconSvg /></div>
        <h4 className="modal-heading">{heading}</h4>
        {isSignedIn ? renderQuestionForm() : <UnSignedInUser />}
      </ModalContainer>
    </div>
  )
}

ContactLoanOfficerForm.propTypes = {
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

export default ContactLoanOfficerForm
