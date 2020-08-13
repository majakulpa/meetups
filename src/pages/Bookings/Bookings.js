import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from './../../context/Context'
import { Link, useHistory } from 'react-router-dom'

const bookings = () => {
  const { user, setUser } = useContext(GlobalContext)
  const [error, setError] = useState('')
  let history = useHistory()

  return (
    <div>
      <ul>
        Booked Events:
        {user.bookedEvents.map(booking => (
          <Link key={booking.id} to={`/events/${booking.event}`}>
            <li>{booking.id}</li>
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
