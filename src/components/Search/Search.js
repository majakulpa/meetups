import React from 'react'

const Search = ({ value, searchHandleChange }) => {
  return (
    <div className="w-full max-w-xs">
      Search:
      <input
        className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        value={value}
        onChange={searchHandleChange}
      />
    </div>
  )
}

export default Search
