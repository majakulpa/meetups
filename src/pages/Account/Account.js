import React, { useState, useEffect } from 'react'
import userService from './../../services/users'
import { Link, useHistory } from 'react-router-dom'

const account = ({ match }) => {
  const [userData, setUserData] = useState(null)
  let history = useHistory()

  const id = match.params.id
  useEffect(() => {
    userService
      .getOneUser(id)
      .then(data => {
        setUserData(data)
      })
      .catch(error => console.log(error))
  }, [])

  let user = <p>Loading...</p>

  if (userData) {
    let userEvents = userData.events
    user = (
      <div>
        <p>Name: {userData.name}</p>
        <p>Username: {userData.username}</p>
        <p>Email: {userData.email}</p>
        <ul>
          My Events:
          {userEvents.map(event => (
            <Link key={event.id} to={`/events/${event.id}`}>
              <li
                className={`${
                  new Date(event.date).toDateString() <=
                  new Date().toDateString()
                    ? 'text-gray-400'
                    : ''
                }`}
              >
                {event.title} - {new Date(event.date).toDateString()}
              </li>
            </Link>
          ))}
        </ul>
        <div className="text-center mt-4 text-gray-500">
          <button onClick={() => history.goBack()}>Go back</button>
        </div>
      </div>
    )
  }

  return <div>{user}</div>
}

export default account
