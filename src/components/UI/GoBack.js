import React from 'react'
import { useHistory } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi'

const goBack = () => {
  let history = useHistory()

  return (
    <div className="flex justify-center mt-4 text-gray-500">
      <button onClick={() => history.goBack()} className="flex">
        <HiArrowLeft className="mt-1 mr-1" /> <span>Go back</span>
      </button>
    </div>
  )
}

export default goBack
