import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi'

const leave = ({
  question,
  textOne,
  textTwo,
  textThree,
  click,
  handleDelete,
  confirm
}) => {
  return (
    <div className="rounded border-solid border border-gray-200 bg-white px-5 py-8">
      <div className="text-center">
        <p className="text-lg">{question}</p>
        <span className="font-medium">
          '{textOne} {textTwo} {textThree}'
        </span>
      </div>
      <div className="flex justify-end mt-5">
        <button
          className="block bg-purple-600 float-right hover:bg-purple-800 text-white tracking-wide
       capitalize py-2 px-6 rounded focus:bg-purple-800 focus:outline-none focus:shadow-outline mr-3"
          onClick={click}
        >
          No, go back
        </button>
        <button
          className="block bg-gray-500 float-right hover:bg-gray-600 text-white tracking-wide flex
            capitalize py-2 px-4 rounded focus:bg-gray-800 focus:outline-none focus:shadow-outline"
          onClick={handleDelete}
        >
          <HiOutlineTrash className="mt-1 mr-1" />
          <span>{confirm}</span>
        </button>
      </div>
    </div>
  )
}

export default leave
