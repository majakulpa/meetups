import React, { useContext } from 'react'
import { GlobalContext } from '../../context/Context'
import { NavLink, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { HiOutlineLogout, HiOutlineUserCircle } from 'react-icons/hi'
import {
  NavBrand,
  Header,
  NavToggle,
  NavItem,
  NavMenu
} from 'tailwind-react-ui'

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
    <Header
      bg="white"
      text="gray-700"
      className="border-solid border-b border-gray-200"
    >
      <NavBrand className="mr-6 text-purple-600 text-2xl">
        <NavLink to="/">
          <img
            src={process.env.PUBLIC_URL + '/assets/Meetups.png'}
            alt="meetups logo"
            width="120"
            height="auto"
          />
        </NavLink>
      </NavBrand>
      <NavToggle className="text-white hover:bg-purple-600 focus:bg-purple-600" />
      <NavMenu className="flex flex-col lg:flex-row">
        <NavLink
          to="/"
          className="hover:bg-purple-600 hover:text-white rounded py-2 px-4"
        >
          <span>Events</span>
        </NavLink>
        <NavLink
          to="/groups"
          className="hover:bg-purple-600 hover:text-white rounded py-2 px-4"
        >
          <span>Groups</span>
        </NavLink>
        {!user ? (
          <NavLink
            to="/login"
            className="hover:bg-purple-600 hover:text-white rounded py-2 px-4"
          >
            <span>Login</span>
          </NavLink>
        ) : (
          <React.Fragment>
            <NavLink
              to="/bookings"
              className="hover:bg-purple-600 hover:text-white rounded py-2 px-4"
            >
              <span>My bookings</span>
            </NavLink>

            {user.profileImage === '' ? (
              <NavLink to={`/my-account/${user.id}`}>
                <HiOutlineUserCircle className="text-2xl" />
              </NavLink>
            ) : (
              <NavLink to={`/my-account/${user.id}`}>
                <div
                  className="h-12 w-12 bg-cover rounded-full bg-center my-2 mx-4"
                  style={{
                    backgroundImage: `url(${user.profileImage}})`
                  }}
                  title="Profile Image"
                ></div>
              </NavLink>
            )}

            <HiOutlineLogout
              className="text-2xl cursor-pointer my-2 mx-4"
              onClick={handleLogout}
            />
          </React.Fragment>
        )}
      </NavMenu>
    </Header>
  )
}

export default navigation
