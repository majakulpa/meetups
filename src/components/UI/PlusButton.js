import React from 'react'
import { HiPlus } from 'react-icons/hi'

const plusButton = ({ click, text, plus }) => {
  return (
    <button
      className="block bg-purple-600 float-right hover:bg-purple-800 text-white tracking-wide flex
        capitalize py-2 px-4 rounded focus:bg-purple-800 focus:outline-none focus:shadow-outline"
      onClick={click}
      id="plusButton"
    >
      {plus ? <HiPlus className="hidden sm:block mt-1 mr-1 font-bold" /> : ''}

      <span className="text-xs sm:text-base">{text}</span>
    </button>
  )
}

export default plusButton
