import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from './../../context/GlobalState'
import { Link } from 'react-router-dom'
import Event from './../../components/Event/Event'
import eventService from './../../services/events'

const Events = () => {
  const [state, dispatch] = useContext(GlobalContext)
  const [showAllEvents, setShowAllEvents] = useState(true)

  useEffect(() => {
    eventService.getAll().then(initialEvents => {
      console.log('eff', initialEvents)
      dispatch({ type: 'SET_EVENTS', payload: initialEvents })
      console.log('done')
    })
  }, [])

  const eventsToShow = showAllEvents
    ? state.events
    : state.events.filter(event => event.price === 0)

  return (
    <div className="container mx-auto">
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
        <Link to="/events/create">
          <button className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
            <span className="pl-2">Create Event</span>
          </button>
        </Link>
      </div>
      <ul>
        {eventsToShow.map(event => (
          <Event key={event.id} event={event} />
        ))}
      </ul>
    </div>
  )
}

export default Events
