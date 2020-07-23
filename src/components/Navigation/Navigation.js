import React, { useContext } from 'react'
import { GlobalContext } from './../../context/GlobalState'
import { NavLink } from 'react-router-dom'

const navigation = () => {
  const [state, dispatch] = useContext(GlobalContext)
  console.log(state, 'st')

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <header className="flex">
      <div className="mr-6">
        <NavLink to="/">Meetups</NavLink>
      </div>
      <nav>
        <ul className="flex">
          <li className="mr-6">
            <NavLink to="/events">Events</NavLink>
          </li>
          <li className="mr-6">
            <NavLink to="/groups">Groups</NavLink>
          </li>
          {!state.isAuthenticated ? (
            <li className="mr-6">
              <NavLink to="/login">Login</NavLink>
            </li>
          ) : (
            <React.Fragment>
              <li className="mr-6">
                <NavLink to="/bookings">Bookings</NavLink>
              </li>
              <li className="mr-6">
                <NavLink to="/account">Hi {state.user.name}!</NavLink>
              </li>
              <li>
                <p className="text-2xl cursor-pointer" onClick={handleLogout}>
                  &#9758;
                </p>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default navigation
