import React from 'react'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import { get, find } from 'lodash'
import ContactLenderForm from '../../../components/buyer/home/ContactLenderForm'
import { isSignedIn as hasCredentials } from '../../../lib/session'
import { updateLenderPrequalification, createLenderPrequalification, retrieveLenderPrequalifications, selectLenderPrequalifications } from '../../../modules/lenderPrequalifications'
import PropTypes from 'prop-types'

const mapDispatchToProps = { createLenderPrequalification, updateLenderPrequalification, retrieveLenderPrequalifications }

const mapStateToProps = (state) => ({
  isSignedIn: hasCredentials(state),
  lenderPrequalifications: selectLenderPrequalifications(state)
})


class ContactLenderContainer extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      currentQuestion: 0,
      currentLenderPrequalification: null
    }
  }

  async componentDidMount(){
    const { questions, homeId, retrieveLenderPrequalifications, isSignedIn } =  this.props
    const { currentQuestion } =  this.state

    if (isSignedIn){
      try{
        const lenderPrequalifications = await retrieveLenderPrequalifications(homeId)
        const question = questions[currentQuestion]
        const lenderPrequalification = find(lenderPrequalifications, {key: question.key})
        this.setState({
          currentLenderPrequalification: lenderPrequalification
        })
      }
      catch (error){
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
    const lenderPrequalification = find(lenderPrequalifications, {key: question.key})
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
    const lenderPrequalification = find(lenderPrequalifications, {key: question.key})

    this.setState({
      currentQuestion: currentQuestion,
      currentLenderPrequalification: lenderPrequalification

    })
  }

  onSubmit = async (values) => {
    const { questions, homeId, createLenderPrequalification, updateLenderPrequalification } =  this.props
    const { currentQuestion, currentLenderPrequalification } = this.state
    const question = questions[currentQuestion]
    let submitValue = get(values, question.key)

    const params = {
      listingId: homeId,
      key: question.key,
      value: submitValue
    }

    const action = currentLenderPrequalification ?
      updateLenderPrequalification(currentLenderPrequalification, params, homeId) :
      createLenderPrequalification(params, homeId)

    return action.then(() => { this.nextQuestion() })
  }

  render() {
    const { questions } =  this.props
    const { currentQuestion, currentLenderPrequalification } = this.state
    let { toggleLenderContact, openLenderMessage, isSignedIn } = this.props

    const initialValues={}
    if(currentLenderPrequalification){
      initialValues[currentLenderPrequalification.key] = currentLenderPrequalification.value
    }

    return (
        <Form
          component={ContactLenderForm}
          question = {questions[currentQuestion]}
          onSubmit={this.onSubmit}
          openLenderMessage={openLenderMessage}
          toggleLenderContact={toggleLenderContact}
          initialValues={initialValues}
          isSignedIn={isSignedIn}
          heading='Contact Lender'
          currentQuestion={currentQuestion}
          prevQuestion={this.prevQuestion}
          {...this.props}
        />
    )
  }
}

ContactLenderContainer.propTypes = {
  questions: PropTypes.array.isRequired,
  homeId: PropTypes.string,
  retrieveLenderPrequalifications: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  lenderPrequalifications: PropTypes.array.isRequired,
  createLenderPrequalification: PropTypes.func.isRequired,
  updateLenderPrequalification: PropTypes.func.isRequired,
  toggleLenderContact: PropTypes.func.isRequired,
  openLenderMessage: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactLenderContainer)
