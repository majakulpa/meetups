import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Event from './../../components/Event/Event'
import eventService from './../../services/events'

const Events = () => {
  const [events, setEvents] = useState([])
  const [newEvent, setNewEvent] = useState('')
  const [showAllEvents, setShowAllEvents] = useState(true)

  useEffect(() => {
    console.log('effect')
    eventService.getAll().then(initialEvents => {
      console.log('done')
      setEvents(initialEvents)
    })
  }, [])

  const addEvent = e => {
    e.preventDefault()
    const newEvent = {
      title: '',
      date: '',
      price: '',
      capacity: '',
      description: '',
      place: ''
    }

    eventService.create(newEvent).then(returnedEvent => {
      setEvents(events.concat(returnedEvent))
      setNewEvent('')
    })
  }

  const handleEventChange = event => {
    setNewEvent(event.target.value)
  }

  const eventsToShow = showAllEvents
    ? events
    : events.filter(event => event.price === 0)

  return (
    <div>
      <h1>Events</h1>
      <div>
        <button onClick={() => setShowAllEvents(!showAllEvents)}>
          Show {showAllEvents ? 'free events' : 'all events'}
        </button>
      </div>
      <ul>
        {eventsToShow.map(event => (
          <Event key={event.id} event={event} />
        ))}
      </ul>
      <form onSubmit={addEvent}>
        <input value={newEvent} onChange={handleEventChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default Events
