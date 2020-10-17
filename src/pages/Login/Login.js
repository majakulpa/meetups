import React, { useState, Suspense } from 'react'
import { useHistory } from 'react-router-dom'
import loginService from './../../services/login'
import eventService from './../../services/events'
import Swal from 'sweetalert2'
const LoginForm = React.lazy(() => import('./LoginForm'))

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
        timer: 1000
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
    <Suspense fallback={<div className="loader"></div>}>
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        password={password}
        onUsername={({ target }) => setUsername(target.value)}
        onPassword={({ target }) => setPassword(target.value)}
      />
    </Suspense>
  )
}

export default Login
