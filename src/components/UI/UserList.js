import React from 'react'
import { Link } from 'react-router-dom'

const userList = ({ usersArr, user, text }) => {
  return (
    <React.Fragment>
      {usersArr.length > 0 && (
        <React.Fragment>
          <span className="font-bold text-lg">
            {text} ({usersArr.length})
          </span>
          <div className="flex flex-wrap justify-center lg:justify-start">
            {usersArr.map(attendee => (
              <Link
                className="flex flex-col items-center w-32 md:w-48 bg-gray-100 rounded 
                p-2 md:p-3 m-1 md:m-3 hover:bg-gray-200 hover:shadow"
                key={attendee.id}
                to={
                  user && user.id === attendee.id
                    ? `/my-account/${attendee.id}`
                    : `/users/${attendee.id}`
                }
              >
                <div
                  className="h-16 w-16 bg-cover rounded-full bg-center"
                  style={{
                    backgroundImage: `url(${attendee.profileImage}})`
                  }}
                  title="Profile Image"
                ></div>
                <div className="text-sm font-medium m-3">{attendee.name}</div>
              </Link>
            ))}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default userList
