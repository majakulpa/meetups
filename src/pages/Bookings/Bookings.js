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
        <span className="block uppercase tracking-wide text-sm text-gray-700 mb-3">
          Booked Events:
        </span>
        {user.bookedEvents.map(booking => (
          <Link key={booking.id} to={`/events/${booking.event.id}`}>
            <li
              className="rounded border-solid border border-gray-300 bg-white overflow-hidden mb-3 p-3
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

  return (
    <div
      className="justify-center w-full bg-gray-100
       border-t border-gray-300 min-h-screen"
    >
      <GoBack />
      <div className="justify-center sm:p-1 md:p-2 lg:px-48 lg:py-5 xl:px-64">
        {myBookings}
      </div>
    </div>
  )
}

export default bookings
