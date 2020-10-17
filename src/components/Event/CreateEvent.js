import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import eventService from './../../services/events'
import Swal from 'sweetalert2'
import CreateEventForm from './CreateEventForm'

const CreateEvent = () => {
  const [newEvent, setNewEvent] = useState({
    date: '',
    title: '',
    price: '',
    capacity: '',
    description: '',
    place: ''
  })
  const [selectedGroups, setSelectedGroups] = useState([])
  let history = useHistory()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    const loggedUserJSON = JSON.parse(loggedUser)
    eventService.setToken(loggedUserJSON.userToken)
  }, [])

  const addEvent = async e => {
    e.preventDefault()

    try {
      let groups = selectedGroups.map(group => {
        let properties = {
          _id: group.value
        }
        return properties
      })
      await eventService.create({ ...newEvent, groups })
      await setNewEvent(newEvent)
      history.push('/')
      Swal.fire({
        icon: 'success',
        title: 'Your event has been created!',
        showConfirmButton: false,
        timer: 1000
      })
    } catch (exception) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all the fields!'
      })
    }
  }

  const handleOnChange = (eventKey, value) =>
    setNewEvent({ ...newEvent, [eventKey]: value })

  const handleSelectOnChange = selectedGroups =>
    setSelectedGroups(selectedGroups)

  return (
    <CreateEventForm
      handleOnChange={handleOnChange}
      handleSelectOnChange={handleSelectOnChange}
      addEvent={addEvent}
      newEvent={newEvent}
      selectedGroups={selectedGroups}
    />
  )
}

export default CreateEvent
