import React, { useState, useEffect, useContext, Suspense } from 'react'
import { GlobalContext } from '../../context/Context'
import groupService from './../../services/groups'
import userService from './../../services/users'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import EditGroup from './EditGroup'
import EventCards from '../Event/EventCards'
import GroupMainImg from './GroupMainImg'
import AvatarCard from './../UI/AvatarCard'
import CancelButton from './../UI/CancelButton'
import PlusButton from './../UI/PlusButton'
import Layout from './../UI/Layout'
const UserList = React.lazy(() => import('../UI/UserList'))

const groupDetails = ({ match }) => {
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

  const routeChange = () => {
    let path = '/login'
    history.push(path)
  }

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

  let group = <div className="loader"></div>
  if (error) {
    group = (
      <p>
        Something went wrong: <span>{error}</span>
      </p>
    )
  }

  let groupEvents = <EventCards events={oneGroup.events} />

  let groupMembers = (
    <Suspense fallback={<div className="loader"></div>}>
      <UserList usersArr={oneGroup.members} user={user} text="Members" />
    </Suspense>
  )

  if (!error && !user) {
    group = (
      <div className="rounded border-solid border border-gray-200 bg-white p-2 sm:p-3 md:p-5">
        <GroupMainImg image={oneGroup.mainImage} name={oneGroup.name} />
        <div className="pt-5">
          <div className="flex justify-between mb-4">
            <AvatarCard
              image={oneGroup.creator.profileImage}
              name={oneGroup.creator.name}
              text="Created by"
            />
            <div>
              <PlusButton click={routeChange} text="Login to join" />
            </div>
          </div>
          <p>{oneGroup.description}</p>
          <div className="mt-5">{groupEvents}</div>
        </div>
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
      <div className="rounded border-solid border border-gray-200 bg-white p-2 sm:p-3 md:p-5">
        <GroupMainImg image={oneGroup.mainImage} name={oneGroup.name} />
        <div className="pt-5">
          <div className="flex justify-between mb-4">
            <AvatarCard
              image={oneGroup.creator.profileImage}
              name={oneGroup.creator.name}
              text="Created by"
            />
            {!oneGroup.members.map(member => member.id).includes(user.id) ? (
              <div>
                <PlusButton
                  click={handleJoinGroup}
                  text="Join Group"
                  plus={true}
                />
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
      <div className="rounded border-solid border border-gray-200 bg-white p-2 sm:p-3 md:p-5 pb-10">
        <EditGroup
          handleOnChange={handleOnChange}
          handleDeleteGroup={handleDeleteGroup}
          onSubmit={onSubmit}
          oneGroup={oneGroup}
        />
        <div className="pt-5 flex flex-col w-full">
          <div className="mt-5">{groupEvents}</div>
          <div className="mt-6">{groupMembers}</div>
        </div>
      </div>
    )
  }

  return <Layout content={group} />
}

export default groupDetails
