import React, { useState, useEffect } from 'react'
import userService from './../../services/users'
import GoBack from './../../components/UI/GoBack'

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
      <React.Fragment>
        <p className="capitalize">{userData.name}</p>
        <p>{userData.description}</p>
        <a
          href={`mailto:${userData.email}`}
          target="_blank"
          className="cursor-pointer bg-green-400 hover:bg-green-500 text-white
          font-semibold py-2 px-4 rounded inline-flex items-center"
        >
          Send message
        </a>
      </React.Fragment>
    )
  }

  return (
    <div>
      {oneUser}
      <GoBack />
    </div>
  )
}

export default UserAccount
