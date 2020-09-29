import React from 'react'
import Editable from './Editable'

const editInput = ({
  editClass,
  editText,
  value,
  inputRef,
  placeholder,
  inputType,
  handleOnChange,
  min
}) => {
  return (
    <Editable
      text={editText}
      placeholder={placeholder}
      type="input"
      childRef={inputRef}
      className={editClass}
    >
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
        leading-tight focus:text-gray-600 focus:outline-none focus:shadow-outline"
        value={value}
        onChange={handleOnChange}
        type={inputType}
        placeholder={placeholder}
        ref={inputRef}
        min={min}
      />
    </Editable>
  )
}

export default editInput
