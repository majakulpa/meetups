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
      <NavMenu>
        <NavItem className="hover:bg-purple-600 focus:bg-purple-600">
          <NavLink to="/">Events</NavLink>
        </NavItem>
        <NavItem className="hover:bg-purple-600 focus:bg-purple-600">
          <NavLink to="/groups">Groups</NavLink>
        </NavItem>
        {!user ? (
          <NavItem className="hover:bg-purple-600 focus:bg-purple-600">
            <NavLink to="/login">Login</NavLink>
          </NavItem>
        ) : (
          <React.Fragment>
            <NavItem className="hover:bg-purple-600 hover:text-white focus:text-white focus:bg-purple-600">
              <NavLink to="/bookings">My bookings</NavLink>
            </NavItem>
            <NavItem>
              {user.profileImage === '' ? (
                <NavLink to={`/my-account/${user.id}`}>
                  <HiOutlineUserCircle className="text-2xl" />
                </NavLink>
              ) : (
                <NavLink to={`/my-account/${user.id}`}>
                  <div
                    className="h-12 w-12 bg-cover rounded-full bg-center"
                    style={{
                      backgroundImage: `url(${user.profileImage}})`
                    }}
                    title="Profile Image"
                  ></div>
                </NavLink>
              )}
            </NavItem>
            <NavItem>
              <HiOutlineLogout
                className="text-2xl cursor-pointer"
                onClick={handleLogout}
              />
            </NavItem>
          </React.Fragment>
        )}
      </NavMenu>
    </Header>
  )
}

export default navigation
