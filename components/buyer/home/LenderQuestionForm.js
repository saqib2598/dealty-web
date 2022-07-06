import React from 'react'
import { Field } from 'react-final-form'
import { FormGroup, Button } from 'reactstrap'
import { Link } from '../../../routes'
import InputAdapter from '../../InputAdapter'
import RadioAdapter from '../../RadioAdapter'

function LenderQuestionForm({question, submitting, toggleLenderContact}) {
  return(
    <div>
      {(question.question_type === 'multiple_choice' || question.question_type === 'boolean') &&
        <FormGroup tag="fieldset">
          {question.choices.map((choice) => (
            <Field
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

      {(question.question_type === 'open')  &&
        <Field
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
export default LenderQuestionForm
