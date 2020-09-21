import React, { useState, useEffect } from 'react'
import { HiOutlinePencilAlt } from 'react-icons/hi'

//editable created by Paramanantham Harrison
//https://blog.logrocket.com/the-complete-guide-to-building-inline-editable-ui-in-react/

const Editable = ({
  childRef,
  text,
  type,
  placeholder,
  children,
  ...props
}) => {
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus()
    }
  }, [isEditing, childRef])

  const handleKeyDown = (event, type) => {
    const { key } = event
    const keys = ['Escape', 'Tab']
    const enterKey = 'Enter'
    const allKeys = [...keys, enterKey] // All keys array
    /* 
    - For textarea, check only Escape and Tab key and set the state to false
    - For everything else, all three keys will set the state to false
  */
    if (
      (type === 'textarea' && keys.indexOf(key) > -1) ||
      (type !== 'textarea' && allKeys.indexOf(key) > -1)
    ) {
      setIsEditing(false)
    }
  }

  return (
    <section {...props}>
      {isEditing ? (
        <div
          onBlur={() => setIsEditing(false)}
          onKeyDown={e => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="cursor-pointer flex justify-between"
        >
          <span>{text || placeholder || 'Editable content'}</span>
          <HiOutlinePencilAlt className="text-xl" />
        </div>
      )}
    </section>
  )
}

export default Editable
