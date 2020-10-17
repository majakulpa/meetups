import React from 'react'
import { Link } from 'react-router-dom'

const groupDetails = ({ groups }) => {
  return (
    <React.Fragment>
      {groups.map(group => (
        <Link
          key={group.id}
          to={`/meetups/groups/${group.id}`}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4"
        >
          <div
            className="rounded border-solid border border-gray-300 
          bg-white overflow-hidden m-2 hover:shadow"
          >
            {!group.mainImage ? (
              <div className="bg-gray-400 h-24 md:h-32 lg:h-48"></div>
            ) : (
              <div
                className="bg-cover bg-center h-24 md:h-32 lg:h-48"
                style={{
                  backgroundImage: `url(${group.mainImage})`
                }}
              ></div>
            )}
            <div className="p-3">
              <h3 className="capitalize text-l font-medium">{group.name}</h3>
              <p className="text-gray-600 text-sm">
                Created by {group.creator.name}
              </p>
              <p className="text-gray-600 text-xs">
                {group.members.length} members
              </p>
            </div>
          </div>
        </Link>
      ))}
    </React.Fragment>
  )
}

export default groupDetails
