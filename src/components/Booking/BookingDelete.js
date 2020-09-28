import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from './../../context/Context'
import bookingService from '../../services/bookings'
import userService from '../../services/users'
import { useHistory } from 'react-router-dom'
import GoBack from './../UI/GoBack'
import Swal from 'sweetalert2'
import { HiOutlineTrash } from 'react-icons/hi'
import Footer from './../UI/Footer'

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

  let booking = <p>Loading...</p>
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
      <div className="rounded border-solid border border-gray-200 bg-white px-5 py-8">
        <div className="text-center">
          <p className="text-lg">
            Are you sure that you want to cancel booking for{' '}
          </p>
          <span className="font-medium">
            '{oneBooking.event.title} -{' '}
            {new Date(oneBooking.event.date).toDateString()},{' '}
            {new Date(oneBooking.event.date).toLocaleTimeString('en-US')}'
          </span>
        </div>
        <div className="flex justify-end mt-5">
          <button
            className="block bg-purple-600 float-right hover:bg-purple-800 text-white tracking-wide
           capitalize py-2 px-6 rounded focus:bg-purple-800 focus:outline-none focus:shadow-outline mr-3"
            onClick={() => history.goBack()}
          >
            No, go back
          </button>
          <button
            className="block bg-gray-500 float-right hover:bg-gray-600 text-white tracking-wide flex
                capitalize py-2 px-4 rounded focus:bg-gray-800 focus:outline-none focus:shadow-outline"
            onClick={handleDeleteBooking}
          >
            <HiOutlineTrash className="mt-1 mr-1" />
            <span>Cancel Booking</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <React.Fragment>
      <div className="w-full bg-gray-100 sp-screen">
        <GoBack />
        <div className="justify-center sm:p-1 md:p-2 lg:px-48 lg:pt-5 lg:pb-16 xl:px-64">
          {booking}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default Booking
