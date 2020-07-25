import React from 'react'

const Event = ({ event }) => {
  return (
    <li className="flex items-center bg-gray-100 mb-10 shadow">
      <p>Title: {event.title}</p>
      <p>
        When: {new Date(event.date).toDateString()},{' '}
        {new Date(event.date).toLocaleTimeString('en-US')}
      </p>
      <p>Where: {event.place}</p>
      <p>Price: {event.price === 0 ? 'Free' : '$' + event.price}</p>
    </li>
  )
}

export default Event
