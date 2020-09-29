import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import usersService from './../../services/users'
import loginService from './../../services/login'
import eventService from './../../services/events'
import SignupForm from './SignupForm'
import Swal from 'sweetalert2'

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
    <SignupForm
      handleSignup={handleSignup}
      newUser={newUser}
      handleOnChange={handleOnChange}
      passwordShown={passwordShown}
      togglePasswordVisiblity={togglePasswordVisiblity}
    />
  )
}

export default Signup
