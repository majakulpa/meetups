import React, { useState, useEffect, useContext, useRef } from 'react'
import { GlobalContext } from './../../context/Context'
import userService from './../../services/users'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import EditInput from './../../components/UI/EditInput'
import EditTextarea from './../../components/UI/EditTextarea'
import GroupList from '../../components/UI/GroupList'
import EventList from '../../components/UI/EventList'
import PlusButton from '../../components/UI/PlusButton'
import Layout from '../../components/UI/Layout'

const account = ({ match }) => {
  const inputRef = useRef()
  const { user, setUser } = useContext(GlobalContext)
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

  const onSubmit = async e => {
    e.preventDefault()

    await userService.updateUser(id, { ...user })
    await setUser(user)

    history.goBack()
    Swal.fire({
      icon: 'success',
      title: 'Your data has been edited!',
      showConfirmButton: false,
      timer: 1000
    })
  }

  const handleOnChange = (eventKey, value) =>
    setUser({ ...user, [eventKey]: value })

  let userDetails = <div class="loader"></div>

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
      <div
        className="w-auto flex justify-center border-solid p-2 sm:p-3 md:p-5
       border border-gray-200 rounded bg-white text-gray-600 flex-col sm:flex-row"
      >
        <div className="w-full md:w-1/3 pr-5">
          <div
            className="w-full h-40 bg-cover bg-center"
            style={{
              backgroundImage: `url(${user.profileImage}})`
            }}
            title="Profile Image"
          ></div>
          <div className="m-1 mt-5">
            <EventList events={userEvents} />
            <GroupList groups={user.createdGroups} text="Created groups:" />
            <GroupList groups={user.groups} text="Member in:" />
          </div>
        </div>

        <form onSubmit={onSubmit} className="w-full mt-5 sm:mt-0 md:w-2/3">
          <div className="mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="username"
            >
              Username:
            </label>
            <EditInput
              editText={user.username}
              value={user.username}
              inputRef={inputRef}
              placeholder="Username"
              inputType="text"
              handleOnChange={e => handleOnChange('username', e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="name"
            >
              Name:
            </label>
            <EditInput
              editText={user.name}
              value={user.name}
              inputRef={inputRef}
              placeholder="Name"
              inputType="text"
              handleOnChange={e => handleOnChange('name', e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="email"
            >
              Email:
            </label>
            <EditInput
              editText={user.email}
              value={user.email}
              inputRef={inputRef}
              placeholder="Email address"
              inputType="email"
              handleOnChange={e => handleOnChange('email', e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="username"
            >
              About:
            </label>
            <EditTextarea
              value={user.description}
              inputRef={inputRef}
              placeholder="About"
              handleOnChange={e =>
                handleOnChange('description', e.target.value)
              }
              rows="10"
            />
          </div>
          <div className="mb-4">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="profileImage"
            >
              Profile Image:
            </label>
            <EditInput
              editText="Image URL"
              value={user.profileImage}
              inputRef={inputRef}
              placeholder="Profile image URL"
              inputType="text"
              handleOnChange={e =>
                handleOnChange('profileImage', e.target.value)
              }
            />
          </div>
          <PlusButton text="Save" />
        </form>
      </div>
    )
  }

  return <Layout content={userDetails} />
}

export default account
