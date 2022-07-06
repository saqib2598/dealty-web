import React from 'react'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import { find } from 'lodash'
import ContactLoanOfficerForm from '../../components/loan-officer/ContactLoanOfficerForm'
import { isSignedIn as hasCredentials } from '../../lib/session'
import PropTypes from 'prop-types'
import { createChatRoom } from '../../modules/chatRooms'
import { createMessage } from '../../modules/messages'

const mapDispatchToProps = {
  createChatRoom,
  createMessage
}

const mapStateToProps = (state) => ({
  isSignedIn: hasCredentials(state),
  chatRooms: state.chatRooms.chat_rooms
})

class ContactLoanOfficerContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentQuestion: 0,
      currentLenderPrequalification: null
    }
  }

  async componentDidMount() {
    const { isSignedIn } = this.props

    if (isSignedIn) {
      try {
        this.setState({
          currentLenderPrequalification: null
        })
      }
      catch (error) {
        console.log(error)
      }
    }
  }

  nextQuestion = () => {
    const { questions, lenderPrequalifications } = this.props
    let { currentQuestion } = this.state

    if (currentQuestion < questions.length - 1) {
      currentQuestion = currentQuestion + 1
    }
    const question = questions[currentQuestion]
    const lenderPrequalification = find(lenderPrequalifications, { key: question.key })
    this.setState({
      currentQuestion: currentQuestion,
      currentLenderPrequalification: lenderPrequalification
    })
  }

  prevQuestion = () => {
    const { questions, lenderPrequalifications } = this.props
    let { currentQuestion } = this.state

    if (currentQuestion <= 0) {
      currentQuestion = 0
    } else {
      currentQuestion = currentQuestion - 1
    }
    const question = questions[currentQuestion]
    const lenderPrequalification = find(lenderPrequalifications, { key: question.key })

    this.setState({
      currentQuestion: currentQuestion,
      currentLenderPrequalification: lenderPrequalification

    })
  }

  onSubmit = async (values) => {
    if (Object.keys(values).length == 5) {
      const msg = `Hi I would like to get prequalified with the following details\n
                Annual Income: ${values['annualIncome']}\n
                Buying Turn: ${values['buyingTurn']}\n
                Credit Score: ${values['creditScore']}\n
                Primary Residence: ${values['primaryResidence']}\n
                Purchase Price: ${values['purchasePrice']}`
      this.props.createChatRoom(null, this.props.userId).then(() => {
        this.props.createMessage({
          body: msg,
          chat_room_id: this.props.chatRooms.pop().id
        })
      })
    }
    this.nextQuestion()
  }

  render() {
    const { questions } = this.props
    const { currentQuestion, currentLenderPrequalification } = this.state
    let { toggleLenderContact, openLenderMessage, isSignedIn } = this.props

    const initialValues = {}
    if (currentLenderPrequalification) {
      initialValues[currentLenderPrequalification.key] = currentLenderPrequalification.value
    }

    return (
      <Form
        component={ContactLoanOfficerForm}
        question={questions[currentQuestion]}
        onSubmit={this.onSubmit}
        openLenderMessage={openLenderMessage}
        toggleLenderContact={toggleLenderContact}
        initialValues={initialValues}
        isSignedIn={isSignedIn}
        heading='Contact Loan Officer'
        currentQuestion={currentQuestion}
        prevQuestion={this.prevQuestion}
        {...this.props}
      />
    )
  }
}

ContactLoanOfficerContainer.propTypes = {
  questions: PropTypes.array.isRequired,
  userId: PropTypes.number,
  isSignedIn: PropTypes.bool.isRequired,
  lenderPrequalifications: PropTypes.array.isRequired,
  chatRooms: PropTypes.array.isRequired,
  toggleLenderContact: PropTypes.func.isRequired,
  createChatRoom: PropTypes.func.isRequired,
  createMessage: PropTypes.func.isRequired,
  openLenderMessage: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactLoanOfficerContainer)
