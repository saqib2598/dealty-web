import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Input, FormFeedback, Label } from 'reactstrap'

const SelectAdapter = ({
  input,
  id,
  hideLabel,
  label,
  options,
  meta,
  placeholder,
  selectablePlaceholder,
  ...rest
}) => {
  const hasError = Boolean(meta.touched && (meta.error || meta.submitError))

  return (
    <FormGroup>
      <Label hidden={hideLabel} for={id}>{label}</Label>
      <Input {...input} id={id} invalid={hasError} {...rest}>
        {placeholder && (
          <option className="text-placeholder" disabled={!selectablePlaceholder} value="">
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
             {option.label}  
          </option>
        ))}
      </Input>
      {hasError && <FormFeedback>{meta.error || meta.submitError}</FormFeedback>}
    </FormGroup>
  )
}

SelectAdapter.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  hideLabel: PropTypes.bool,
  type: PropTypes.string,
  invalid: PropTypes.func,
  options: PropTypes.array,
}

SelectAdapter.defaultProps = {
  hideLabel: false,
  selectablePlaceholder: false,
  placeholder: 'Select...'
}

export default SelectAdapter
