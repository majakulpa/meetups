import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from './../../context/GlobalState'
import { Link } from 'react-router-dom'
import Event from './../../components/Event/Event'
import eventService from './../../services/events'
import SuccessMessage from '../../components/Notifications/SuccessMessage'

const Events = () => {
  const [state, dispatch] = useContext(GlobalContext)
  const [successMessage, setSuccessMessage] = useState(null)
  const [showAllEvents, setShowAllEvents] = useState(true)

  useEffect(() => {
    const abortController = new window.AbortController()
    const signal = abortController.signal

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({ type: 'LOGIN', payload: user })
      if (!window.localStorage.getItem('loggedInMsg')) {
        setSuccessMessage(`${user.name} is successfuly logged in!`)
      }
      window.localStorage.setItem('loggedInMsg', 'loggedIn')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }

    eventService.getAll().then(initialEvents => {
      dispatch(
        { type: 'SET_EVENTS', payload: initialEvents },
        { signal: signal }
      )
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  const eventsToShow = showAllEvents
    ? state.events
    : state.events.filter(event => event.price === 0)

  return (
    <div className="container mx-auto">
      <SuccessMessage message={successMessage} />
      <h1 className="text-center text-3xl mt-20 text-base leading-8 text-black font-bold tracking-wide uppercase">
        Events
      </h1>
      <div>
        <button
          onClick={() => setShowAllEvents(!showAllEvents)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Show {showAllEvents ? 'free events' : 'all events'}
        </button>
      </div>
      <div className="flex-grow text-right px-4 py-2 m-2">
        <Link to="/create">
          <button className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
            <span className="pl-2">Create Event</span>
          </button>
        </Link>
      </div>
      <ul>
        {eventsToShow.map(event => (
          <Link key={event.id} to={`events/${event.id}`}>
            <Event event={event} />
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default Events
