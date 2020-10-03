import React, { useContext } from 'react'
import { GlobalContext } from '../../context/Context'
import { NavLink, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import {
  HiOutlineLogout,
  HiOutlineUserCircle,
  HiOutlineMenu
} from 'react-icons/hi'
import Avatar from './../UI/Avatar'

const navigation = () => {
  const { user, setUser } = useContext(GlobalContext)
  let history = useHistory()

  const closeMenu = () => {
    if (window.innerWidth <= 1023) {
      let linksEl = document.querySelector('#menu')
      if (linksEl.style.display === 'block') {
        linksEl.style.display = 'none'
      } else {
        linksEl.style.display = 'block'
      }
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    closeMenu()
    setUser(null)
    history.push('/')
    Swal.fire({
      icon: 'info',
      title: `You are logged out!`,
      showConfirmButton: false,
      timer: 1000
    })
  }

  return (
    <header
      className="lg:px-16 px-6 bg-white border-solid border-b border-gray-200  
    flex flex-wrap justify-between lg:py-3 py-2 navigation"
    >
      <NavLink to="/">
        <img
          src={process.env.PUBLIC_URL + '/assets/Meetups.png'}
          alt="meetups logo"
          width="130"
          height="auto"
          className="pt-2"
        />
      </NavLink>

      <HiOutlineMenu
        className="text-white bg-purple-600 lg:hidden
        focus:bg-purple-600 text-5xl p-1 rounded pointer-cursor "
        onClick={closeMenu}
      />

      <div
        className="hidden lg:flex lg:items-center lg:w-auto w-full"
        id="menu"
      >
        <nav
          className="flex flex-col lg:flex-row lg:items-center
         text-base text-gray-700 pt-4 lg:pt-0"
        >
          <NavLink
            to="/"
            className="hover:bg-purple-600 hover:text-white rounded py-2 px-4"
            onClick={closeMenu}
          >
            <span>Events</span>
          </NavLink>
          <NavLink
            to="/groups"
            className="hover:bg-purple-600 hover:text-white rounded py-2 px-4"
            onClick={closeMenu}
          >
            <span>Groups</span>
          </NavLink>
          {!user ? (
            <NavLink
              to="/login"
              className="hover:bg-purple-600 hover:text-white rounded py-2 px-4"
              onClick={closeMenu}
            >
              <span>Login</span>
            </NavLink>
          ) : (
            <React.Fragment>
              <NavLink
                to="/bookings"
                className="hover:bg-purple-600 hover:text-white rounded py-2 px-4"
                onClick={closeMenu}
              >
                <span>My bookings</span>
              </NavLink>

              {user.profileImage === '' ? (
                <NavLink to={`/my-account/${user.id}`} onClick={closeMenu}>
                  <HiOutlineUserCircle className="text-2xl" />
                </NavLink>
              ) : (
                <NavLink
                  to={`/my-account/${user.id}`}
                  className="mx-4 my-2"
                  onClick={closeMenu}
                >
                  <Avatar image={user.profileImage} />
                </NavLink>
              )}

              <HiOutlineLogout
                className="text-2xl cursor-pointer my-2 mx-4"
                onClick={handleLogout}
              />
            </React.Fragment>
          )}
        </nav>
      </div>
    </header>
  )
}

export default navigation
