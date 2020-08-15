import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from './../../context/Context'
import { useHistory } from 'react-router-dom'
import groupService from './../../services/groups'
import userService from './../../services/users'
import GroupList from './../../components/Group/GroupList'

const groups = () => {
  const { user, setUser } = useContext(GlobalContext)
  const [groups, setGroups] = useState([])
  const [error, setError] = useState('')
  let history = useHistory()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')

    if (loggedUser) {
      const loggedUserJSON = JSON.parse(loggedUser)
      const loggedUserId = loggedUserJSON.userId
      userService.getOneUser(loggedUserId).then(data => {
        setUser(data)
      })
    }

    groupService.getAllGroups().then(allGroups => {
      setGroups(allGroups)
    })
  }, [])

  let allGroups = <p>Loading...</p>

  if (error) {
    allGroups = <p>Something went wrong</p>
  }

  if (groups) {
    allGroups = <GroupList groups={groups} />
  }

  return (
    <div className="groups">
      {allGroups}
      <div className="text-center mt-4 text-gray-500">
        <button onClick={() => history.goBack()}>Go back</button>
      </div>
    </div>
  )
}

export default groups
