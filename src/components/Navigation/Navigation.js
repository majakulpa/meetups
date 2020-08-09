import React, { useContext } from 'react'
import { GlobalContext } from '../../context/Context'
import { NavLink, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

const navigation = () => {
  const { user, setUser } = useContext(GlobalContext)
  let history = useHistory()

  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
    history.push('/')
    Swal.fire({
      icon: 'info',
      title: `You are logged out!`,
      showConfirmButton: false,
      timer: 1500
    })
  }

  return (
    <header className="flex">
      <div className="mr-6">
        <NavLink to="/">Meetups</NavLink>
      </div>
      <nav>
        <ul className="flex">
          <li className="mr-6">
            <NavLink to="/">Events</NavLink>
          </li>
          <li className="mr-6">
            <NavLink to="/groups">Groups</NavLink>
          </li>
          {!user ? (
            <li className="mr-6">
              <NavLink to="/login">Login</NavLink>
            </li>
          ) : (
            <React.Fragment>
              <li className="mr-6">
                <NavLink to="/bookings">Bookings</NavLink>
              </li>
              <li className="mr-6">
                <NavLink to={`/users/${user.id}`}>Hi {user.name}!</NavLink>
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
