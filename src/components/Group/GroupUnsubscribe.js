import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from './../../context/Context'
import groupService from '../../services/groups'
import userService from '../../services/users'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import Leave from './../UI/Leave'
import Layout from './../UI/Layout'

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

  let subscription = <div class="loader"></div>
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
        timer: 1000
      })
      history.goBack()
    }

    subscription = (
      <Leave
        question="Are you sure that you want to leave"
        textOne={oneSubscription.name}
        click={() => history.goBack()}
        handleDelete={handleDeleteSubscription}
        confirm="Leave Group"
      />
    )
  }

  return <Layout content={subscription} />
}

export default GroupUnsubscribe
