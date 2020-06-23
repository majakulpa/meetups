import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'

const navigation = props => {
  return (
    <header>
      <div>Meetups</div>
      <nav>
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
