import React from 'react'
import Editable from './Editable'

const editInput = ({
  editClass,
  value,
  inputRef,
  placeholder,
  handleOnChange,
  rows
}) => {
  return (
    <Editable
      text={value}
      placeholder={placeholder}
      type="textarea"
      childRef={inputRef}
      className={editClass}
    >
      <textarea
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                leading-tight focus:text-gray-600 focus:outline-none focus:shadow-outline"
        value={value}
        onChange={handleOnChange}
        type="text"
        placeholder={placeholder}
        rows={rows}
        ref={inputRef}
      />
    </Editable>
  )
}

export default editInput
