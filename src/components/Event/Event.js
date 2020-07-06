import React from 'react'

const Event = ({ event }) => {
  return (
    <li>
      {event.title} - {event.price}
      <br />
      {event.description}
    </li>
  )
}

export default Event
