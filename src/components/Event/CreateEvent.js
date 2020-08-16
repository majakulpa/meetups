import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import eventService from './../../services/events'
import Swal from 'sweetalert2'

const CreateEvent = () => {
  const [events, setEvents] = useState([])
  const [newEvent, setNewEvent] = useState({
    date: '',
    title: '',
    price: '',
    capacity: '',
    description: '',
    place: '',
    groups: []
  })
  let history = useHistory()

  const loggedUser = window.localStorage.getItem('loggedUser')
  const loggedUserJSON = JSON.parse(loggedUser)
  const loggedUserToken = loggedUserJSON.userToken

  const addEvent = async e => {
    e.preventDefault()

    try {
      await eventService.create({ ...newEvent })
      eventService.setToken(loggedUserToken)
      await setNewEvent(newEvent)
      history.push('/')
      Swal.fire({
        icon: 'success',
        title: 'Your event has been created!',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (exception) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all the fields!'
      })
    }
  }

  const handleOnChange = (eventKey, value) =>
    setNewEvent({ ...newEvent, [eventKey]: value })

  return (
    <div className="w-full max-w-sm container mt-20 mx-auto">
      <form onSubmit={addEvent}>
        <div className="w-full mb-5">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="title"
          >
            Title:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
            value={newEvent.title}
            onChange={e => handleOnChange('title', e.target.value)}
            type="text"
            placeholder="Event title"
          />
        </div>
        <div className="w-full mb-5">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="description"
          >
            Description:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
            value={newEvent.description}
            onChange={e => handleOnChange('description', e.target.value)}
            placeholder="Event description"
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
            value={newEvent.place}
            onChange={e => handleOnChange('place', e.target.value)}
            type="text"
            placeholder="Enter place"
          />
        </div>
        <div className="w-full  mb-5">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="date"
          >
            Date and time:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
            value={newEvent.date}
            onChange={e => handleOnChange('date', e.target.value)}
            type="datetime-local"
            min={new Date()
              .toISOString()
              .split('')
              .slice(0, 16)
              .join('')}
            placeholder="Event price"
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
            value={newEvent.price}
            onChange={e => handleOnChange('price', e.target.value)}
            type="number"
            step="0.01"
            placeholder="Event price"
          />
        </div>
        <div className="w-full  mb-5">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="capacity"
          >
            Capacity:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
            value={newEvent.capacity}
            onChange={e => handleOnChange('capacity', e.target.value)}
            type="number"
            placeholder="Event Capacity"
          />
        </div>
        <div className="w-full  mb-5">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="groups"
          >
            Groups:
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
            value={newEvent.groups}
            onChange={e => handleOnChange('groups', e.target.value)}
            placeholder="Event groups"
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Create Event
          </button>
        </div>
        <div className="text-center mt-4 text-gray-500">
          <Link to="/">Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default CreateEvent
