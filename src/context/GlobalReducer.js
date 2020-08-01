export default (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      }
    case 'SIGNUP':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      }
    case 'LOGOUT':
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false
      }
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
    case 'GET_EVENT':
      return {
        ...state,
        events: action.payload
      }
    case 'DELETE_EVENT':
      return {
        ...state,
        events: [...state.events, action.payload]
      }
    case 'EDIT_EVENT':
      return {
        ...state,
        events: [...state.events, action.payload]
      }
    case 'SET_TOKEN':
      return {
        token: action.payload
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
