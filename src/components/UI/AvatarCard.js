import React from 'react'
import Avatar from './Avatar'

const avatarCard = ({ image, name, text }) => {
  return (
    <div className="flex">
      <Avatar image={image} />
      <div className="ml-3">
        <p className="text-sm">{text}</p>
        <p className="font-bold">{name}</p>
      </div>
    </div>
  )
}

export default avatarCard
