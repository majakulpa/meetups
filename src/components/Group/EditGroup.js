import React, { useRef } from 'react'
import EditInput from './../UI/EditInput'
import EditTextarea from './../UI/EditTextarea'
import DeleteButton from './../UI/DeleteButton'
import PlusButton from './../UI/PlusButton'

const editGroup = ({
  oneGroup,
  handleOnChange,
  onSubmit,
  handleDeleteGroup
}) => {
  const inputRef = useRef()

  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        {!oneGroup.mainImage ? (
          <div className="w-full h-40 bg-gray-800">
            <EditInput
              editText={oneGroup.name}
              editClass="capitalize text-white text-5xl font-medium p-3"
              value={oneGroup.name}
              inputRef={inputRef}
              placeholder="Group name"
              inputType="text"
              handleOnChange={e => handleOnChange('name', e.target.value)}
            />
          </div>
        ) : (
          <div
            className="w-full h-40 bg-cover bg-center flex flex-col justify-end"
            style={{
              backgroundImage: `linear-gradient(
                to bottom,
                rgba(0,0,0, 0.5),
                rgba(0,0,0, 0.7)
              ), url(${oneGroup.mainImage}})`
            }}
            title="Group main image"
          >
            <EditInput
              editText={oneGroup.name}
              editClass="capitalize text-white text-5xl font-medium p-3"
              value={oneGroup.name}
              inputRef={inputRef}
              placeholder="Group name"
              inputType="text"
              handleOnChange={e => handleOnChange('name', e.target.value)}
            />
          </div>
        )}

        <div className="my-5">
          <EditTextarea
            value={oneGroup.description}
            inputRef={inputRef}
            placeholder="Group description"
            handleOnChange={e => handleOnChange('description', e.target.value)}
            rows="8"
          />
          <EditInput
            editText="Edit main image URL"
            editClass="font-medium mt-5"
            value={oneGroup.mainImage}
            inputRef={inputRef}
            placeholder="Group image URL"
            inputType="text"
            handleOnChange={e => handleOnChange('mainImage', e.target.value)}
          />
        </div>
        <PlusButton text="save" />
      </form>
      <div className="float-left">
        <DeleteButton
          text="Delete Group"
          alertText="This group will be deleted permanently."
          handleDelete={handleDeleteGroup}
          confirmText="Yes, delete it!"
          textFireDeleted="Your group has been deleted."
          textFireSafe="Your group is safe :)"
        />
      </div>
    </React.Fragment>
  )
}

export default editGroup
