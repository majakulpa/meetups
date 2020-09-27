import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import loginService from './../../services/login'
import eventService from './../../services/events'
import Footer from './../../components/UI/Footer'
import Swal from 'sweetalert2'

const Login = () => {
  const [userData, setUserData] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  let history = useHistory()

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const userData = await loginService.login({ username, password })
      let userToken = userData.token
      let userId = userData.id
      window.localStorage.setItem(
        'loggedUser',
        JSON.stringify({ userToken, userId })
      )
      setUserData(userData)
      eventService.setToken(userData.token)
      setUsername('')
      setPassword('')
      Swal.fire({
        icon: 'success',
        title: `Welcome ${userData.name}!`,
        showConfirmButton: false,
        timer: 1500
      })
      history.push('/')
    } catch (exception) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Incorrect password or username'
      })
    }
  }

  return (
    <React.Fragment>
      <div className="sp-screen bg-gray-100 py-10">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm container p-5 my-5 mx-auto 
          bg-white rounded border-solid border border-gray-200"
        >
          <h2 className="text-center text-3xl font-bold text-purple-600">
            Login
          </h2>
          <div className="my-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              name="username"
              id="username"
              autoComplete="off"
              placeholder="Your username"
              onChange={({ target }) => setUsername(target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 
              leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="my-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              name="password"
              id="password"
              autoComplete="off"
              placeholder="Your password"
              onChange={({ target }) => setPassword(target.value)}
              className="ppearance-none border rounded w-full py-2 px-3 text-gray-700 
                leading-tight focus:outline-none focus:shadow-outline"
            />
            <Link
              to="/password-reset"
              className="text-purple-600 hover:text-pruple-800 hover:underline text-sm font-bold"
            >
              Forgot password?
            </Link>
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white bg-purple-600 
            w-full hover:bg-purple-800 text-white font-bold py-2 px-4 
            rounded rounded focus:outline-none focus:shadow-outline mb-5"
            type="submit"
          >
            Login
          </button>

          <Link
            to="/signup"
            className="text-purple-600 hover:text-pruple-800 hover:underline pb-1 text-sm font-bold"
          >
            Don't have an account? Signup
          </Link>
        </form>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default Login
