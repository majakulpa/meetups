import React from 'react'

const Search = ({ value, searchHandleChange, placeholder }) => {
  return (
    <React.Fragment>
      <input
        className="shadow appearance-none border border-gray-500 rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        value={value}
        onChange={searchHandleChange}
        placeholder={placeholder}
      />
    </React.Fragment>
  )
}

export default Search
