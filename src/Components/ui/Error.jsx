import React from 'react'

const Error = ({error}) => {
  return (
    <div className="alert alert-danger d-flex align-items-center" role="alert">
  {error}
  </div>
  )
}

export default Error