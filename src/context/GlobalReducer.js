export default (state, action) => {
  switch (action.type) {
    case 'SET_EVENTS':
      return {
        ...state,
        events: action.payload
      }
    case 'ADD_EVENT':
      return {
        ...state,
        events: [...state.events, action.payload]
      }
    case 'DELETE_EVENT':
      return {
        ...state,
        events: [...state.events, action.payload]
      }
    case 'EDIT_EVENT':
      const updatedEvent = action.payload

      const updatedEvents = state.events.map(event => {
        if (event.id === updatedEvent.id) {
          return updatedEvent
        }
        return event
      })

      return {
        ...state,
        events: updatedEvents
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
