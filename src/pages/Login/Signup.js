import React, { useState, Suspense } from 'react'
import { useHistory } from 'react-router-dom'
import usersService from './../../services/users'
import loginService from './../../services/login'
import eventService from './../../services/events'
import Swal from 'sweetalert2'
const SignupForm = React.lazy(() => import('./SignupForm'))

const Signup = () => {
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    password: '',
    email: '',
    description: '',
    profileImage: ''
  })
  const [passwordShown, setPasswordShown] = useState(false)

  let history = useHistory()

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true)
  }

  const handleSignup = async e => {
    e.preventDefault()

    try {
      if (newUser.password.length >= 6) {
        await usersService.createUser({ ...newUser })
      }

      let username = newUser.username
      let password = newUser.password

      const loggedUser = await loginService.login({
        username,
        password
      })

      let userToken = loggedUser.token
      let userId = loggedUser.id
      window.localStorage.setItem(
        'loggedUser',
        JSON.stringify({ userToken, userId })
      )
      eventService.setToken(userToken)
      await setNewUser(newUser)
      Swal.fire({
        icon: 'success',
        title: `Welcome ${loggedUser.name}!`,
        showConfirmButton: false,
        timer: 1000
      })
      history.push('/')
    } catch (error) {
      const dataError = JSON.stringify(error.response.data)
      if (dataError.includes('expected `username` to be unique')) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'This username is already taken'
        })
      } else if (dataError.includes('expected `email` to be unique')) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'This email is already in use'
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill all the required fields'
        })
      }
    }
  }

  const handleOnChange = (eventKey, value) =>
    setNewUser({ ...newUser, [eventKey]: value })

  return (
    <Suspense fallback={<div className="loader"></div>}>
      <SignupForm
        handleSignup={handleSignup}
        newUser={newUser}
        handleOnChange={handleOnChange}
        passwordShown={passwordShown}
        togglePasswordVisiblity={togglePasswordVisiblity}
      />
    </Suspense>
  )
}

export default Signup
