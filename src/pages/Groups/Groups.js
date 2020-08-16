import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from './../../context/Context'
import { useHistory, Link } from 'react-router-dom'
import groupService from './../../services/groups'
import userService from './../../services/users'
import GroupList from './../../components/Group/GroupList'

const groups = () => {
  const [groups, setGroups] = useState([])
  const { user, setUser } = useContext(GlobalContext)
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
  }, [])

  useEffect(() => {
    let isActive = true
    groupService.getAllGroups().then(allGroups => {
      if (isActive) {
        setGroups(allGroups)
      }
    })
    return () => {
      isActive = false
    }
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
      {user && (
        <div className="flex-grow text-right px-4 py-2 m-2">
          <Link to="/create-group">
            <button className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
              <span className="pl-2">Create Group</span>
            </button>
          </Link>
        </div>
      )}
      {allGroups}
      <div className="text-center mt-4 text-gray-500">
        <button onClick={() => history.push('/')}>Go back</button>
      </div>
    </div>
  )
}

export default groups
