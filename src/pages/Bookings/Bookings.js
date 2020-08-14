import React, { useContext } from 'react'
import { GlobalContext } from './../../context/Context'
import { Link, useHistory } from 'react-router-dom'

const bookings = () => {
  const { user } = useContext(GlobalContext)
  let history = useHistory()

  return (
    <div>
      <ul>
        Booked Events:
        {user.bookedEvents.map(booking => (
          <Link key={booking.id} to={`/events/${booking.event.id}`}>
            <li>
              {booking.event.title} - {booking.event.date}
            </li>
          </Link>
        ))}
      </ul>
      <div className="text-center mt-4 text-gray-500">
        <button onClick={() => history.goBack()}>Go back</button>
      </div>
    </div>
  )
}

export default bookings
