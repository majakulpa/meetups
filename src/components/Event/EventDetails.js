import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../../context/Context'
import eventService from './../../services/events'
import userService from './../../services/users'
import { useHistory, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import SelectGroups from './../UI/SelectGroups'

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

  let eventData = (
    <div>
      <h2>{oneEvent.title} details</h2>
      <p>Info: {oneEvent.description}</p>
      <p>Location: {oneEvent.place}</p>
      <p>Price: {oneEvent.price === 0 ? 'Free' : '$' + oneEvent.price}</p>
      <p>
        When: {new Date(oneEvent.date).toDateString()},{' '}
        {new Date(oneEvent.date).toLocaleTimeString('en-US')}
      </p>
      <p>Max capacity: {oneEvent.capacity}</p>
      <p>
        Organizer:
        {oneEvent.user.name}
      </p>
      {oneEvent.groups.length > 0 && (
        <ul>
          Group:
          {oneEvent.groups.map(group => (
            <li key={group.id}>{group.name}</li>
          ))}
        </ul>
      )}
      {oneEvent.attendees.length > 0 && (
        <ul>
          Attendees ({oneEvent.attendees.length}):
          {oneEvent.attendees.map(attendee => (
            <li key={attendee.id}>{attendee.name}</li>
          ))}
        </ul>
      )}
    </div>
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
      <div>
        {eventData}
        {!oneEvent.attendees.map(attendee => attendee.id).includes(user.id) ? (
          <button
            className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
            onClick={handleBookEvent}
          >
            <span className="pl-2">Book Event</span>
          </button>
        ) : (
          <div>
            {user.bookedEvents.map(booking => (
              <div key={booking.id}>
                {booking.event.id === oneEvent.id && (
                  <Link to={`/bookings/${booking.id}`}>
                    <button className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
                      <span className="pl-2">Delete booking</span>
                    </button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (!error && oneEvent && user && user.name === oneEvent.user.name) {
    const loggedUser = window.localStorage.getItem('loggedUser')
    const loggedUserJSON = JSON.parse(loggedUser)
    const loggedUserToken = loggedUserJSON.userToken

    const onSubmit = async e => {
      e.preventDefault()
      let groups = selectedGroups.map(group => {
        let properties = {
          _id: group.value
        }
        return properties
      })
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

    const handleSelectOnChange = selectedGroups =>
      setSelectedGroups(selectedGroups)

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
    <div>
      {event}
      <div className="text-center mt-4 text-gray-500">
        <button onClick={() => history.goBack()}>Go back</button>
      </div>
    </div>
  )
}

export default EventDetails
