import React, { useState, useEffect } from 'react'
import userService from './../../services/users'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

const account = ({ match }) => {
  const [userData, setUserData] = useState({
    id: null,
    username: '',
    name: '',
    email: '',
    description: '',
    events: []
  })
  const [error, setError] = useState('')
  let history = useHistory()

  const id = match.params.id
  useEffect(() => {
    userService
      .getOneUser(id)
      .then(data => {
        setUserData(data)
      })
      .catch(error => {
        setError(error)
      })
  }, [])

  const todayDate = new Date()
    .toISOString()
    .split('')
    .slice(0, 16)
    .join('')

  const onSubmit = async e => {
    e.preventDefault()
    await userService.updateUser(id, userData)

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUserJSON)
    const token = user.token
    await window.localStorage.setItem(
      'loggedUser',
      JSON.stringify({ ...userData, token })
    )

    history.goBack()
    Swal.fire({
      icon: 'success',
      title: 'Your data has been edited!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  const handleOnChange = (eventKey, value) =>
    setUserData({ ...userData, [eventKey]: value })

  let user = <p>Loading...</p>

  if (error) {
    user = (
      <p>
        Something went wrong: <span>{error}</span>
      </p>
    )
  }

  if (userData) {
    let userEvents
    if (userData.events) {
      userEvents = userData.events.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      )
    }

    user = (
      <div className="w-full max-w-sm container mt-20 mx-auto">
        <form onSubmit={onSubmit}>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="username"
            >
              Username:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
              value={userData.username}
              onChange={e => handleOnChange('username', e.target.value)}
              type="text"
              placeholder="Edit username"
            />
          </div>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
              value={userData.name}
              onChange={e => handleOnChange('name', e.target.value)}
              type="text"
              placeholder="Edit name"
            />
          </div>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
              value={userData.email}
              onChange={e => handleOnChange('email', e.target.value)}
              type="email"
              placeholder="Edit email"
            />
          </div>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="description"
            >
              About:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
              value={userData.description}
              onChange={e => handleOnChange('description', e.target.value)}
              type="text"
              placeholder="Enter description"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="block mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:text-gray-600 focus:shadow-outline">
              Edit
            </button>
          </div>
        </form>
        <ul>
          My Events:
          {userEvents.map(event => (
            <Link key={event.id} to={`/events/${event.id}`}>
              <li
                className={`${event.date <= todayDate ? 'text-gray-400' : ''}`}
              >
                {event.title} - {new Date(event.date).toDateString()}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div>
      {user}
      <div className="text-center mt-4 text-gray-500">
        <button onClick={() => history.goBack()}>Go back</button>
      </div>
    </div>
  )
}

export default account
