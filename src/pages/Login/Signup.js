import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import usersService from './../../services/users'
import loginService from './../../services/login'
import eventService from './../../services/events'
import Swal from 'sweetalert2'

const Signup = () => {
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    password: '',
    email: '',
    description: ''
  })
  const [user, setUser] = useState(null)

  let history = useHistory()

  const handleSignup = async e => {
    e.preventDefault()
    try {
      await usersService.createUser({ ...newUser })

      let username = newUser.username
      let password = newUser.password

      const user = await loginService.login({
        username,
        password
      })

      await window.localStorage.setItem('loggedUser', JSON.stringify(user))

      await eventService.setToken(user.token)
      await setUser(user)

      history.push('/')
    } catch (exception) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Incorrect data'
      })
    }
  }

  const handleOnChange = (eventKey, value) =>
    setNewUser({ ...newUser, [eventKey]: value })

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSignup} className="w-full max-w-xs ">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            value={newUser.username}
            onChange={e => handleOnChange('username', e.target.value)}
            name="username"
            id="username"
            autoComplete="current-username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={e => handleOnChange('name', e.target.value)}
            id="name"
            autoComplete="current-name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            value={newUser.email}
            onChange={e => handleOnChange('email', e.target.value)}
            name="email"
            id="email"
            autoComplete="current-email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={e => handleOnChange('password', e.target.value)}
            id="password"
            autoComplete="current-password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            About:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
            value={newUser.description}
            onChange={e => handleOnChange('description', e.target.value)}
            type="text"
            placeholder="Enter description"
          />
        </div>
        <div className="mt-6 flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Signup
          </button>
          <Link
            to="/login"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Signup
