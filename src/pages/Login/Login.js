import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import loginService from './../../services/login'
import eventService from './../../services/events'
import ErrorMessage from '../../components/Notifications/ErrorMessage'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  let history = useHistory()

  useEffect(() => {
    const abortController = new window.AbortController()
    const signal = abortController.signal

    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      eventService.setToken(user.token, {
        signal: signal
      })
    }

    return function cleanup() {
      abortController.abort()
    }
  }, [])

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      eventService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      history.push('/')
    } catch (exception) {
      setErrorMessage('Incorrect password or username')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div className="container mx-auto">
      login
      <ErrorMessage message={errorMessage} />
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
    </div>
  )
}

export default Login
