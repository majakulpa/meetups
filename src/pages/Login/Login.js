import React, { useState, useEffect } from 'react'
import loginService from './../../services/login'
import eventService from './../../services/events'
import ErrorMessage from '../../components/Notifications/ErrorMessage'
import SuccessMessage from '../../components/Notifications/SuccessMessage'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      eventService.setToken(user.token)
    }
  }, [])

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      eventService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage(`${user.name} is successfuly logged in!`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Incorrect password or username')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    localStorage.clear()
  }

  return (
    <div>
      <ErrorMessage message={errorMessage} />
      <SuccessMessage message={successMessage} />
      <form onSubmit={handleLogin} className="w-full max-w-xs ">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            value={username}
            name="username"
            id="username"
            autoComplete="current-username"
            onChange={({ target }) => setUsername(target.value)}
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
            value={password}
            name="password"
            id="password"
            autoComplete="current-password"
            onChange={({ target }) => setPassword(target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mt-6 flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
          <p className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Signup
          </p>
        </div>
      </form>
      {user && <p>{user.name} is logged in</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Login
