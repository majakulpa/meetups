import React from 'react'

const Event = ({ event }) => {
  return (
    <li>
      <p>Title: {event.title}</p>
      <p>What is this about: {event.description}</p>
      <p>
        When: {new Date(event.date).toDateString()},{' '}
        {new Date(event.date).toLocaleTimeString('en-US')}
      </p>
      <p>Where: {event.place}</p>
      <p>Max Capacity: {event.capacity}</p>
      <p>Price: {event.price === 0 ? 'Free' : '$' + event.price}</p>
      <p>Organizer: {event.user.name}</p>
      <hr />
    </li>
  )
}

export default Event
