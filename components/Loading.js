import React from 'react'

const Loading = () => (
    <div
      style={{minHeight: 'calc(100vh - 300px)'}}
      className="text-center mt-5 d-flex justify-content-center align-items-center">
      <div className="d-block">
        <img
          alt="Loading"
          src="/static/images/logo.svg"
        />
        <h1 className="mb-5">Loading</h1>
      </div>
  </div>
)

export default Loading
