import React from 'react'
import { Link } from 'react-router-dom'

const EventsList = ({ events }) => {
  return (
    <React.Fragment>
      {events.map(event => (
        <Link key={event.id} to={`events/${event.id}`}>
          <li className="flex items-center bg-gray-100 mb-10 shadow">
            <p>Title: {event.title}</p>
            <p>
              When: {new Date(event.date).toDateString()},
              {new Date(event.date).toLocaleTimeString('en-US')}
            </p>
            <p>Where: {event.place}</p>
            <p>Price: {event.price === 0 ? 'Free' : '$' + event.price}</p>
          </li>
        </Link>
      ))}
    </React.Fragment>
  )
}

export default EventsList
