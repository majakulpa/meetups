import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../../context/Context'
import eventService from './../../services/events'
import userService from './../../services/users'
import { useHistory, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import SelectGroups from './../UI/SelectGroups'
import GoBack from './../UI/GoBack'
import { HiPlus, HiOutlineTrash } from 'react-icons/hi'

const EventDetails = ({ match }) => {
  const { user, setUser } = useContext(GlobalContext)
  const [oneEvent, setOneEvent] = useState({
    id: null,
    date: '',
    title: '',
    price: '',
    capacity: '',
    description: '',
    place: '',
    attendees: [],
    groups: [],
    user: {}
  })
  const [selectedGroups, setSelectedGroups] = useState([])
  const [error, setError] = useState('')
  let history = useHistory()

  const id = match.params.id

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

  useEffect(() => {
    let isActive = true
    eventService
      .getOneEvent(id)
      .then(data => {
        if (isActive) {
          setOneEvent(data)
        }
      })
      .catch(error => {
        setError(error)
      })
    return () => {
      isActive = false
    }
  }, [])

  let event = <p>Loading...</p>
  if (error) {
    event = (
      <p>
        Something went wrong: <span>{error}</span>
      </p>
    )
  }

  let eventHeading = (
    <React.Fragment>
      <p className="text-sm">
        {new Date(oneEvent.date).toDateString()},{' '}
        {new Date(oneEvent.date).toLocaleTimeString('en-US')}
      </p>

      <h2 className="capitalize text-3xl font-bold mb-3">{oneEvent.title}</h2>
      <div className="flex">
        <div
          className="h-12 w-12 bg-cover rounded-full bg-center"
          style={{
            backgroundImage: `url(${oneEvent.user.profileImage}})`
          }}
          title="Profile Image"
        ></div>
        <div className="ml-3">
          <p className="text-sm">Hosted by</p>
          <p className="font-bold">{oneEvent.user.name}</p>
        </div>
      </div>
    </React.Fragment>
  )

  let eventData = (
    <React.Fragment>
      <p className="mb-5">{oneEvent.description}</p>
      <div className="flex justify-between">
        <div>
          <p className="font-bold text-lg">{oneEvent.place}</p>
          <p className="font-medium text-lg">
            Price: {oneEvent.price === 0 ? 'Free' : '$' + oneEvent.price}
          </p>
        </div>
        <div className="text-right">
          <p className="font-medium text-lg">
            {oneEvent.capacity - oneEvent.attendees.length} spots left!
          </p>
          <p>Max capacity: {oneEvent.capacity}</p>
        </div>
      </div>
      {oneEvent.groups.length > 0 && (
        <div className="mt-5 mb-8">
          {oneEvent.groups.map(group => (
            <span
              key={group.id}
              className="bg-purple-400 text-white text-sm py-1 px-3 rounded-full mx-1"
            >
              {group.name}
            </span>
          ))}
        </div>
      )}
    </React.Fragment>
  )

  let eventAttendees = (
    <React.Fragment>
      {oneEvent.attendees.length > 0 && (
        <React.Fragment>
          <span className="font-bold text-lg">
            Attendees ({oneEvent.attendees.length})
          </span>
          <div className="flex flex-wrap justify-center lg:justify-start">
            {oneEvent.attendees.map(attendee => (
              <Link
                className="flex flex-col items-center w-48 bg-gray-100 rounded p-3 m-3 hover:shadow"
                key={attendee.id}
                to={
                  user && user.id === attendee.id
                    ? `/my-account/${attendee.id}`
                    : `/users/${attendee.id}`
                }
              >
                <div
                  className="h-16 w-16 bg-cover rounded-full bg-center"
                  style={{
                    backgroundImage: `url(${attendee.profileImage}})`
                  }}
                  title="Profile Image"
                ></div>
                <div className="text-sm font-medium m-3">{attendee.name}</div>
              </Link>
            ))}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  )

  if (!error && oneEvent && !user) {
    event = eventData
  }

  if (!error && oneEvent && user && user.name !== oneEvent.user.name) {
    const loggedUser = window.localStorage.getItem('loggedUser')
    const loggedUserJSON = JSON.parse(loggedUser)
    const loggedUserToken = loggedUserJSON.userToken

    const handleBookEvent = async e => {
      e.preventDefault()
      await eventService.setToken(loggedUserToken)
      eventService.bookEvent(id)
      Swal.fire({
        icon: 'success',
        title: `${oneEvent.title} has been booked!`,
        showConfirmButton: false,
        timer: 1500
      })
    }

    event = (
      <div className="rounded border-solid border border-gray-300 bg-white p-5">
        <div className="flex justify-between mb-5">
          <div>{eventHeading}</div>
          <div>
            {!oneEvent.attendees
              .map(attendee => attendee.id)
              .includes(user.id) &&
            oneEvent.capacity - oneEvent.attendees.length > 0 ? (
              <button
                className="block bg-purple-600 float-right hover:bg-purple-800 text-white tracking-wide flex
                capitalize py-2 px-4 rounded focus:bg-purple-800 focus:outline-none focus:shadow-outline"
                onClick={handleBookEvent}
              >
                <HiPlus className="mt-1 mr-1 font-bold" />
                <span>Book Event</span>
              </button>
            ) : !oneEvent.attendees
                .map(attendee => attendee.id)
                .includes(user.id) &&
              oneEvent.capacity - oneEvent.attendees.length <= 0 ? (
              <button
                disabled
                className="block bg-purple-600 float-right text-white tracking-wide flex
              capitalize py-2 px-4 rounded opacity-50 cursor-not-allowed"
              >
                <HiPlus className="mt-1 mr-1 font-bold" />
                <span>Book Event</span>
              </button>
            ) : (
              <div>
                {user.bookedEvents.map(booking => (
                  <div key={booking.id}>
                    {booking.event.id === oneEvent.id && (
                      <Link to={`/bookings/${booking.id}`}>
                        <button
                          className="block bg-gray-500 float-right hover:bg-gray-600 text-white tracking-wide flex
                capitalize py-2 px-4 rounded focus:bg-purple-800 focus:outline-none focus:shadow-outline"
                        >
                          <HiOutlineTrash className="mt-1 mr-1 font-bold" />
                          <span>Cancel Booking</span>
                        </button>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {eventData}
        {eventAttendees}
      </div>
    )
  }

  if (!error && oneEvent && user && user.name === oneEvent.user.name) {
    const loggedUser = window.localStorage.getItem('loggedUser')
    const loggedUserJSON = JSON.parse(loggedUser)
    const loggedUserToken = loggedUserJSON.userToken

    let groups = []
    if (selectedGroups) {
      groups = selectedGroups.map(group => {
        let properties = {
          _id: group.value
        }
        return properties
      })
    }

    const onSubmit = async e => {
      e.preventDefault()

      await eventService.setToken(loggedUserToken)
      eventService.update(id, { ...oneEvent, groups })
      history.goBack()
      Swal.fire({
        icon: 'success',
        title: `${oneEvent.title} has been updated!`,
        showConfirmButton: false,
        timer: 1500
      })
    }

    let currentGroups = oneEvent.groups.map(group => {
      let properties = {
        value: group.id,
        label: group.name
      }
      return properties
    })

    const handleOnChange = (eventKey, value) =>
      setOneEvent({ ...oneEvent, [eventKey]: value })

    const handleSelectOnChange = selectedGroups => {
      if (selectedGroups === null) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please select at least one group'
        })
      }
      setSelectedGroups(selectedGroups)
    }

    const handleDeleteEvent = async e => {
      await eventService.setToken(loggedUserToken)
      eventService.deleteEvent(id)
      history.goBack()
    }

    event = (
      <div>
        <div className="w-full max-w-sm container mt-20 mx-auto">
          <form onSubmit={onSubmit}>
            <div className="w-full mb-5">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="title"
              >
                Event title:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
                value={oneEvent.title}
                onChange={e => handleOnChange('title', e.target.value)}
                type="text"
                placeholder="Enter title"
              />
            </div>
            <div className="w-full mb-5">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="description"
              >
                Event description:
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
                value={oneEvent.description}
                onChange={e => handleOnChange('description', e.target.value)}
                type="text"
                placeholder="Enter description"
              />
            </div>
            <div className="w-full  mb-5">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="place"
              >
                Location:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
                value={oneEvent.place}
                onChange={e => handleOnChange('place', e.target.value)}
                type="text"
                placeholder="Enter location"
              />
            </div>
            <div className="w-full  mb-5">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="price"
              >
                Price:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
                value={oneEvent.price}
                onChange={e => handleOnChange('price', e.target.value)}
                type="number"
                placeholder="Enter price"
              />
            </div>
            <div className="w-full  mb-5">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="date"
              >
                Date:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
                value={new Date(oneEvent.date)
                  .toISOString()
                  .split('')
                  .slice(0, 16)
                  .join('')}
                onChange={e => handleOnChange('date', e.target.value)}
                type="datetime-local"
                min={new Date()
                  .toISOString()
                  .split('')
                  .slice(0, 16)
                  .join('')}
                placeholder="Enter date"
              />
            </div>
            <div className="w-full  mb-5">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="capacity"
              >
                Max capacity:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
                value={oneEvent.capacity}
                onChange={e => handleOnChange('capacity', e.target.value)}
                type="number"
                placeholder="Enter capacity"
              />
            </div>
            <div className="w-full mb-5">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="selectedGroups"
              >
                Groups:
              </label>
              <SelectGroups
                onChange={handleSelectOnChange}
                defaultValue={currentGroups}
              />
            </div>
            <div className="flex items-center justify-between">
              <button className="block mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:text-gray-600 focus:shadow-outline">
                Edit Event
              </button>
            </div>
          </form>
          <div className="flex items-center justify-between">
            <button
              onClick={e =>
                Swal.fire({
                  title: 'Are you sure?',
                  text: 'This event will be deleted permanently.',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!',
                  reverseButtons: true
                }).then(result => {
                  if (result.value) {
                    e.persist()
                    handleDeleteEvent(e)
                    Swal.fire(
                      'Deleted!',
                      'Your event has been deleted.',
                      'success'
                    )
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('Cancelled', 'Your event is safe :)', 'error')
                  }
                })
              }
              className="block mt-5 bg-red-400 w-full hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:text-gray-600 focus:shadow-outline"
            >
              Delete Event
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="justify-center w-full bg-gray-100
    sm:p-1 md:p-2 lg:px-48 lg:py-8 xl:px-64 border-t border-gray-300 min-h-screen"
    >
      {event}
      <GoBack />
    </div>
  )
}

export default EventDetails
