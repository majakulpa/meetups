import React from 'react'
import { Link } from 'react-router-dom'

const groupDetails = ({ groups }) => {
  return (
    <React.Fragment>
      {groups.map(group => (
        <Link key={group.id} to={`groups/${group.id}`} className=" w-1/3">
          <div className="rounded overflow-hidden p-4">
            {!group.mainImage ? (
              <div className="bg-gray-400 h-48"></div>
            ) : (
              <div
                className="bg-cover h-48"
                style={{
                  backgroundImage: `url(${group.mainImage})`
                }}
              ></div>
            )}
            <div className="capitalize ont-bold text-xl mb-2">
              Title: {group.name}
            </div>
            <p className="text-gray-700 text-base">
              Creator: {group.creator.name}
            </p>
            <p className="text-gray-700 text-base">
              {group.members.length} members
            </p>
          </div>
        </Link>
      ))}
    </React.Fragment>
  )
}

export default groupDetails
