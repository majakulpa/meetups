import React from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineTrash } from 'react-icons/hi'

const cancelButton = ({ preLink, afterLink, text, id }) => {
  return (
    <Link to={`/${preLink}/${id}/${afterLink}`}>
      <button
        className="block bg-gray-500 float-right hover:bg-gray-600 text-white tracking-wide flex
        capitalize py-2 px-4 rounded focus:bg-gray-800 focus:outline-none focus:shadow-outline"
      >
        <HiOutlineTrash className="mt-1 mr-1 font-bold" />
        <span>{text}</span>
      </button>
    </Link>
  )
}

export default cancelButton
