import React from 'react'

const Checkbox = ({ checked }) => (
  <svg width="30" height="30" viewBox="0 0 30 30">
    <g fill="none" fillRule="evenodd">
      <rect width="27" height="27" x="1.5" y="1.5" stroke="currentColor" strokeWidth="2" rx="6"/>
      <path style={{ display: checked ? 'block' : 'none' }} fill="currentColor" fillRule="nonzero" d="M12.6 15.4l-4-2.4L7 14.6l5.6 6.4L23 10.6 21.4 9z"/>
    </g>
  </svg>
)

export default Checkbox