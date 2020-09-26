import React, { useState, useEffect, useContext, useRef } from 'react'
import { GlobalContext } from './../../context/Context'
import userService from './../../services/users'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import GoBack from './../../components/UI/GoBack'
import Editable from './../../components/UI/Editable'
import { HiOutlineEye } from 'react-icons/hi'

const account = ({ match }) => {
  const inputRef = useRef()
  const { user, setUser } = useContext(GlobalContext)
  const [selectedGroups, setSelectedGroups] = useState([])
  const [error, setError] = useState('')
  let history = useHistory()

  const id = match.params.id
  useEffect(() => {
    userService
      .getOneUser(id)
      .then(data => {
        setUser(data)
      })
      .catch(error => {
        setError(error)
      })
  }, [])

  const todayDate = new Date()
    .toISOString()
    .split('')
    .slice(0, 16)
    .join('')

  let groups
  if (selectedGroups !== null && selectedGroups.length > 0) {
    groups = selectedGroups.map(group => {
      let properties = {
        _id: group.value
      }
      return properties
    })
  } else groups = []

  const onSubmit = async e => {
    e.preventDefault()

    await userService.updateUser(id, { ...user, groups })
    await setUser(user)

    history.goBack()
    Swal.fire({
      icon: 'success',
      title: 'Your data has been edited!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  const handleOnChange = (eventKey, value) =>
    setUser({ ...user, [eventKey]: value })

  let userDetails = <p>Loading...</p>

  if (error) {
    userDetails = (
      <p>
        Something went wrong: <span>{error}</span>
      </p>
    )
  }

  if (user) {
    let userEvents
    if (user.events) {
      userEvents = user.events.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      )
    }

    userDetails = (
      <div className="w-auto flex justify-center border-solid border border-gray-200 rounded bg-white text-gray-600">
        <div className="w-1/3 m-5">
          <div
            className="w-full h-40 bg-cover bg-center"
            style={{
              backgroundImage: `url(${user.profileImage}})`
            }}
            title="Profile Image"
          ></div>
          <div className="m-1 mt-5">
            <ul className="mt-4">
              {userEvents.length > 0 ? (
                <span className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                  Created Events:
                </span>
              ) : (
                ''
              )}
              {userEvents.map(event => (
                <Link key={event.id} to={`/events/${event.id}`}>
                  <li
                    className={`${
                      event.date <= todayDate ? 'text-gray-400' : ''
                    } border-solid border-b border-gray-300 hover:bg-gray-100 py-2 px-4 flex items-center justify-between`}
                  >
                    <div className="flex flex-col">
                      <span>{event.title}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(event.date).toDateString()}
                      </span>
                    </div>

                    <HiOutlineEye className="text-xl" />
                  </li>
                </Link>
              ))}
            </ul>
            <ul className="mt-4">
              {user.createdGroups.length > 0 ? (
                <span className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                  Created Groups:
                </span>
              ) : (
                ''
              )}
              {user.createdGroups.map(group => (
                <Link key={group.id} to={`/groups/${group.id}`}>
                  <li className="border-solid border-b border-gray-200 hover:bg-gray-100 py-2 px-4 flex items-center justify-between">
                    {group.name} <HiOutlineEye className="text-xl" />
                  </li>
                </Link>
              ))}
            </ul>
            <ul className="mt-4">
              {user.groups.length > 0 ? (
                <span className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                  Joined Groups:
                </span>
              ) : (
                ''
              )}
              {user.groups.map(group => (
                <Link key={group.id} to={`/groups/${group.id}`}>
                  <li className="border-solid border-b border-gray-300 hover:bg-gray-100 py-2 px-4 flex items-center justify-between">
                    {group.name} <HiOutlineEye className="text-xl" />
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>

        <form onSubmit={onSubmit} className="w-2/3 p-5">
          <div className="mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="username"
            >
              Username:
            </label>
            <Editable
              text={user.username}
              placeholder="Edit username"
              type="input"
              childRef={inputRef}
            >
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                leading-tight focus:text-gray-600 focus:shadow-outline"
                value={user.username}
                onChange={e => handleOnChange('username', e.target.value)}
                type="text"
                placeholder="Edit username"
                ref={inputRef}
              />
            </Editable>
          </div>
          <div className="mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="name"
            >
              Name:
            </label>
            <Editable
              text={user.name}
              placeholder="Edit name"
              type="input"
              childRef={inputRef}
            >
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                leading-tight focus:text-gray-600 focus:shadow-outline"
                value={user.name}
                onChange={e => handleOnChange('name', e.target.value)}
                type="text"
                placeholder="Edit name"
                ref={inputRef}
              />
            </Editable>
          </div>
          <div className="mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="email"
            >
              Email:
            </label>
            <Editable
              text={user.email}
              placeholder="Edit email"
              type="input"
              childRef={inputRef}
            >
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                leading-tight focus:text-gray-600 focus:shadow-outline"
                value={user.email}
                onChange={e => handleOnChange('email', e.target.value)}
                type="email"
                placeholder="Edit email"
                ref={inputRef}
              />
            </Editable>
          </div>
          <div className="mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="username"
            >
              About:
            </label>
            <Editable
              text={user.description}
              placeholder="Enter description"
              type="textarea"
              childRef={inputRef}
            >
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                leading-tight focus:text-gray-600 focus:shadow-outline"
                value={user.description}
                onChange={e => handleOnChange('description', e.target.value)}
                type="text"
                placeholder="Enter description"
                ref={inputRef}
                rows="10"
              />
            </Editable>
          </div>
          <div>
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="profileImage"
            >
              Profile Image:
            </label>
            <Editable placeholder="Image URL" type="input" childRef={inputRef}>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                leading-tight focus:text-gray-600 focus:shadow-outline"
                value={user.profileImage}
                onChange={e => handleOnChange('profileImage', e.target.value)}
                type="text"
                placeholder="Image URL"
                ref={inputRef}
              />
            </Editable>
          </div>
          <button
            className="block mt-6 bg-purple-600 float-right hover:bg-purple-800 text-white tracking-wide
            capitalize py-2 px-6 rounded focus:bg-purple-800 focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center w-full bg-gray-100">
      <GoBack />
      <div className="justify-center sm:p-1 md:p-2 lg:px-48 lg:py-5 xl:px-64">
        {userDetails}
      </div>
    </div>
  )
}

export default account
