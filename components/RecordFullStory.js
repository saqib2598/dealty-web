import React from 'react'
import { FullStoryAPI } from 'react-fullstory'

const FSRecordVars = (user) => (
  FullStoryAPI('identify', user.email, {
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.email,
    displayName: user.email
  })
)

export default FSRecordVars
