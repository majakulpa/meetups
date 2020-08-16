import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import groupService from './../../services/groups'
import GroupList from './../../components/Group/GroupList'

const groups = () => {
  const [groups, setGroups] = useState([])
  const [error, setError] = useState('')
  let history = useHistory()

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
  }, [groups])

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
