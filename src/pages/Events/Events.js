import React, { useState, useEffect } from 'react'
import Event from './../../components/Event/Event'
import eventService from './../../services/events'
import ErrorMessage from '../../components/Notifications/ErrorMessage'
import SuccessMessage from '../../components/Notifications/SuccessMessage'

const Events = () => {
  const [events, setEvents] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [capacity, setCapacity] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [place, setPlace] = useState('')
  const [date, setDate] = useState('')
  const [showAllEvents, setShowAllEvents] = useState(true)

  useEffect(() => {
    console.log('effect')
    eventService.getAll().then(initialEvents => {
      console.log('done')
      setEvents(initialEvents)
    })
  }, [])

  const addEvent = async e => {
    e.preventDefault()
    try {
      const eventObject = {
        title: title,
        date: date,
        price: price,
        capacity: capacity,
        description: description,
        place: place
      }

      await eventService.create(eventObject).then(returnedEvent => {
        setEvents(events.concat(returnedEvent))
        setTitle('')
        setDate('')
        setPrice('')
        setCapacity('')
        setDescription('')
        setPlace('')
      })
      setSuccessMessage(`${eventObject.title} event was created!`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Please fill all the fields')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleTitleChange = e => {
    setTitle(e.target.value)
  }

  const handlePriceChange = e => {
    setPrice(e.target.value)
  }

  const handleDescriptionChange = e => {
    setDescription(e.target.value)
  }

  const handleCapacityChange = e => {
    setCapacity(e.target.value)
  }

  const handlePlaceChange = e => {
    setPlace(e.target.value)
  }

  const handleDateChange = e => {
    setDate(e.target.value)
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
      <ErrorMessage message={errorMessage} />
      <SuccessMessage message={successMessage} />
      <form onSubmit={addEvent}>
        <label>
          Title:
          <input value={title} onChange={handleTitleChange} type="text" />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={handleDescriptionChange} />
        </label>
        <label>
          Price:
          <input
            value={price}
            onChange={handlePriceChange}
            type="number"
            step="0.01"
          />
        </label>
        <label>
          Location:
          <input value={place} onChange={handlePlaceChange} type="text" />
        </label>
        <label>
          Max Capacity:
          <input
            value={capacity}
            onChange={handleCapacityChange}
            type="number"
          />
        </label>
        <label htmlFor="date">
          Date:
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={date}
            min={new Date()
              .toISOString()
              .split('')
              .slice(0, 16)
              .join('')}
            onChange={handleDateChange}
          />
        </label>
        <button type="submit">save</button>
      </form>
      <br />
    </div>
  )
}

export default Events
