import React, { useState, useEffect, useContext, useRef } from 'react'
import { GlobalContext } from '../../context/Context'
import groupService from './../../services/groups'
import userService from './../../services/users'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import GoBack from './../UI/GoBack'
import Editable from './../UI/Editable'
import Footer from './../UI/Footer'
import UserList from '../UI/UserList'
import EventCards from '../UI/EventCards'
import GroupMainImg from './../UI/GroupMainImg'
import AvatarCard from './../UI/AvatarCard'
import CancelButton from './../UI/CancelButton'
import PlusButton from './../UI/PlusButton'
import { HiOutlineTrash } from 'react-icons/hi'

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

  let groupEvents = <EventCards events={oneGroup.events} />

  let groupMembers = <UserList usersArr={oneGroup.members} user={user} />

  if (!error && !user) {
    group = (
      <div className="rounded border-solid border border-gray-200 bg-white">
        <GroupMainImg image={oneGroup.mainImage} name={oneGroup.name} />
        <AvatarCard
          image={oneGroup.creator.profileImage}
          name={oneGroup.creator.name}
          text="Created by"
        />
        <p>{oneGroup.description}</p>
        <div className="mt-5">{groupEvents}</div>
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
        timer: 1000
      })
    }

    group = (
      <div className="rounded border-solid border border-gray-200 bg-white">
        <GroupMainImg image={oneGroup.mainImage} name={oneGroup.name} />
        <div className="p-5">
          <div className="flex justify-between mb-4">
            <AvatarCard
              image={oneGroup.creator.profileImage}
              name={oneGroup.creator.name}
              text="Created by"
            />
            {!oneGroup.members.map(member => member.id).includes(user.id) ? (
              <div>
                <PlusButton click={handleJoinGroup} text="Join Group" />
              </div>
            ) : (
              <div>
                {user.groups.map(group => (
                  <div key={group.id}>
                    {group.id === oneGroup.id && (
                      <CancelButton
                        id={group.id}
                        preLink="groups"
                        afterLink="unsubscribe"
                        text="Leave group"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <p>{oneGroup.description}</p>

          <div className="mt-5">{groupEvents}</div>
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
        timer: 1000
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
          <div className="mt-5">{groupEvents}</div>
          <div className="mt-6">{groupMembers}</div>
        </div>
      </div>
    )
  }

  return (
    <React.Fragment>
      <div className="w-full bg-gray-100 sp-screen">
        <GoBack />
        <div className="justify-center sm:p-1 md:p-2 lg:px-48 lg:pt-5 lg:pb-16 xl:px-64">
          {group}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default groupDetails
