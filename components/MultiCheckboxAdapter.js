import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import { FormFeedback, Input, FormGroup, Label } from 'reactstrap'
import Checkbox from './images/checkbox'

const MultiCheckboxAdapter = ({ input: {value, ...inputRest}, meta, id, label, selectedValues, ...rest }) => {
  const hasError = meta.touched && (meta.error || meta.submitError)

  return (
    <FormGroup className={classNames({'checked': selectedValues && selectedValues.includes(value)})} check>
      <Label for={id} check>
        <Checkbox checked={selectedValues && selectedValues.includes(value)} />
        <Input type="checkbox" id={id} checked={selectedValues && selectedValues.includes(value)} {...inputRest} {...rest} />
        {label}
      </Label>
      {hasError && <FormFeedback>{meta.error || meta.submitError}</FormFeedback>}
    </FormGroup>
  )
}

MultiCheckboxAdapter.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
}

export default MultiCheckboxAdapter
