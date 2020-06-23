import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'

const navigation = props => {
  return (
    <header className="navigation">
      <div className="navigation__logo">
        <NavLink to="/">Meetups</NavLink>
      </div>
      <nav className="navigation__items">
        <ul>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          <li>
            <NavLink to="/groups">Groups</NavLink>
          </li>
          <li>
            <NavLink to="/bookings">Bookings</NavLink>
          </li>
          <li>
            <NavLink to="/account">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default navigation
