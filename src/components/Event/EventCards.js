import React from 'react'
import { Link } from 'react-router-dom'

const eventCards = ({ events }) => {
  return (
    <React.Fragment>
      {events.length > 0 && (
        <ul className="font-normal">
          <span className="font-bold text-lg">
            Upcoming events ({events.length})
          </span>
          {events.map(event => (
            <Link key={event.id} to={`/events/${event.id}`}>
              <li
                className="rounded bg-gray-100 hover:bg-gray-200 hover:shadow overflow-hidden my-2 p-3
              flex justify-between"
              >
                <div>
                  <h3 className="capitalize ont-bold text-l font-medium">
                    {event.title}
                  </h3>
                  <p className="text-sm">
                    Price: {event.price === 0 ? 'Free' : '$' + event.price}
                  </p>
                  <p className="text-xs">Going: {event.attendees.length}</p>
                </div>
                <div className="text-sm text-right">
                  <p>
                    {new Date(event.date).toDateString()},{' '}
                    {new Date(event.date).toLocaleTimeString('en-US')}
                  </p>
                  <p className="capitalize">{event.place}</p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </React.Fragment>
  )
}

export default eventCards
