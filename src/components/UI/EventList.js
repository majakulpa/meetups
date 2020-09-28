import React from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineEye } from 'react-icons/hi'

const eventItem = ({ events }) => {
  const todayDate = new Date()
    .toISOString()
    .split('')
    .slice(0, 16)
    .join('')

  return (
    <ul className="mt-4">
      {events && events.length > 0 ? (
        <span className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
          Created Events:
        </span>
      ) : (
        ''
      )}
      {events
        ? events.map(event => (
            <Link key={event.id} to={`/events/${event.id}`}>
              <li
                className={`${
                  event.date <= todayDate ? 'text-gray-400' : ''
                } border-solid border-b border-gray-300 hover:bg-gray-100 py-2 px-4 flex items-center justify-between`}
              >
                <div className="flex flex-col">
                  <span>{event.title}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(event.date).toDateString()}
                  </span>
                </div>

                <HiOutlineEye className="text-xl" />
              </li>
            </Link>
          ))
        : ''}
    </ul>
  )
}

export default eventItem
