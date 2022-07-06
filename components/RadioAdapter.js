import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import { FormFeedback, Input, FormGroup, Label } from 'reactstrap'
import Radio from './images/radio'

const RadioAdapter = ({ input, meta, id, label, ...rest }) => {
  const hasError = meta.touched && (meta.error || meta.submitError)

  return (
    <FormGroup className={classNames({'checked': input.checked})} check>
      <Label for={id} check>
        <Radio checked={input.checked} />
        <Input type="radio" id={id} {...input} {...rest} />
        {label}
      </Label>
      {hasError && <FormFeedback>{meta.error || meta.submitError}</FormFeedback>}
    </FormGroup>
  )
}

RadioAdapter.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
}

export default RadioAdapter
