import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from './../../context/Context'
import bookingService from '../../services/bookings'
import userService from '../../services/users'
import { useHistory } from 'react-router-dom'
import Leave from './../UI/Leave'
import Swal from 'sweetalert2'
import Layout from './../UI/Layout'

const Booking = ({ match }) => {
  const { user, setUser } = useContext(GlobalContext)
  const [oneBooking, setOneBooking] = useState(null)
  const [loggedUserToken, setLoggedUserToken] = useState('')
  const [error, setError] = useState('')
  let history = useHistory()

  const id = match.params.id

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')

    if (loggedUser) {
      const loggedUserJSON = JSON.parse(loggedUser)
      const loggedUserId = loggedUserJSON.userId
      setLoggedUserToken(loggedUserJSON.userToken)
      userService.getOneUser(loggedUserId).then(data => {
        setUser(data)
      })
    }

    bookingService
      .getOneBooking(id)
      .then(data => {
        setOneBooking(data)
      })
      .catch(error => {
        setError(error)
      })
  }, [])

  let booking = <div class="loader"></div>
  if (error) {
    booking = (
      <p>
        Something went wrong: <span>{error}</span>
      </p>
    )
  }

  if (!error && oneBooking && user) {
    const handleDeleteBooking = async e => {
      await bookingService.setToken(loggedUserToken)
      bookingService.deleteBooking(id)
      Swal.fire({
        icon: 'success',
        title: 'Your booking has been cancelled!',
        showConfirmButton: false,
        timer: 1000
      })
      history.goBack()
    }

    booking = (
      <Leave
        question="Are you sure that you want to cancel booking for"
        textOne={`${oneBooking.event.title} - `}
        textTwo={`${new Date(oneBooking.event.date).toDateString()},`}
        textThree={new Date(oneBooking.event.date).toLocaleTimeString('en-US')}
        click={() => history.goBack()}
        handleDelete={handleDeleteBooking}
        confirm="Cancel Booking"
      />
    )
  }

  return <Layout content={booking} />
}

export default Booking
