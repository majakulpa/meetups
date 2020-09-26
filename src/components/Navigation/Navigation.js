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
    <nav className="flex border-solid border-b border-gray-200 px-5 py-4 justify-between items-center h-20">
      <div className="mr-6 text-purple-600 text-2xl">
        <NavLink to="/">
          <img
            src={process.env.PUBLIC_URL + '/assets/Meetups.png'}
            alt="meetups logo"
            width="120"
            height="auto"
          />
        </NavLink>
      </div>

      <div>
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
      </div>
    </nav>
  )
}

export default navigation
