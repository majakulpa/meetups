import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from './../../context/Context'
import { Link, useHistory } from 'react-router-dom'
import userService from './../../services/users'

const bookings = () => {
  const { user, setUser } = useContext(GlobalContext)
  const [error, setError] = useState('')
  let history = useHistory()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')

    if (loggedUser) {
      const loggedUserJSON = JSON.parse(loggedUser)
      const loggedUserId = loggedUserJSON.userId
      userService.getOneUser(loggedUserId).then(data => {
        setUser(data)
      })
    }
  }, [])

  let myBookings = <p>Loading...</p>

  if (error) {
    myBookings = <p>Something went wrong</p>
  }

  if (user) {
    myBookings = (
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
    )
  }

  return (
    <div>
      {myBookings}
      <div className="text-center mt-4 text-gray-500">
        <button onClick={() => history.goBack()}>Go back</button>
      </div>
    </div>
  )
}

export default bookings
