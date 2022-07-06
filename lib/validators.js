export const required = value => (value ? undefined : 'Required')

export const requiredDescription = value => (value ? undefined : 'Please enter a few words')

export const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,64}$/i.test(value)
    ? 'Invalid email address'
    : undefined
)

export const match = (fieldName, label) => (value, allValues) => (
  value !== allValues[fieldName]
    ? `${label} must match`
    : undefined
)
