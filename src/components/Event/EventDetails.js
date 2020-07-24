import React, { useContext, useEffect } from 'react'
import { GlobalContext } from './../../context/GlobalState'
import eventService from './../../services/events'
import { useHistory } from 'react-router-dom'

const EventDetails = ({ match }) => {
  const [state, dispatch] = useContext(GlobalContext)
  let history = useHistory()

  const id = match.params.id
  useEffect(() => {
    const abortController = new window.AbortController()
    const signal = abortController.signal
    eventService
      .getOneEvent(id)
      .then(eventsData => {
        dispatch({ type: 'GET_EVENT', payload: eventsData }, { signal: signal })
      })
      .catch(error => {
        dispatch({ type: 'SET_ERROR', payload: error })
      })

    return function cleanup() {
      abortController.abort()
    }
  }, [])

  let event = <p>Loading...</p>

  if (state.error) {
    event = (
      <p>
        Something went wrong: <span>{state.error}</span>
      </p>
    )
  }

  if (!state.error && state.event) {
    event = (
      <div>
        <h2>{state.event.title} details</h2>
        <p>Info: {state.event.description}</p>
        <p>Location: {state.event.place}</p>
        <p>
          Price: {state.event.price === 0 ? 'Free' : '$' + state.event.price}
        </p>
        <p>
          When: {new Date(state.event.date).toDateString()},{' '}
          {new Date(state.event.date).toLocaleTimeString('en-US')}
        </p>
        <p>Max capacity: {state.event.capacity}</p>
        <div className="text-center mt-4 text-gray-500">
          <button onClick={() => history.goBack()}>Go back</button>
        </div>
      </div>
    )
  }

  return <div>{event}</div>
}

export default EventDetails
