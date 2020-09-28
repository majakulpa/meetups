import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../../context/Context'
import eventService from './../../services/events'
import userService from './../../services/users'
import SearchDate from '../../components/UI/SearchDate'
import Footer from '../../components/UI/Footer'
import EventCards from '../../components/UI/EventCards'
import BigHeader from '../../components/UI/BigHeader'
import SearchHeader from '../../components/UI/SearchHeader'

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
  }, [])

  useEffect(() => {
    let isActive = true
    eventService.getAll().then(initialEvents => {
      if (isActive) {
        setEvents(initialEvents)
      }
    })
    return () => {
      isActive = false
    }
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
    <React.Fragment>
      <div className="sp-screen">
        <BigHeader />
        <SearchHeader
          value={searchResult}
          searchHandleChange={searchHandleChange}
          placeholder="Search by event name or location"
          handleClearSearch={handleClearSearch}
          user={user}
          link="/create-event"
          create="Create Event"
        />
        <div
          className="flex flex-wrap justify-center w-full bg-gray-100
       sm:p-1 md:p-2 lg:px-48 lg:py-8 xl:px-64 border-t border-gray-200"
        >
          <div className="w-full flex rounded border-solid border border-gray-200 bg-white overflow-hidden mb-3 p-3">
            <div className="w-2/3">
              <ul className="font-normal">
                <EventCards
                  events={
                    searchResult.length < 1 && dateSearchResult.length < 1
                      ? eventsToShow
                      : searchDisplay
                  }
                />
              </ul>
            </div>
            <div className="ml-5">
              <button
                onClick={() => setShowAllEvents(!showAllEvents)}
                className="bg-gray-500 hover:bg-gray-600 text-white w-full capitalize
            py-2 px-4 rounded focus:outline-none mb-5"
              >
                {showAllEvents ? 'free events' : 'all events'}
              </button>
              <SearchDate
                date={dateSearchResult}
                searchDateHandleChange={searchDateHandleChange}
                handleClearSearch={handleClearSearch}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default Events
