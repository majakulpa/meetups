import React from 'react'

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error" style={{ color: 'green' }}>
      {message}
    </div>
  )
}

export default ErrorMessage
