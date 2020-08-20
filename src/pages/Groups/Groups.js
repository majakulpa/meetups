import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from './../../context/Context'
import { Link } from 'react-router-dom'
import groupService from './../../services/groups'
import userService from './../../services/users'
import GroupList from './../../components/Group/GroupList'
import Search from './../../components/UI/Search'
import GoBack from './../../components/UI/GoBack'

const groups = () => {
  const [groups, setGroups] = useState([])
  const { user, setUser } = useContext(GlobalContext)
  const [error, setError] = useState('')
  const [searchResult, setSearchResult] = useState('')
  const [searchDisplay, setSearchDisplay] = useState([])

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

  useEffect(() => {
    let oldList = groups
    let newList = []
    if (searchResult !== '') {
      newList = oldList.filter(event =>
        event.name.toLowerCase().includes(searchResult.toLowerCase())
      )
      setSearchDisplay(newList)
    } else {
      setSearchDisplay(groups)
    }
  }, [searchResult])

  const searchHandleChange = e => {
    setSearchResult(e.target.value)
  }

  const handleClearSearch = () => {
    setSearchResult('')
  }

  let allGroups = <p>Loading...</p>

  if (error) {
    allGroups = <p>Something went wrong</p>
  }

  if (groups) {
    allGroups = (
      <GroupList groups={searchResult.length < 1 ? groups : searchDisplay} />
    )
  }

  return (
    <div className="groups">
      <div className="flex items-center">
        <Search
          value={searchResult}
          searchHandleChange={searchHandleChange}
          placeholder="Search by group name"
        />
        <button
          onClick={handleClearSearch}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Clear
        </button>
      </div>
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
      <GoBack />
    </div>
  )
}

export default groups
