import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from './../../context/Context'
import groupService from '../../services/groups'
import userService from '../../services/users'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

const GroupUnsubscribe = ({ match }) => {
  const { user, setUser } = useContext(GlobalContext)
  const [oneSubscription, setOneSubscription] = useState(null)
  const [loggedUserToken, setLoggedUserToken] = useState('')
  const [error, setError] = useState('')
  let history = useHistory()

  const id = match.params.id

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')

    if (loggedUser) {
      const loggedUserJSON = JSON.parse(loggedUser)
      const loggedUserId = loggedUserJSON.userId
      setLoggedUserToken(loggedUserJSON.userToken)
      userService.getOneUser(loggedUserId).then(data => {
        setUser(data)
      })
    }

    groupService
      .getOneGroup(id)
      .then(data => {
        setOneSubscription(data)
      })
      .catch(error => {
        setError(error)
      })
  }, [])

  let subscription = <p>Loading...</p>
  if (error) {
    subscription = (
      <p>
        Something went wrong: <span>{error}</span>
      </p>
    )
  }

  if (!error && oneSubscription && user) {
    const handleDeleteSubscription = async e => {
      await groupService.setToken(loggedUserToken)
      groupService.leaveGroup(id)
      Swal.fire({
        icon: 'success',
        title: `You left ${oneSubscription.name}!`,
        showConfirmButton: false,
        timer: 1500
      })
      history.goBack()
    }

    subscription = (
      <div>
        <p>Are you sure that you want to leave {oneSubscription.name}</p>
        <button
          className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
          onClick={handleDeleteSubscription}
        >
          Yes, leave this group
        </button>
      </div>
    )
  }

  return (
    <React.Fragment>
      {subscription}
      <div className="text-center mt-4 text-gray-500">
        <button onClick={() => history.goBack()}>Go back</button>
      </div>
    </React.Fragment>
  )
}

export default GroupUnsubscribe
