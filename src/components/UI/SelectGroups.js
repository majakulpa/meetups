import React, { useState, useEffect } from 'react'
import groupService from '../../services/groups'
import Select from 'react-select'

const SelectGroups = ({ value, onChange }) => {
  const [allGroups, setAllGroups] = useState([])

  useEffect(() => {
    let isActive = true
    groupService.getAllGroups().then(allGroups => {
      if (isActive) {
        setAllGroups(allGroups)
      }
    })
    return () => {
      isActive = false
    }
  }, [])

  let options = allGroups.map(group => {
    let properties = {
      value: group.id,
      label: group.name
    }
    return properties
  })

  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      key={options.value}
      isMulti
    />
  )
}

export default SelectGroups
