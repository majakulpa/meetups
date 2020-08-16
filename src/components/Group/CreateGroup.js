import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import groupService from './../../services/groups'
import Swal from 'sweetalert2'

const CreateGroup = () => {
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: ''
  })
  let history = useHistory()

  const loggedUser = window.localStorage.getItem('loggedUser')
  const loggedUserJSON = JSON.parse(loggedUser)
  const loggedUserToken = loggedUserJSON.userToken

  const addGroup = async e => {
    e.preventDefault()

    try {
      await groupService.createGroup({ ...newGroup })
      groupService.setToken(loggedUserToken)
      await setNewGroup(newGroup)
      Swal.fire({
        icon: 'success',
        title: `${newGroup.name} has been created!`,
        showConfirmButton: false,
        timer: 1500
      })
      history.goBack()
    } catch (exception) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all the fields!'
      })
    }
  }

  const handleOnChange = (eventKey, value) =>
    setNewGroup({ ...newGroup, [eventKey]: value })

  return (
    <div className="w-full max-w-sm container mt-20 mx-auto">
      <form onSubmit={addGroup}>
        <div className="w-full mb-5">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
            value={newGroup.name}
            onChange={e => handleOnChange('name', e.target.value)}
            type="text"
            placeholder="Group name"
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
            value={newGroup.description}
            onChange={e => handleOnChange('description', e.target.value)}
            placeholder="Event description"
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Create Group
          </button>
        </div>
        <div className="text-center mt-4 text-gray-500">
          <Link to="/groups">Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default CreateGroup
