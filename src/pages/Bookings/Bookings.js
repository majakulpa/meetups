import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from './../../context/Context'
import { Link } from 'react-router-dom'
import userService from './../../services/users'
import GoBack from './../../components/UI/GoBack'

const bookings = () => {
  const { user, setUser } = useContext(GlobalContext)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true
    const loggedUser = window.localStorage.getItem('loggedUser')

    if (loggedUser) {
      const loggedUserJSON = JSON.parse(loggedUser)
      const loggedUserId = loggedUserJSON.userId
      userService.getOneUser(loggedUserId).then(data => {
        if (isActive) {
          setUser(data)
        }
      })
    }
    return () => {
      isActive = false
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
      <GoBack />
    </div>
  )
}

export default bookings
