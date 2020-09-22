import React from 'react'
import { Link } from 'react-router-dom'

const EventsList = ({ events }) => {
  return (
    <React.Fragment>
      {events.map(event => (
        <Link key={event.id} to={`events/${event.id}`}>
          <li
            className="rounded border-solid border border-gray-300 bg-white overflow-hidden mb-3 p-3
            flex justify-between"
          >
            <div>
              <h3 className="capitalize ont-bold text-l font-bold">
                {event.title}
              </h3>
              <p className="text-sm">
                Price: {event.price === 0 ? 'Free' : '$' + event.price}
              </p>
              <p className="text-xs">Going: {event.attendees.length}</p>
            </div>
            <div className="text-right text-sm">
              <p>
                {new Date(event.date).toDateString()},
                {new Date(event.date).toLocaleTimeString('en-US')}
              </p>
              <p className="capitalize">{event.place}</p>
            </div>
          </li>
        </Link>
      ))}
    </React.Fragment>
  )
}

export default EventsList
