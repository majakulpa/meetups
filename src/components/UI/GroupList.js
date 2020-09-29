import React from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineEye } from 'react-icons/hi'

const groupItem = ({ groups, text }) => {
  return (
    <ul className="mt-4">
      {groups && groups.length > 0 ? (
        <span className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
          {text}
        </span>
      ) : (
        ''
      )}
      {groups
        ? groups.map(group => (
            <Link key={group.id} to={`/groups/${group.id}`}>
              <li className="border-solid border-b border-gray-300 hover:bg-gray-100 py-2 px-4 flex items-center justify-between">
                {group.name} <HiOutlineEye className="text-xl" />
              </li>
            </Link>
          ))
        : ''}
    </ul>
  )
}

export default groupItem
