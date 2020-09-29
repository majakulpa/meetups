import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from './../../context/Context'
import userService from './../../services/users'
import Layout from './../../components/UI/Layout'
import BookingsList from './../../components/Booking/BookingsList'

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
    myBookings = <BookingsList events={user.bookedEvents} />
  }

  return <Layout content={myBookings} />
}

export default bookings
