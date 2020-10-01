import React from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'
import { HiPlus } from 'react-icons/hi'

const searchHeader = ({
  value,
  searchHandleChange,
  placeholder,
  handleClearSearch,
  user,
  link,
  create
}) => {
  return (
    <div className="flex justify-between p-2 lg:px-48 lg:py-5 xl:px-64">
      <Search
        value={value}
        searchHandleChange={searchHandleChange}
        placeholder={placeholder}
        handleClearSearch={handleClearSearch}
      />
      {user && (
        <div className="create-event">
          <Link to={link}>
            <button
              className="block bg-purple-600 float-right hover:bg-purple-800 text-white tracking-wide flex
        capitalize py-2 px-4 rounded focus:bg-purple-800 focus:outline-none focus:shadow-outline"
            >
              <HiPlus className="mt-1 mr-1 font-bold" />

              <span className="sm:text-base">{create}</span>
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default searchHeader
