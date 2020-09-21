import React, { useContext } from 'react'
import { GlobalContext } from '../../context/Context'
import { NavLink, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { HiOutlineLogout, HiOutlineUserCircle } from 'react-icons/hi'

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
    <header className="flex border-solid border-b border-gray-400 px-5 py-2 justify-between items-center h-16">
      <div className="mr-6">
        <NavLink to="/">Meetups</NavLink>
      </div>
      <nav>
        <ul className="flex items-center">
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
                <NavLink to="/bookings">My bookings</NavLink>
              </li>
              <li className="mr-6">
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
              </li>
              <li>
                <HiOutlineLogout
                  className="text-2xl cursor-pointer"
                  onClick={handleLogout}
                />
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default navigation
