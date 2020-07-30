import React from 'react'

const Search = ({ value, searchHandleChange }) => {
  return (
    <React.Fragment>
      <input
        className="shadow appearance-none border border-gray-500 rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        value={value}
        onChange={searchHandleChange}
        placeholder="Search by event name or location"
      />
    </React.Fragment>
  )
}

export default Search
