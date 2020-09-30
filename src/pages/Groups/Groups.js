import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from './../../context/Context'
import groupService from './../../services/groups'
import userService from './../../services/users'
import GroupList from './../../components/Group/GroupList'
import GoBack from './../../components/UI/GoBack'
import Footer from './../../components/UI/Footer'
import SearchHeader from './../../components/UI/SearchHeader'

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
      userService
        .getOneUser(loggedUserId)
        .then(data => {
          setUser(data)
        })
        .catch(error => {
          setError(error)
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

  let allGroups = <div class="loader"></div>

  if (error) {
    allGroups = <p>Something went wrong</p>
  }

  if (groups) {
    allGroups = (
      <GroupList groups={searchResult.length < 1 ? groups : searchDisplay} />
    )
  }

  return (
    <React.Fragment>
      <div className="groups sp-screen">
        <SearchHeader
          value={searchResult}
          searchHandleChange={searchHandleChange}
          placeholder="Search by group name"
          handleClearSearch={handleClearSearch}
          user={user}
          link="/create-group"
          create="Create Group"
        />
        <div className="bg-gray-100 border-t border-gray-200">
          <GoBack />
          <div className="flex flex-wrap sm:p-1 md:p-2 lg:px-48 lg:pt-5 lg:pb-16 xl:px-64">
            {allGroups}
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default groups
