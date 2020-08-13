import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../../context/Context'
import bookingService from './../../services/bookings'
import { useHistory, Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const Booking = ({ match }) => {
  const { user } = useContext(GlobalContext)
  const [oneBooking, setOneBooking] = useState(null)
  const [error, setError] = useState('')
  let history = useHistory()

  const id = match.params.id

  useEffect(() => {
    bookingService
      .getOneBooking(id)
      .then(data => {
        setOneBooking(data)
      })
      .catch(error => {
        setError(error)
      })
  }, [])

  const loggedUser = window.localStorage.getItem('loggedUser')
  const loggedUserJSON = JSON.parse(loggedUser)
  const loggedUserToken = loggedUserJSON.userToken

  const handleDeleteBooking = async e => {
    await bookingService.setToken(loggedUserToken)
    bookingService.deleteBooking(id)
    Swal.fire({
      icon: 'success',
      title: 'Your booking has been cancelled!',
      showConfirmButton: false,
      timer: 1500
    })
    history.push('/')
  }

  let booking = <p>Loading...</p>
  if (error) {
    booking = (
      <p>
        Something went wrong: <span>{error}</span>
      </p>
    )
  }

  if (!error && oneBooking) {
    booking = (
      <div>
        <p>{oneBooking.event.title}</p>
        <p>{oneBooking.event.date}</p>
        <button
          className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
          onClick={handleDeleteBooking}
        >
          Delete
        </button>
      </div>
    )
  }

  return (
    <React.Fragment>
      {booking}
      <div className="text-center mt-4 text-gray-500">
        <button onClick={() => history.goBack()}>Go back</button>
      </div>
    </React.Fragment>
  )
}

export default Booking
