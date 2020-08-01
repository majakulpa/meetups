import React from 'react'

const Search = ({
  value,
  date,
  searchHandleChange,
  searchDateHandleChange
}) => {
  return (
    <React.Fragment>
      <input
        className="shadow appearance-none border border-gray-500 rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        value={value}
        onChange={searchHandleChange}
        placeholder="Search by event name or location"
      />
      <input
        className="shadow appearance-none border border-gray-500 rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        value={date}
        onChange={searchDateHandleChange}
        type="date"
        min={new Date()
          .toISOString()
          .split('')
          .slice(0, 10)
          .join('')}
      />
    </React.Fragment>
  )
}

export default Search
