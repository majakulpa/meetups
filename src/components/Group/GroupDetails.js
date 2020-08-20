import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../../context/Context'
import groupService from './../../services/groups'
import userService from './../../services/users'
import { useHistory, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import GoBack from './../UI/GoBack'

const groupDetails = ({ match }) => {
  const { user, setUser } = useContext(GlobalContext)
  const [oneGroup, setOneGroup] = useState({
    id: null,
    name: '',
    description: '',
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

  let groupData = (
    <div>
      {oneGroup.events.length > 0 && (
        <ul>
          Events:
          {oneGroup.events.map(event => (
            <Link key={event.id} to={`/events/${event.id}`}>
              <li>{event.title}</li>
            </Link>
          ))}
        </ul>
      )}
      {oneGroup.members.length > 0 && (
        <ul>
          Members:
          {oneGroup.members.map(member => (
            <Link
              key={member.id}
              to={
                user && user.id === member.id
                  ? `/my-account/${member.id}`
                  : `/users/${member.id}`
              }
            >
              <li>{member.name}</li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  )

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
      <div>
        <h2>{oneGroup.name} details</h2>
        <p>Info: {oneGroup.description}</p>
        <p>
          Organizer:
          {oneGroup.creator.name}
        </p>
        {groupData}
        {!oneGroup.members.map(member => member.id).includes(user.id) ? (
          <button
            className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
            onClick={handleJoinGroup}
          >
            <span className="pl-2">Join Group</span>
          </button>
        ) : (
          <div>
            {user.groups.map(group => (
              <div key={group.id}>
                {group.id === oneGroup.id && (
                  <Link to={`/groups/${group.id}/unsubscribe`}>
                    <button className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
                      <span className="pl-2">Leave group</span>
                    </button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
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
      <div>
        {groupData}
        <div className="w-full max-w-sm container mt-20 mx-auto">
          <form onSubmit={onSubmit}>
            <div className="w-full mb-5">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="title"
              >
                Group name:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
                value={oneGroup.name}
                onChange={e => handleOnChange('title', e.target.value)}
                type="text"
                placeholder="Enter name"
              />
            </div>
            <div className="w-full mb-5">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="description"
              >
                Group description:
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
                value={oneGroup.description}
                onChange={e => handleOnChange('description', e.target.value)}
                type="text"
                placeholder="Enter description"
              />
            </div>
            <div className="flex items-center justify-between">
              <button className="block mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:text-gray-600 focus:shadow-outline">
                Edit Group
              </button>
            </div>
          </form>
          <div className="flex items-center justify-between">
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
              className="block mt-5 bg-red-400 w-full hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:text-gray-600 focus:shadow-outline"
            >
              Delete Group
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {group}
      <GoBack />
    </div>
  )
}

export default groupDetails
