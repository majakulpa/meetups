import React from 'react'
import { HiPlus } from 'react-icons/hi'

const plusButton = ({ click, text, plus }) => {
  return (
    <button
      className="block bg-purple-600 float-right hover:bg-purple-800 text-white tracking-wide flex
        capitalize py-2 px-4 rounded focus:bg-purple-800 focus:outline-none focus:shadow-outline"
      onClick={click}
    >
      {plus ? <HiPlus className="mt-1 mr-1 font-bold" /> : ''}

      <span>{text}</span>
    </button>
  )
}

export default plusButton
