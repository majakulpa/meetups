import React, { useState, useEffect, useContext, Suspense } from 'react'
import { GlobalContext } from '../../context/Context'
import eventService from './../../services/events'
import userService from './../../services/users'
const EventsContent = React.lazy(() => import('./EventsContent'))

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
    <Suspense fallback={<div className="loader"></div>}>
      <EventsContent
        searchResult={searchResult}
        searchHandleChange={searchHandleChange}
        handleClearSearch={handleClearSearch}
        user={user}
        click={() => setShowAllEvents(!showAllEvents)}
        showAllEvents={showAllEvents}
        searchDateHandleChange={searchDateHandleChange}
        events={
          searchResult.length < 1 && dateSearchResult.length < 1
            ? eventsToShow
            : searchDisplay
        }
      />
    </Suspense>
  )
}

export default Events
