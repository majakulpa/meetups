import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from './../../context/GlobalState'
import eventService from './../../services/events'
import { useHistory } from 'react-router-dom'

const EventDetails = ({ match }) => {
  const [oneEvent, setOneEvent] = useState({
    id: null,
    date: '',
    title: '',
    price: '',
    capacity: '',
    description: '',
    place: '',
    user: {}
  })
  const [error, setError] = useState('')
  let history = useHistory()

  const id = match.params.id
  useEffect(() => {
    eventService
      .getOneEvent(id)
      .then(data => {
        setOneEvent(data)
      })
      .catch(error => {
        setError(error)
      })
  }, [])

  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  const user = JSON.parse(loggedUserJSON)

  const onSubmit = async e => {
    e.preventDefault()
    await eventService.update(id, oneEvent)
    history.goBack()
  }

  const handleOnChange = (eventKey, value) =>
    setOneEvent({ ...oneEvent, [eventKey]: value })

  let event = <p>Loading...</p>
  if (error) {
    event = (
      <p>
        Something went wrong: <span>{error}</span>
      </p>
    )
  }

  if (!error && oneEvent && user.name !== oneEvent.user.name) {
    event = (
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
        <button className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
          <span className="pl-2">Book Event</span>
        </button>
      </div>
    )
  }

  if (!error && oneEvent && user.name === oneEvent.user.name) {
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
            <div className="flex items-center justify-between">
              <button className="block mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:text-gray-600 focus:shadow-outline">
                Edit Event
              </button>
            </div>
          </form>
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
