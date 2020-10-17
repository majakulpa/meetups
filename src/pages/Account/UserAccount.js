import React, { useState, useEffect, Suspense } from 'react'
import userService from './../../services/users'
import Layout from './../../components/UI/Layout'
import Avatar from './../../components/UI/Avatar'
import { HiOutlineMail } from 'react-icons/hi'
const GroupList = React.lazy(() => import('../../components/UI/GroupList'))

const UserAccount = ({ match }) => {
  const [userData, setUserData] = useState('')
  const [error, setError] = useState('')

  const id = match.params.id
  useEffect(() => {
    userService
      .getOneUser(id)
      .then(data => {
        setUserData(data)
      })
      .catch(error => {
        setError(error)
      })
  }, [])

  let oneUser = <div className="loader"></div>
  if (error) {
    oneUser = (
      <p>
        Something went wrong: <span>{error}</span>
      </p>
    )
  }

  if (!error) {
    oneUser = (
      <div
        className="rounded border-solid border 
      border-gray-200 bg-white overflow-hidden p-2 sm:p-3 md:p-5"
      >
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center">
            <Avatar image={userData.profileImage} />
            <p className="font-bold ml-3 text-sm sm:text-base text-wrap">
              {userData.name}
            </p>
          </div>
          <a
            href={`mailto:${userData.email}`}
            target="_blank"
            className="block bg-purple-600 float-right hover:bg-purple-800 text-white tracking-wide flex items-center
          capitalize py-2 px-4 rounded-full sm:rounded focus:bg-purple-800 focus:outline-none focus:shadow-outline"
          >
            <HiOutlineMail className="sm:mr-2 font-bold" />
            <span className="hidden sm:block">Send email</span>
          </a>
        </div>
        <p>{userData.description}</p>
        <GroupList groups={userData.createdGroups} text="Created groups:" />
        <GroupList groups={userData.groups} text="Member in:" />
      </div>
    )
  }

  return (
    <Suspense fallback={<div className="loader"></div>}>
      <Layout content={oneUser} />
    </Suspense>
  )
}

export default UserAccount
