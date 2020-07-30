import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from './../../context/GlobalState'
import { Link } from 'react-router-dom'
import EventsList from './../../components/Event/EventsList'
import eventService from './../../services/events'
import Search from './../../components/Search/Search'
import SearchDate from './../../components/Search/SearchDate'
import Swal from 'sweetalert2'

const Events = () => {
  const [state, dispatch] = useContext(GlobalContext)
  const [showAllEvents, setShowAllEvents] = useState(true)
  const [searchResult, setSearchResult] = useState('')
  const [dateSearchResult, setDateSearchResult] = useState('')
  const [searchDisplay, setSearchDisplay] = useState([])
  const [dateSearchDisplay, setDateSearchDisplay] = useState([])

  const todayDate = new Date()
    .toISOString()
    .split('')
    .slice(0, 16)
    .join('')

  useEffect(() => {
    // const abortController = new window.AbortController()
    // const signal = abortController.signal

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({ type: 'LOGIN', payload: user })
      if (!window.localStorage.getItem('loggedInMsg')) {
        Swal.fire({
          icon: 'success',
          title: `Welcome ${user.name}!`,
          showConfirmButton: false,
          timer: 1500
        })
      }
      window.localStorage.setItem('loggedInMsg', 'loggedIn')
    }

    eventService.getAll().then(initialEvents => {
      dispatch(
        { type: 'SET_EVENTS', payload: initialEvents }
        //{ signal: signal }
      )
    })
    // return function cleanup() {
    //   abortController.abort()
    // }
  }, [])

  const eventsToShow = showAllEvents
    ? state.events
        .filter(event => event.date >= todayDate)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
    : state.events
        .filter(event => event.price === 0 && event.date >= todayDate)
        .sort((a, b) => new Date(a.date) - new Date(b.date))

  const searchHandleChange = e => {
    setSearchResult(e)
    let oldList = eventsToShow

    if (searchResult !== '') {
      let newList = []
      newList = oldList.filter(
        event =>
          event.title.toLowerCase().includes(searchResult.toLowerCase()) ||
          event.place.toLowerCase().includes(searchResult.toLowerCase())
      )

      setSearchDisplay(newList)
    } else {
      setSearchDisplay(eventsToShow)
    }
  }

  const searchDateHandleChange = e => {
    setDateSearchResult(e)
    let oldDateList = eventsToShow

    if (dateSearchResult !== '') {
      let newDateList = []
      newDateList = oldDateList.filter(event =>
        event.date.includes(dateSearchResult)
      )
      console.log(newDateList)
      setDateSearchDisplay(newDateList)
    } else {
      setDateSearchDisplay(eventsToShow)
    }
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
          searchHandleChange={e => searchHandleChange(e.target.value)}
        />
        <button
          onClick={() => setSearchResult('')}
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
      <div className="flex-grow text-right px-4 py-2 m-2">
        <Link to="/create">
          <button className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
            <span className="pl-2">Create Event</span>
          </button>
        </Link>
      </div>
      <SearchDate
        value={dateSearchResult}
        searchDateHandleChange={e => searchDateHandleChange(e.target.value)}
      />
      <button
        onClick={() => setSearchResult('')}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Clear
      </button>
      <ul>
        <EventsList
          events={
            searchResult.length < 1 && dateSearchResult.length < 1
              ? eventsToShow
              : searchResult.length >= 1
              ? searchDisplay
              : dateSearchResult.length >= 1 && dateSearchDisplay.length > 0
              ? dateSearchDisplay
              : eventsToShow
          }
        />
      </ul>
    </div>
  )
}

export default Events
