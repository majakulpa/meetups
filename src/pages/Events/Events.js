import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../../context/Context'
import { Link } from 'react-router-dom'
import EventsList from './../../components/Event/EventsList'
import eventService from './../../services/events'
import userService from './../../services/users'
import Search from './../../components/Search/Search'

const Events = () => {
  const [events, setEvents] = useState([])
  const { user, setUser } = useContext(GlobalContext)
  const [showAllEvents, setShowAllEvents] = useState(true)
  const [searchResult, setSearchResult] = useState('')
  const [dateSearchResult, setDateSearchResult] = useState('')
  const [searchDisplay, setSearchDisplay] = useState([])

  const todayDate = new Date()
    .toISOString()
    .split('')
    .slice(0, 16)
    .join('')

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')

    if (loggedUser) {
      const loggedUserJSON = JSON.parse(loggedUser)
      const loggedUserId = loggedUserJSON.userId
      userService.getOneUser(loggedUserId).then(data => {
        setUser(data)
      })
    }

    eventService.getAll().then(initialEvents => {
      setEvents(initialEvents)
    })
  }, [])

  const eventsToShow = showAllEvents
    ? events
        .filter(event => event.date >= todayDate)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
    : events
        .filter(event => event.price === 0 && event.date >= todayDate)
        .sort((a, b) => new Date(a.date) - new Date(b.date))

  const searchHandleChange = e => {
    setSearchResult(e.target.value)
  }

  const searchDateHandleChange = e => {
    setDateSearchResult(e.target.value)
  }

  useEffect(() => {
    let oldList = eventsToShow
    let newList = []
    if (searchResult !== '' && dateSearchResult === '') {
      newList = oldList.filter(
        event =>
          event.title.toLowerCase().includes(searchResult.toLowerCase()) ||
          event.place.toLowerCase().includes(searchResult.toLowerCase())
      )
      setSearchDisplay(newList)
    } else if (dateSearchResult !== '' && searchResult === '') {
      newList = oldList.filter(event => event.date.includes(dateSearchResult))
      setSearchDisplay(newList)
    } else if (searchResult !== '' && dateSearchResult !== '') {
      newList = oldList.filter(
        event =>
          (event.title.toLowerCase().includes(searchResult.toLowerCase()) ||
            event.place.toLowerCase().includes(searchResult.toLowerCase())) &&
          event.date.includes(dateSearchResult)
      )
      setSearchDisplay(newList)
    } else {
      setSearchDisplay(eventsToShow)
    }
  }, [dateSearchResult, searchResult])

  const handleClearSearch = () => {
    setSearchResult('')
    setDateSearchResult('')
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-3xl mt-20 text-base leading-8 text-black font-bold tracking-wide uppercase">
        Events
      </h1>
      <div>Search:</div>
      <div className="flex items-center">
        <Search
          value={searchResult}
          searchHandleChange={searchHandleChange}
          date={dateSearchResult}
          searchDateHandleChange={searchDateHandleChange}
        />
        <button
          onClick={handleClearSearch}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Clear
        </button>
      </div>
      <div>
        <button
          onClick={() => setShowAllEvents(!showAllEvents)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Show {showAllEvents ? 'free events' : 'all events'}
        </button>
      </div>
      {user && (
        <div className="flex-grow text-right px-4 py-2 m-2">
          <Link to="/create">
            <button className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
              <span className="pl-2">Create Event</span>
            </button>
          </Link>
        </div>
      )}
      <ul>
        <EventsList
          events={
            searchResult.length < 1 && dateSearchResult.length < 1
              ? eventsToShow
              : searchDisplay
          }
        />
      </ul>
    </div>
  )
}

export default Events
