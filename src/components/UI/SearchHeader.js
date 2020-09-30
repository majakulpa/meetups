import React from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'
import PlusButton from './PlusButton'

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
            <PlusButton text={create} plus={true} />
          </Link>
        </div>
      )}
    </div>
  )
}

export default searchHeader
