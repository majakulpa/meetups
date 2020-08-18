import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from './../../context/Context'
import userService from './../../services/users'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import SelectGroups from './../../components/UI/SelectGroups'

const account = ({ match }) => {
  const { user, setUser } = useContext(GlobalContext)
  const [selectedGroups, setSelectedGroups] = useState([])
  const [error, setError] = useState('')
  let history = useHistory()

  const id = match.params.id
  useEffect(() => {
    userService
      .getOneUser(id)
      .then(data => {
        setUser(data)
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

  let groups
  if (selectedGroups.length > 0) {
    groups = selectedGroups.map(group => {
      let properties = {
        _id: group.value
      }
      return properties
    })
  } else groups = []

  const onSubmit = async e => {
    e.preventDefault()

    await userService.updateUser(id, { ...user, groups })
    await setUser(user)

    history.goBack()
    Swal.fire({
      icon: 'success',
      title: 'Your data has been edited!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  const handleOnChange = (eventKey, value) =>
    setUser({ ...user, [eventKey]: value })

  const handleSelectOnChange = selectedGroups =>
    setSelectedGroups(selectedGroups)

  let userDetails = <p>Loading...</p>

  if (error) {
    userDetails = (
      <p>
        Something went wrong: <span>{error}</span>
      </p>
    )
  }

  if (user) {
    let userEvents
    if (user.events) {
      userEvents = user.events.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      )
    }

    let currentGroups = user.groups.map(group => {
      let properties = {
        value: group.id,
        label: group.name
      }
      return properties
    })

    userDetails = (
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
              value={user.username}
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
              value={user.name}
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
              value={user.email}
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
              value={user.description}
              onChange={e => handleOnChange('description', e.target.value)}
              type="text"
              placeholder="Enter description"
            />
          </div>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="selectedGroups"
            >
              Joined groups:
            </label>
            <SelectGroups
              onChange={handleSelectOnChange}
              defaultValue={currentGroups}
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="block mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:text-gray-600 focus:shadow-outline">
              Edit
            </button>
          </div>
        </form>
        <ul>
          Created Events:
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
        <ul>
          Created groups:
          {user.createdGroups.map(group => (
            <Link key={group.id} to={`/groups/${group.id}`}>
              <li>{group.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div>
      {userDetails}
      <div className="text-center mt-4 text-gray-500">
        <button onClick={() => history.goBack()}>Go back</button>
      </div>
    </div>
  )
}

export default account
