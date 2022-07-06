import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import { FormFeedback, Input, FormGroup, Label } from 'reactstrap'
import Checkbox from './images/checkbox'

const CheckboxAdapter = ({ input: {value, ...inputRest}, meta, id, label, ...rest }) => {
  const hasError = meta.touched && (meta.error || meta.submitError)

  return (
    <FormGroup className={classNames({'checked': value})} check>
      <Label for={id} check>
        <Checkbox checked={value} />
        <Input type="checkbox" id={id} checked={value} {...inputRest} {...rest} />
        {label}
      </Label>
      {hasError && <FormFeedback>{meta.error || meta.submitError}</FormFeedback>}
    </FormGroup>
  )
}

CheckboxAdapter.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
}

export default CheckboxAdapter
