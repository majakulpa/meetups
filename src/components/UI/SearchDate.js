import React from 'react'
import { HiX } from 'react-icons/hi'

const SearchDate = ({ date, searchDateHandleChange, handleClearSearch }) => {
  return (
    <React.Fragment>
      <div className="relative">
        <input
          className="transition-colors duration-100 ease-in-out text-gray-600 py-2 
        pr-10 pl-4 block w-full appearance-none leading-normal border border-transparent 
        rounded focus:outline-none text-left select-none truncate focus:bg-white
        focus:border-gray-300 bg-gray-200"
          value={date}
          onChange={searchDateHandleChange}
          type="date"
          min={new Date()
            .toISOString()
            .split('')
            .slice(0, 10)
            .join('')}
        />
        <div
          className="cursor-pointer absolute inset-y-0 right-0 pr-4 flex items-center"
          onClick={handleClearSearch}
        >
          <HiX />
        </div>
      </div>
    </React.Fragment>
  )
}

export default SearchDate
