import React, { useRef } from 'react'
import EditInput from './../UI/EditInput'
import EditTextarea from './../UI/EditTextarea'
import SelectGroups from './../UI/SelectGroups'
import DeleteButton from '../UI/DeleteButton'
import PlusButton from '../UI/PlusButton'

const editEvent = ({
  onSubmit,
  oneEvent,
  handleOnChange,
  handleSelectOnChange,
  handleDeleteEvent,
  currentGroups
}) => {
  const inputRef = useRef()

  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <div>
          <EditInput
            editText={`${new Date(oneEvent.date).toDateString()}, 
                ${new Date(oneEvent.date).toLocaleTimeString('en-US')}`}
            editClass="text-sm"
            value={new Date(oneEvent.date)
              .toISOString()
              .split('')
              .slice(0, 16)
              .join('')}
            inputRef={inputRef}
            placeholder="Event date"
            inputType="datetime-local"
            handleOnChange={e => handleOnChange('date', e.target.value)}
            min={new Date()
              .toISOString()
              .split('')
              .slice(0, 16)
              .join('')}
          />
        </div>
        <div className="mb-5">
          <EditInput
            editText={oneEvent.title}
            editClass="capitalize text-3xl font-bold"
            value={oneEvent.title}
            inputRef={inputRef}
            placeholder="Event title"
            inputType="text"
            handleOnChange={e => handleOnChange('title', e.target.value)}
          />
        </div>
        <div className="mb-5">
          <EditTextarea
            value={oneEvent.description}
            inputRef={inputRef}
            placeholder="Event description"
            handleOnChange={e => handleOnChange('description', e.target.value)}
            rows="8"
          />
        </div>
        <div className="flex justify-between">
          <div className="w-1/2 pr-4">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2"
              htmlFor="location"
            >
              Location:
            </label>
            <EditInput
              editText={oneEvent.place}
              editClass="font-bold text-lg"
              value={oneEvent.place}
              inputRef={inputRef}
              placeholder="Event location"
              inputType="text"
              handleOnChange={e => handleOnChange('place', e.target.value)}
            />
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2"
              htmlFor="price"
            >
              Price:
            </label>
            <EditInput
              editText={`$${oneEvent.price}`}
              editClass="font-medium text-lg"
              value={oneEvent.price}
              inputRef={inputRef}
              placeholder="Event price"
              inputType="number"
              handleOnChange={e => handleOnChange('price', e.target.value)}
              min="0"
            />
          </div>
          <div className="w-1/2 pl-4">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2"
              htmlFor="capacity"
            >
              Max capacity:
            </label>
            <EditInput
              editText={oneEvent.capacity}
              editClass="font-medium text-lg"
              value={oneEvent.capacity}
              inputRef={inputRef}
              placeholder="Event max capacity"
              inputType="number"
              handleOnChange={e => handleOnChange('capacity', e.target.value)}
              min="0"
            />
          </div>
        </div>
        <div className="w-full my-8">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="selectedGroups"
          >
            Groups:
          </label>
          <SelectGroups
            onChange={handleSelectOnChange}
            defaultValue={currentGroups}
          />
        </div>
        <PlusButton text="Save" />
      </form>
      <div className="float-left">
        <DeleteButton
          text="Delete Event"
          alertText="This event will be deleted permanently."
          handleDelete={handleDeleteEvent}
          confirmText="Yes, delete it!"
          textFireDeleted="Your event has been deleted."
          textFireSafe="Your event is safe :)"
        />
      </div>
    </React.Fragment>
  )
}

export default editEvent
