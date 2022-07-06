/**
 * Utility Functions
 *
 * Note that this file uses the older require/export syntax so that
 * it can be used directly in Node without transpiling.
 */

const { FORM_ERROR } = require('final-form')
// Note: we import lodash members separately here to keep bundle size small
const mapValues = require('lodash/mapValues')
const startCase = require('lodash/startCase')
const moment = require('moment')

/**
 * Load the value of an environment variable and throw an error if not defined
 *
 * @param {string} varName
 * @return {*}
 */
exports.requireEnvVar = (varName) => {
  const envVar = process.env[varName]
  if (!envVar) {
    throw new Error(`${varName} environment variable must be defined!`)
  }
  return envVar
}

/**
 * Return a promise that resolves after `delay` milliseconds
 *
 * @param {int} delay The time, in milliseconds, to sleep
 * @return {Promise}
 */
exports.sleep = (delay) => (
  new Promise((resolve) => setTimeout(resolve, delay))
)

/**
 * Return a Moment object if `dateString` is a valid date string.
 * Otherwise return the falsey value.
 *
 * @param {string|*} dateString
 * @return {*|Moment}
 */
exports.stringToMoment = (dateString) => (
  dateString && moment(dateString)
)

/**
 * Return a function that can accept an error returned by our API and returns
 * an error object to be used by Final Form.
 *
 * @see https://github.com/final-form/final-form#onsubmit-values-object-callback-errors-object--void--object--promiseobject--void
 * @param {string} [defaultErrorMessage] The error message to use if one is
 *   not provided by the API
 * @return {function}
 */
exports.mapFinalFormErrors = (defaultErrorMessage = 'An error occurred.') => (serverError) => {
  const { errors, message } = serverError

  const formErrors = mapValues(errors, (error, name) => (
    `${startCase(name)} ${error}`
  ))

  formErrors[FORM_ERROR] = message || defaultErrorMessage

  return formErrors
}

/**
 * Calculate percentage and return 0 if divisor is 0.
 *
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
exports.calculatePercentage = (dividend, divisor) => {
  if (divisor === 0) {
    return 0
  }

  return Math.round(dividend / divisor * 100)
}


exports.formatCurrency = (price) => {
  if (isNaN(price)) {
    return null
  }

  if (price >= 1000000000) {
    return (price / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
  }
  if (price >= 1000000) {
    return (price / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (price >= 1000) {
    return (price / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }

  return price;
}

exports.getBaseUrl = (req) => {
  const url = require('url')

  return url.format({
    protocol: req.protocol,
    host: req.get('host')
  })
}

