import React from 'react'

const LoadingSM = () => (
  <div className="text-center pt-5 d-flex justify-content-center align-items-center">
    <div className="d-block text-center">
      <svg version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
           viewBox="0 0 100 60" enableBackground="new 0 0 0 0" className="mx-auto d-block text-center">
        <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.1"/>
        </circle>
        <circle fill="#fff" stroke="none" cx="26" cy="50" r="6">
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.2"/>
        </circle>
        <circle fill="#fff" stroke="none" cx="46" cy="50" r="6">
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.3"/>
        </circle>
      </svg>

      <h2 className="mb-5 mt-2">Loading</h2>
    </div>
    <style jsx>{`
      svg{
        padding-left: 45px;
      }
   `}</style>
  </div>
)

export default LoadingSM
