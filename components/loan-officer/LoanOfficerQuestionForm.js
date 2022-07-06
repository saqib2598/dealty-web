import React from 'react'
import { Field } from 'react-final-form'
import { FormGroup, Button } from 'reactstrap'
import InputAdapter from '../InputAdapter'
import RadioAdapter from '../RadioAdapter'
import { required } from '../../lib/validators'
import PropTypes from 'prop-types'

const LoanOfficerQuestionForm = ({ question, submitting, toggleLenderContact }) => {
  return (
    <div>
      {(question.question_type === 'multiple_choice' || question.question_type === 'boolean') &&
        <FormGroup tag="fieldset">
          {question.choices.map((choice) => (
            <Field
              validate={required}
              id={choice.value}
              value={choice.value}
              name={question.key}
              label={choice.label}
              key={choice.value}
              type="radio"
              component={RadioAdapter}
            />
          ))}
        </FormGroup>
      }

      {(question.question_type === 'open') &&
        <Field
          validate={required}
          id={question.key}
          name={question.key}
          type="number"
          component={InputAdapter}
        />
      }

      <div className="buttons">
        <Button
          block
          size="lg"
          color="secondary"
          disabled={submitting}
          onClick={question.question_type === 'thanksGiving' && toggleLenderContact}
        >{submitting ? 'Submitting' : question.question_type !== 'thanksGiving' ? 'Continue' : 'Close'}</Button>
      </div>
    </div>
  )
}

LoanOfficerQuestionForm.propTypes = {
  question: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  toggleLenderContact: PropTypes.func.isRequired,
}

export default LoanOfficerQuestionForm
