import { get } from "lodash";
import React from "react";
import { Button, Form, FormGroup, Collapse } from "reactstrap";
import { Field } from "react-final-form";
import InputAdapter from "../InputAdapter";
import RadioAdapter from "../RadioAdapter";
import MultiCheckboxAdapter from "../MultiCheckboxAdapter";
import SelectAdapter from "../SelectAdapter";

const QuestionForm = (props) => (
  <Form onSubmit={props.handleSubmit}>
    <div className="question">
      <div className="initial-question">
        {props.question.label}
        {props.question.question_type === "multiple_options" && (
          <div className="small">(Check all that apply)</div>
        )}
      </div>

      {props.question.question_type === "open" && (
        <>
          <div className="update-answer">
            <Field
              id={props.question.key}
              name={props.question.key}
              type="string"
              component={InputAdapter}
            />
            <div className="buttons">
              <Button
                block
                type="submit"
                size="lg"
                color="secondary"
                disabled={props.submitting}
              >
                {props.submitting ? "Submitting" : "Continue"}
              </Button>
            </div>
          </div>
        </>
      )}

      {props.question.question_type === "select" && (
        <>
          <div className="update-answer">
            <Field
              id={props.question.key}
              name={props.question.key}
              type="select"
              options={props.YEARS}
              component={SelectAdapter}
              placeholder="Select Built Year ..."
            />

            <div className="buttons">
              <Button
                block
                type="submit"
                size="lg"
                color="secondary"
                disabled={props.submitting}
              >
                {props.submitting ? "Submitting" : "Continue"}
              </Button>
            </div>
          </div>
        </>
      )}

      {(props.question.question_type === "multiple_choice" ||
        props.question.question_type === "boolean") && (
        <>
          <FormGroup tag="fieldset">
            {props.question.choices.map((choice) => (
              <Field
                id={`${choice.value}`}
                value={`${choice.value}`}
                name={`${props.question.key}`}
                label={choice.label}
                key={`${choice.value}`}
                type="radio"
                component={RadioAdapter}
              />
            ))}
          </FormGroup>

          <div className="buttons">
            <Button
              block
              type="submit"
              size="lg"
              color="secondary"
              disabled={props.submitting}
            >
              {props.submitting ? "Submitting" : "Continue"}
            </Button>
          </div>
        </>
      )}

      {props.question.question_type === "multiple_options" && (
        <>
          <FormGroup tag="fieldset">
            {props.question.choices.map((choice) => (
              <Field
                id={`${choice.value}`}
                value={`${choice.value}`}
                name={`${props.question.key}`}
                label={choice.label}
                selectedValues={props.values[props.question.key]}
                key={`${choice.value}`}
                type="checkbox"
                component={MultiCheckboxAdapter}
              />
            ))}
          </FormGroup>

          <div className="buttons">
            <Button
              block
              type="submit"
              size="lg"
              color="secondary"
              disabled={props.submitting}
            >
              {props.submitting ? "Submitting" : "Continue"}
            </Button>
          </div>
        </>
      )}
    </div>

    {props.submitFailed && (
      <div className="text-danger">{props.submitError}</div>
    )}

    <style jsx>{`
      @import "styled-jsx-helper";

      .question {
        text-align: center;
        display: block;
        margin: 0 0 20px 0;
        font-size: 20px;
      }
      .initial-question {
        margin: 0 0 20px 0;
      }
      .current-answer {
        font-size: 30px;
        font-weight: bold;
        margin: 0;
        color: $teal;
        font-family: $headings-font-family;
      }
      .question label {
        margin: 0 0 10px 0;
        color: $brand-dark;
      }
      .buttons {
        padding-top: 25px;
      }

      @include media-breakpoint-up(md) {
        .question {
          font-size: 18px;
        }
      }
    `}</style>
  </Form>
);

export default QuestionForm;
