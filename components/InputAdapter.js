import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Input, FormFeedback, Label } from 'reactstrap'

const InputAdapter = ({ input, meta, id, label, children, hideLabel, ...rest }) => {
  const hasError = Boolean(meta.touched && (meta.error || meta.submitError))

  return (
    <FormGroup>
      <Label hidden={hideLabel} for={id}>{label}</Label>
      <Input {...input} id={id} invalid={hasError} {...rest} />
      {children}
      {hasError && <FormFeedback>{meta.error || meta.submitError}</FormFeedback>}
    </FormGroup>
  )
}

InputAdapter.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  hideLabel: PropTypes.bool,
  children: PropTypes.node,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  invalid: PropTypes.func,
}

InputAdapter.defaultProps = {
  hideLabel: false,
}

export default InputAdapter
