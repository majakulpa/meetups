import React from 'react'
import { Link } from 'react-router-dom'

const bookingsList = ({ events }) => {
  return (
    <ul className="font-normal w-full">
      <span className="block uppercase tracking-wide text-sm text-gray-700 mb-3">
        Booked Events:
      </span>
      {events.map(booking => (
        <Link key={booking.id} to={`/events/${booking.event.id}`}>
          <li
            className="rounded bg-gray-100 hover:bg-gray-200 hover:shadow overflow-hidden my-2 p-3
      flex justify-between"
          >
            <h3 className="capitalize ont-bold text-l font-medium">
              {booking.event.title}
            </h3>
            <p className="text-sm">
              {new Date(booking.event.date).toDateString()},{' '}
              {new Date(booking.event.date).toLocaleTimeString('en-US')}
            </p>
          </li>
        </Link>
      ))}
    </ul>
  )
}

export default bookingsList
