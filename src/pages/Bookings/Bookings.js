import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from './../../context/Context'
import { Link } from 'react-router-dom'
import userService from './../../services/users'
import GoBack from './../../components/UI/GoBack'
import Footer from './../../components/UI/Footer'

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
      <ul className="font-normal w-full">
        <span className="block uppercase tracking-wide text-sm text-gray-700 mb-3">
          Booked Events:
        </span>
        {user.bookedEvents.map(booking => (
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

  return (
    <React.Fragment>
      <div
        className="justify-center w-full bg-gray-100
       border-t border-gray-200 sp-screen"
      >
        <GoBack />
        <div className="justify-center sm:p-1 md:p-2 lg:px-48 lg:py-5 xl:px-64">
          <div className="w-full flex rounded border-solid border border-gray-200 bg-white overflow-hidden mb-3 p-3">
            {myBookings}
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default bookings
