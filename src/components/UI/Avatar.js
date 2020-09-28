import React from 'react'

const avatar = ({ image }) => {
  return (
    <div
      className="h-12 w-12 bg-cover rounded-full bg-center"
      style={{
        backgroundImage: `url(${image}})`
      }}
      title="Profile Image"
    ></div>
  )
}

export default avatar
