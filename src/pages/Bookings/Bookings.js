import React, { useState, useEffect, useContext, Suspense } from 'react'
import { GlobalContext } from './../../context/Context'
import userService from './../../services/users'
import Layout from './../../components/UI/Layout'
const BookingsList = React.lazy(() =>
  import('./../../components/Booking/BookingsList')
)

const bookings = () => {
  const { user, setUser } = useContext(GlobalContext)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true
    const loggedUser = window.localStorage.getItem('loggedUser')

    if (loggedUser) {
      const loggedUserJSON = JSON.parse(loggedUser)
      const loggedUserId = loggedUserJSON.userId
      userService
        .getOneUser(loggedUserId)
        .then(data => {
          if (isActive) {
            setUser(data)
          }
        })
        .catch(error => {
          setError(error)
        })
    }
    return () => {
      isActive = false
    }
  }, [])

  let myBookings = <div className="loader"></div>

  if (error) {
    myBookings = <p>Something went wrong</p>
  }

  if (user) {
    myBookings = (
      <Suspense fallback={<div className="loader"></div>}>
        <BookingsList events={user.bookedEvents} />
      </Suspense>
    )
  }

  return <Layout content={myBookings} />
}

export default bookings
