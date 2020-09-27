import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import groupService from './../../services/groups'
import Swal from 'sweetalert2'
import GoBack from './../UI/GoBack'
import Footer from './../UI/Footer'

const CreateGroup = () => {
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    mainImage: ''
  })
  let history = useHistory()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    const loggedUserJSON = JSON.parse(loggedUser)
    groupService.setToken(loggedUserJSON.userToken)
  }, [])

  const addGroup = async e => {
    e.preventDefault()

    try {
      await groupService.createGroup({ ...newGroup })
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
    <React.Fragment>
      <div className="bg-gray-100 sp-screen">
        <GoBack />
        <div className="w-full max-w-sm container p-5 my-5 mx-auto bg-white rounded border-solid border border-gray-200">
          <form onSubmit={addGroup}>
            <div className="w-full mb-5">
              <h3 className="mb-5 font-bold text-lg text-center">New Group</h3>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="name"
              >
                Name:
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 
              leading-tight focus:shadow-outline focus:text-gray-600"
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
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
              focus:shadow-outline focus:text-gray-600"
                value={newGroup.description}
                onChange={e => handleOnChange('description', e.target.value)}
                placeholder="Event description"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Main Image URL:
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
              focus:text-gray-600 focus:shadow-outline"
                value={newGroup.mainImage}
                onChange={e => handleOnChange('mainImage', e.target.value)}
                type="text"
                placeholder="Enter description"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="mt-5 bg-purple-600 w-full hover:bg-purple-800 text-white font-bold py-2 px-4 
            rounded focus:outline-none focus:shadow-outline"
              >
                Create Group
              </button>
            </div>
            <div className="text-center mt-4 text-gray-500">
              <Link to="/groups">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default CreateGroup
