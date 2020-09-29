import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import groupService from './../../services/groups'
import Swal from 'sweetalert2'
import CreateGroupForm from './CreateGroupForm'

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
        timer: 1000
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
    <CreateGroupForm
      addGroup={addGroup}
      newGroup={newGroup}
      handleOnChange={handleOnChange}
    />
  )
}

export default CreateGroup
