import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from './../../context/Context'
import { Link } from 'react-router-dom'
import groupService from './../../services/groups'
import userService from './../../services/users'
import GroupList from './../../components/Group/GroupList'
import Search from './../../components/UI/Search'
import GoBack from './../../components/UI/GoBack'
import { HiPlus } from 'react-icons/hi'

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
      <div className="flex justify-between sm:p-1 md:p-2 lg:px-48 lg:py-5 xl:px-64">
        <div className="flex">
          <Search
            value={searchResult}
            searchHandleChange={searchHandleChange}
            placeholder="Search by group name"
            handleClearSearch={handleClearSearch}
          />
        </div>
        {user && (
          <div className="">
            <Link to="/create-group">
              <button
                className="block bg-purple-600 float-right hover:bg-purple-800 text-white tracking-wide flex
                capitalize py-2 px-4 rounded focus:bg-purple-800 focus:outline-none focus:shadow-outline"
              >
                <HiPlus className="mt-1 mr-1 font-bold" />
                <span>Create group</span>
              </button>
            </Link>
          </div>
        )}
      </div>
      <div className="-full bg-gray-100 border-t border-gray-300">
        <GoBack />
        <div className="flex flex-wrap justify-center sm:p-1 md:p-2 lg:px-48 lg:py-5 xl:px-64">
          {allGroups}
        </div>
      </div>
    </div>
  )
}

export default groups
