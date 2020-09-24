import React from 'react'
import { useHistory } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi'

const goBack = () => {
  let history = useHistory()

  return (
    <div className="text-gray-600 pt-3 pl-3">
      <button
        onClick={() => history.goBack()}
        className="flex hover:text-gray-800 hover:underline focus:outline-none"
      >
        <HiArrowLeft className="mt-1 mr-1" /> <span>Go back</span>
      </button>
    </div>
  )
}

export default goBack
