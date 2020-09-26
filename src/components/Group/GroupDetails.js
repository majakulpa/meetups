import React, { useState, useEffect, useContext, useRef } from 'react'
import { GlobalContext } from '../../context/Context'
import groupService from './../../services/groups'
import userService from './../../services/users'
import { useHistory, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import GoBack from './../UI/GoBack'
import Editable from './../UI/Editable'
import { HiPlus, HiOutlineTrash } from 'react-icons/hi'

const groupDetails = ({ match }) => {
  const inputRef = useRef()
  const { user, setUser } = useContext(GlobalContext)
  const [oneGroup, setOneGroup] = useState({
    id: null,
    name: '',
    description: '',
    mainImage: '',
    members: [],
    events: [],
    creator: {}
  })
  const [error, setError] = useState('')
  let history = useHistory()

  const id = match.params.id

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')

    if (loggedUser) {
      const loggedUserJSON = JSON.parse(loggedUser)
      const loggedUserId = loggedUserJSON.userId
      userService.getOneUser(loggedUserId).then(data => {
        setUser(data)
      })
    }
  }, [])

  useEffect(() => {
    let isActive = true
    groupService
      .getOneGroup(id)
      .then(data => {
        if (isActive) {
          setOneGroup(data)
        }
      })
      .catch(error => {
        setError(error)
      })
    return () => {
      isActive = false
    }
  }, [])

  let group = <p>Loading...</p>
  if (error) {
    group = (
      <p>
        Something went wrong: <span>{error}</span>
      </p>
    )
  }

  let groupEvents = (
    <React.Fragment>
      {oneGroup.events.length > 0 && (
        <ul className="mt-6 font-normal">
          <span className="font-bold text-lg">
            Upcoming events ({oneGroup.events.length})
          </span>
          {oneGroup.events.map(event => (
            <Link key={event.id} to={`/events/${event.id}`}>
              <li
                className="rounded bg-gray-100 hover:bg-gray-200 hover:shadow overflow-hidden my-2 p-3
            flex justify-between"
              >
                <div>
                  <h3 className="capitalize ont-bold text-l font-medium">
                    {event.title}
                  </h3>
                  <p className="text-sm">
                    Price: {event.price === 0 ? 'Free' : '$' + event.price}
                  </p>
                  <p className="text-xs">Going: {event.attendees.length}</p>
                </div>
                <div className="text-sm text-right">
                  <p>
                    {new Date(event.date).toDateString()},{' '}
                    {new Date(event.date).toLocaleTimeString('en-US')}
                  </p>
                  <p className="capitalize">{event.place}</p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </React.Fragment>
  )

  let groupMembers = (
    <React.Fragment>
      {oneGroup.members.length > 0 && (
        <React.Fragment>
          <span className="font-bold text-lg">
            Members ({oneGroup.members.length})
          </span>
          <div className="flex flex-wrap justify-center lg:justify-start">
            {oneGroup.members.map(member => (
              <Link
                className="flex flex-col items-center w-48 bg-gray-100 rounded p-3 m-3 hover:bg-gray-200 hover:shadow"
                key={member.id}
                to={
                  user && user.id === member.id
                    ? `/my-account/${member.id}`
                    : `/users/${member.id}`
                }
              >
                <div
                  className="h-16 w-16 bg-cover rounded-full bg-center"
                  style={{
                    backgroundImage: `url(${member.profileImage}})`
                  }}
                  title="Profile Image"
                ></div>
                <div className="text-sm font-medium m-3">{member.name}</div>
              </Link>
            ))}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  )

  if (!error && !user) {
    group = (
      <div className="rounded border-solid border border-gray-200 bg-white">
        <h2>{oneGroup.name} details</h2>
        {!oneGroup.mainImage ? (
          <div></div>
        ) : (
          <img
            alt="Group main image"
            src={oneGroup.mainImage}
            width="200px"
            height="auto"
          />
        )}
        <p>Info: {oneGroup.description}</p>
        <p>
          Organizer:
          {oneGroup.creator.name}
        </p>
        {groupEvents}
      </div>
    )
  }

  if (!error && oneGroup && user && user.name !== oneGroup.creator.name) {
    const loggedUser = window.localStorage.getItem('loggedUser')
    const loggedUserJSON = JSON.parse(loggedUser)
    const loggedUserToken = loggedUserJSON.userToken

    const handleJoinGroup = async e => {
      e.preventDefault()
      await groupService.setToken(loggedUserToken)
      groupService.joinGroup(id)
      Swal.fire({
        icon: 'success',
        title: `You joined ${oneGroup.name}!`,
        showConfirmButton: false,
        timer: 1500
      })
    }

    group = (
      <div className="rounded border-solid border border-gray-200 bg-white">
        {!oneGroup.mainImage ? (
          <div className="w-full h-40 bg-gray-800">
            <h3 className="capitalize text-white text-5xl font-medium p-3">
              {oneGroup.name}
            </h3>
          </div>
        ) : (
          <div
            className="w-full h-40 bg-cover bg-center flex flex-col justify-end"
            style={{
              backgroundImage: `linear-gradient(
                to bottom,
                rgba(0,0,0, 0),
                rgba(0,0,0, 100)
              ), url(${oneGroup.mainImage}})`
            }}
            title="Group main image"
          >
            <h3 className="capitalize text-white text-5xl font-medium p-3">
              {oneGroup.name}
            </h3>
          </div>
        )}
        <div className="p-5">
          <div className="flex justify-between mb-4">
            <div className="flex">
              <div
                className="h-12 w-12 bg-cover rounded-full bg-center"
                style={{
                  backgroundImage: `url(${oneGroup.creator.profileImage}})`
                }}
                title="Profile Image"
              ></div>
              <div className="ml-3">
                <p className="text-sm">Created by</p>
                <p className="font-bold">{oneGroup.creator.name}</p>
              </div>
            </div>
            {!oneGroup.members.map(member => member.id).includes(user.id) ? (
              <div>
                <button
                  className="block bg-purple-600 float-right hover:bg-purple-800 text-white tracking-wide flex
              capitalize py-2 px-4 rounded focus:bg-purple-800 focus:outline-none focus:shadow-outline"
                  onClick={handleJoinGroup}
                >
                  <HiPlus className="mt-1 mr-1 font-bold" />
                  <span>Join Group</span>
                </button>
              </div>
            ) : (
              <div>
                {user.groups.map(group => (
                  <div key={group.id}>
                    {group.id === oneGroup.id && (
                      <Link to={`/groups/${group.id}/unsubscribe`}>
                        <button
                          className="block bg-gray-500 float-right hover:bg-gray-600 text-white tracking-wide flex
                    capitalize py-2 px-4 rounded focus:bg-gray-800 focus:outline-none focus:shadow-outline"
                        >
                          <HiOutlineTrash className="mt-1 mr-1 font-bold" />
                          <span>Leave group</span>
                        </button>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <p>{oneGroup.description}</p>

          {groupEvents}
          <div className="mt-6">{groupMembers}</div>
        </div>
      </div>
    )
  }

  if (!error && oneGroup && user && user.name === oneGroup.creator.name) {
    const loggedUser = window.localStorage.getItem('loggedUser')
    const loggedUserJSON = JSON.parse(loggedUser)
    const loggedUserToken = loggedUserJSON.userToken

    const onSubmit = async e => {
      e.preventDefault()
      await groupService.setToken(loggedUserToken)
      groupService.updateGroup(id, oneGroup)
      history.goBack()
      Swal.fire({
        icon: 'success',
        title: `${oneGroup.name} has been updated!`,
        showConfirmButton: false,
        timer: 1500
      })
    }

    const handleOnChange = (eventKey, value) =>
      setOneGroup({ ...oneGroup, [eventKey]: value })

    const handleDeleteGroup = async e => {
      await groupService.setToken(loggedUserToken)
      groupService.deleteGroup(id)
      history.goBack()
    }

    group = (
      <div className="rounded border-solid border border-gray-200 bg-white">
        <form onSubmit={onSubmit}>
          {!oneGroup.mainImage ? (
            <div className="w-full h-40 bg-gray-800">
              <Editable
                text={oneGroup.name}
                placeholder="Edit group name"
                type="input"
                childRef={inputRef}
                className="capitalize text-white text-5xl font-medium p-3"
              >
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                leading-tight focus:text-gray-600 focus:shadow-outline"
                  value={oneGroup.name}
                  onChange={e => handleOnChange('name', e.target.value)}
                  type="text"
                  placeholder="Enter name"
                  ref={inputRef}
                />
              </Editable>
            </div>
          ) : (
            <div
              className="w-full h-40 bg-cover bg-center flex flex-col justify-end"
              style={{
                backgroundImage: `linear-gradient(
                to bottom,
                rgba(0,0,0, 0),
                rgba(0,0,0, 100)
              ), url(${oneGroup.mainImage}})`
              }}
              title="Group main image"
            >
              <Editable
                text={oneGroup.name}
                placeholder="Edit group name"
                type="input"
                childRef={inputRef}
                className="capitalize text-white text-5xl font-medium p-3"
              >
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                leading-tight focus:text-gray-600 focus:shadow-outline"
                  value={oneGroup.name}
                  onChange={e => handleOnChange('name', e.target.value)}
                  type="text"
                  placeholder="Enter name"
                  ref={inputRef}
                />
              </Editable>
            </div>
          )}

          <div className="mb-4 p-5">
            <Editable
              text={oneGroup.description}
              placeholder="Edit group description"
              type="textarea"
              childRef={inputRef}
            >
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                leading-tight focus:text-gray-600 focus:shadow-outline"
                value={oneGroup.description}
                onChange={e => handleOnChange('description', e.target.value)}
                type="text"
                placeholder="Enter description"
                rows="10"
                ref={inputRef}
              />
            </Editable>
            <Editable
              text="Edit profile image URL"
              placeholder="Edit profile image URL"
              type="mainImage"
              childRef={inputRef}
              className="font-medium mt-5"
            >
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                leading-tight focus:text-gray-600 focus:shadow-outline"
                value={oneGroup.mainImage}
                onChange={e => handleOnChange('mainImage', e.target.value)}
                type="text"
                placeholder="Enter profile image URL"
                ref={inputRef}
              />
            </Editable>
            <div className="mt-5 flex justify-between">
              <button
                onClick={e =>
                  Swal.fire({
                    title: 'Are you sure?',
                    text: 'This event will be deleted permanently.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!',
                    reverseButtons: true
                  }).then(result => {
                    if (result.value) {
                      e.persist()
                      handleDeleteGroup(e)
                      Swal.fire(
                        'Deleted!',
                        'Your group has been deleted.',
                        'success'
                      )
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire('Cancelled', 'Your group is safe :)', 'error')
                    }
                  })
                }
                className="block bg-gray-500 float-right hover:bg-gray-600 text-white tracking-wide flex
                capitalize py-2 px-4 rounded focus:bg-purple-800 focus:outline-none focus:shadow-outlines"
              >
                <HiOutlineTrash className="mt-1 mr-1 font-bold" />
                <span>Delete Group</span>
              </button>
              <button
                className="block bg-purple-600 float-right hover:bg-purple-800 text-white tracking-wide
       capitalize py-2 px-6 rounded focus:bg-purple-800 focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
            </div>
          </div>
        </form>
        <div className="px-5 pb-5">
          {groupEvents}
          <div className="mt-6">{groupMembers}</div>
        </div>
      </div>
    )
  }

  return (
    <div className=" w-full bg-gray-100 min-h-screen">
      <GoBack />
      <div className="justify-center sm:p-1 md:p-2 lg:px-48 lg:py-5 xl:px-64">
        {group}
      </div>
    </div>
  )
}

export default groupDetails
