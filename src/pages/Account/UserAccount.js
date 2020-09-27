import React, { useState, useEffect } from 'react'
import userService from './../../services/users'
import GoBack from './../../components/UI/GoBack'
import Footer from './../../components/UI/Footer'
import { Link, useHistory } from 'react-router-dom'
import { HiOutlineMail, HiOutlineEye } from 'react-icons/hi'

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

  let oneUser = <p>Loading...</p>
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
      border-gray-200 bg-white overflow-hidden p-5 pb-10"
      >
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center">
            <div
              className="h-12 w-12 bg-cover rounded-full bg-center"
              style={{
                backgroundImage: `url(${userData.profileImage}})`
              }}
              title="Profile Image"
            ></div>
            <p className="font-bold ml-3">{userData.name}</p>
          </div>
          <a
            href={`mailto:${userData.email}`}
            target="_blank"
            className="block bg-purple-600 float-right hover:bg-purple-800 text-white tracking-wide flex items-center
          capitalize py-2 px-4 rounded focus:bg-purple-800 focus:outline-none focus:shadow-outlines"
          >
            <HiOutlineMail className="mr-2 font-bold" />
            <span>Send email</span>
          </a>
        </div>
        <p>{userData.description}</p>
        <ul className="mt-4">
          {userData.createdGroups && userData.createdGroups.length > 0 ? (
            <span className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
              Created Groups:
            </span>
          ) : (
            ''
          )}
          {userData.createdGroups
            ? userData.createdGroups.map(group => (
                <Link key={group.id} to={`/groups/${group.id}`}>
                  <li className="border-solid border-b border-gray-200 hover:bg-gray-100 py-2 px-4 flex items-center justify-between">
                    {group.name} <HiOutlineEye className="text-xl" />
                  </li>
                </Link>
              ))
            : ''}
        </ul>
        <ul className="mt-4">
          {userData.groups && userData.groups.length > 0 ? (
            <span className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
              Member in:
            </span>
          ) : (
            ''
          )}
          {userData.groups
            ? userData.groups.map(group => (
                <Link key={group.id} to={`/groups/${group.id}`}>
                  <li className="border-solid border-b border-gray-300 hover:bg-gray-100 py-2 px-4 flex items-center justify-between">
                    {group.name} <HiOutlineEye className="text-xl" />
                  </li>
                </Link>
              ))
            : ''}
        </ul>
      </div>
    )
  }

  return (
    <React.Fragment>
      <div
        className="justify-center w-full bg-gray-100
       border-t border-gray-200 sp-screen"
      >
        <GoBack />
        <div className="justify-center sm:p-1 md:p-2 lg:px-48 lg:pt-5 lg:pb-16 xl:px-64">
          {oneUser}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default UserAccount
