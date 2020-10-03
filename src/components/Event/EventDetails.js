import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../../context/Context'
import eventService from './../../services/events'
import userService from './../../services/users'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import EditEvent from './EditEvent'
import UserList from '../UI/UserList'
import AvatarCard from '../UI/AvatarCard'
import CancelButton from '../UI/CancelButton'
import PlusButton from '../UI/PlusButton'
import Layout from '../UI/Layout'

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

  let event = <div className="loader"></div>
  if (error) {
    event = (
      <p>
        Something went wrong: <span>{error}</span>
      </p>
    )
  }

  let eventHeading = (
    <React.Fragment>
      <p className="text-xs sm:text-sm flex flex-col sm:flex-row">
        <span>{new Date(oneEvent.date).toDateString()},</span>{' '}
        <span>{new Date(oneEvent.date).toLocaleTimeString('en-US')}</span>
      </p>

      <h2 className="capitalize text-xl md:text-3xl font-bold mb-3">
        {oneEvent.title}
      </h2>
      <AvatarCard
        image={oneEvent.user.profileImage}
        name={oneEvent.user.name}
        text="Hosted by"
      />
    </React.Fragment>
  )

  let eventData = (
    <React.Fragment>
      <p className="mb-5">{oneEvent.description}</p>
      <div className="flex justify-between">
        <div>
          <p className="font-bold sm:text-lg">{oneEvent.place}</p>
          <p className="font-medium sm:text-lg">
            Price: {oneEvent.price === 0 ? 'Free' : '$' + oneEvent.price}
          </p>
        </div>
        <div className="text-right">
          <p className="font-medium sm:text-lg">
            {oneEvent.capacity - oneEvent.attendees.length} spots left!
          </p>
          <p>Max capacity: {oneEvent.capacity}</p>
        </div>
      </div>
      {oneEvent.groups.length > 0 && (
        <div className="mt-5 mb-8 flex flex-wrap">
          {oneEvent.groups.map(group => (
            <span
              key={group.id}
              className="bg-purple-400 text-white text-sm py-1 px-3 rounded-full m-1"
            >
              {group.name}
            </span>
          ))}
        </div>
      )}
    </React.Fragment>
  )

  let eventAttendees = (
    <UserList usersArr={oneEvent.attendees} user={user} text="Attendees" />
  )

  if (!error && oneEvent && !user) {
    event = (
      <div className="rounded border-solid border border-gray-200 bg-white p-2 sm:p-3 md:p-5">
        {eventHeading}
        {eventData}
      </div>
    )
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
        timer: 1000
      })
    }

    event = (
      <div className="rounded border-solid border border-gray-200 bg-white p-2 sm:p-3 md:p-5">
        <div className="flex justify-between mb-5">
          <div>{eventHeading}</div>
          <div>
            {!oneEvent.attendees
              .map(attendee => attendee.id)
              .includes(user.id) &&
            oneEvent.capacity - oneEvent.attendees.length > 0 ? (
              <PlusButton
                click={handleBookEvent}
                text="Book Event"
                plus={true}
              />
            ) : !oneEvent.attendees
                .map(attendee => attendee.id)
                .includes(user.id) &&
              oneEvent.capacity - oneEvent.attendees.length <= 0 ? (
              ''
            ) : (
              <div>
                {user.bookedEvents.map(booking => (
                  <div key={booking.id}>
                    {booking.event.id === id && (
                      <CancelButton
                        id={booking.id}
                        preLink="bookings"
                        afterLink=""
                        text="Cancel Booking"
                      />
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
        timer: 1000
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
      <div className="rounded border-solid border border-gray-200 bg-white p-2 sm:p-3 md:p-5 pb-16">
        <EditEvent
          onSubmit={onSubmit}
          oneEvent={oneEvent}
          handleDeleteEvent={handleDeleteEvent}
          handleSelectOnChange={handleSelectOnChange}
          handleOnChange={handleOnChange}
          currentGroups={currentGroups}
        />
        <div className="pt-5 w-full flex flex-col">{eventAttendees}</div>
      </div>
    )
  }

  return <Layout content={event} />
}

export default EventDetails
