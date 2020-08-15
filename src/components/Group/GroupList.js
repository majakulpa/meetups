import React from 'react'
import { Link } from 'react-router-dom'

const groupDetails = ({ groups }) => {
  return (
    <React.Fragment>
      {groups.map(group => (
        <Link key={group.id} to={`groups/${group.id}`}>
          <li className="flex items-center bg-gray-100 mb-10 shadow">
            <p>Title: {group.name}</p>
            <p>Creator: {group.creator.name}</p>
            <p>{group.members.length} members</p>
          </li>
        </Link>
      ))}
    </React.Fragment>
  )
}

export default groupDetails
