import React from 'react'
import { Link } from 'react-router-dom'
import GoBack from './../UI/GoBack'
import Footer from './../UI/Footer'
import SelectGroups from './../UI/SelectGroups'

const createEventForm = ({
  addEvent,
  newEvent,
  handleOnChange,
  selectedGroups,
  handleSelectOnChange
}) => {
  return (
    <React.Fragment>
      <div className="bg-gray-100 sp-screen pb-10">
        <GoBack />
        <div className="w-full max-w-sm container p-5 my-5 mx-auto bg-white rounded border-solid border border-gray-200">
          <form onSubmit={addEvent}>
            <div className="w-full mb-5">
              <h3 className="mb-5 font-bold text-lg text-center">New Event</h3>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="title"
              >
                Title:
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 
                leading-tight focus:shadow-outline focus:text-gray-600"
                value={newEvent.title}
                onChange={e => handleOnChange('title', e.target.value)}
                type="text"
                placeholder="Event title"
              />
            </div>
            <div className="w-full mb-5">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="description"
              >
                Description:
              </label>
              <textarea
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 
                leading-tight focus:shadow-outline focus:text-gray-600"
                value={newEvent.description}
                onChange={e => handleOnChange('description', e.target.value)}
                placeholder="Event description"
                rows="4"
              />
            </div>
            <div className="w-full  mb-5">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="place"
              >
                Location:
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 
                leading-tight focus:text-gray-600 focus:shadow-outline"
                value={newEvent.place}
                onChange={e => handleOnChange('place', e.target.value)}
                type="text"
                placeholder="Enter place"
              />
            </div>
            <div className="w-full  mb-5">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="date"
              >
                Date and time:
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 
                leading-tight focus:shadow-outline focus:text-gray-600"
                value={newEvent.date}
                onChange={e => handleOnChange('date', e.target.value)}
                type="datetime-local"
                min={new Date()
                  .toISOString()
                  .split('')
                  .slice(0, 16)
                  .join('')}
                placeholder="Event price"
              />
            </div>
            <div className="w-full  mb-5">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="price"
              >
                Price:
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 
                leading-tight focus:shadow-outline focus:text-gray-600"
                value={newEvent.price}
                onChange={e => handleOnChange('price', e.target.value)}
                type="number"
                step="0.01"
                placeholder="Event price"
              />
            </div>
            <div className="w-full mb-5">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="capacity"
              >
                Capacity:
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 
                leading-tight focus:shadow-outline focus:text-gray-600"
                value={newEvent.capacity}
                onChange={e => handleOnChange('capacity', e.target.value)}
                type="number"
                placeholder="Event Capacity"
              />
            </div>
            <div className="w-full mb-5">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="selectedGroups"
              >
                Groups:
              </label>
              <SelectGroups
                value={selectedGroups}
                onChange={handleSelectOnChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="mt-5 bg-purple-600 w-full hover:bg-purple-800 text-white font-bold py-2 px-4 
              rounded focus:shadow-outline"
              >
                Create Event
              </button>
            </div>
            <div className="text-center mt-4 text-gray-500">
              <Link to="/">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default createEventForm
