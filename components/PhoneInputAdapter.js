import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, FormFeedback, Label } from 'reactstrap'
import InputMask from 'react-input-mask'

const PhoneInputAdapter = ({ input, meta, id, label, hideLabel, ...rest }) => {
  const hasError = Boolean(meta.touched && (meta.error || meta.submitError))
  const finalName = hasError ? rest.className + " is-invalid" : rest.className

  return (
    <FormGroup>
      <Label hidden={hideLabel} for={id}>{label}</Label>
      <InputMask mask="+1 999 999 9999" maskChar=" " {...input} id={id} {...rest} className={finalName}/>
      {hasError && <FormFeedback>{meta.error || meta.submitError}</FormFeedback>}
    </FormGroup>
  )
}

PhoneInputAdapter.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  hideLabel: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  invalid: PropTypes.func,
}

PhoneInputAdapter.defaultProps = {
  hideLabel: false,
}

export default PhoneInputAdapter
