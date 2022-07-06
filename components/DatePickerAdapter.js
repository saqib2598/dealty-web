import PropTypes from 'prop-types'
import React from 'react'
import { FormFeedback, FormGroup } from 'reactstrap'
import DatePicker from 'react-datepicker'
import '../styles/react-datepicker.scss'
import moment from 'moment'

const DatePickerAdapter = ({ input: { value, ...inputRest }, meta, id, label, ...rest }) => {
  const hasError = Boolean(meta.touched && (meta.error || meta.submitError))
  const finalName = hasError ? rest.className + " is-invalid" : rest.className

  return (
    <FormGroup>
      <label htmlFor={id}>{label}</label>
      <DatePicker
        {...inputRest}
        selected={value !== '' ? moment(value) : null}
        dateFormat="MM/DD/YYYY"
        placeholderText="Select Date..."
        autoComplete="off"
        {...rest}
        className={finalName}
        />

        {hasError && <FormFeedback>{meta.error || meta.submitError}</FormFeedback>}
    </FormGroup>
  )
}

DatePickerAdapter.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  invalid: PropTypes.func
}

export default DatePickerAdapter
