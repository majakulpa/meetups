import React, { useState, useContext } from 'react'
import { GlobalContext } from './../../context/GlobalState'
import { Link, useHistory } from 'react-router-dom'
import eventService from './../../services/events'
import Swal from 'sweetalert2'

const CreateEvent = () => {
  const [state, dispatch] = useContext(GlobalContext)
  const [title, setTitle] = useState('')
  const [capacity, setCapacity] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [place, setPlace] = useState('')
  const [date, setDate] = useState('')
  let history = useHistory()

  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  const user = JSON.parse(loggedUserJSON)

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
      eventService.setToken(user.token)
      await eventService.create(eventObject).then(returnedEvent => {
        dispatch({ type: 'ADD_EVENT', payload: returnedEvent })
        // setEvents(events.concat(returnedEvent))
        setTitle('')
        setDate('')
        setPrice('')
        setCapacity('')
        setDescription('')
        setPlace('')
      })
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
            value={title}
            onChange={e => setTitle(e.target.value)}
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
            value={description}
            onChange={e => setDescription(e.target.value)}
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
            value={place}
            onChange={e => setPlace(e.target.value)}
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
            value={date}
            onChange={e => setDate(e.target.value)}
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
            value={price}
            onChange={e => setPrice(e.target.value)}
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
            value={capacity}
            onChange={e => setCapacity(e.target.value)}
            type="number"
            placeholder="Event Capacity"
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
