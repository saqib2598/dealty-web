import React from 'react'

const Radio = ({ checked }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30">
    <circle cx="15" cy="15" r="13.5" fill="none" stroke="currentColor" strokeWidth="2"/>
    <circle style={{ display: checked ? 'block' : 'none' }} cx="15" cy="15" r="6" fill="currentColor"/>
  </svg>
)

export default Radio