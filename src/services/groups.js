import axios from 'axios'

const groupsUrl = 'https://salty-fjord-10290.herokuapp.com/api/groups'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const createGroup = async newGroup => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(groupsUrl, newGroup, config)
  return res.data
}

const getAllGroups = () => {
  const req = axios.get(groupsUrl)
  return req.then(res => res.data)
}

const getOneGroup = id => {
  const req = axios.get(`${groupsUrl}/${id}`)
  return req.then(res => res.data)
}

const updateGroup = async (id, newGroup) => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.patch(`${groupsUrl}/${id}`, newGroup, config)
  return res.data
}

const deleteGroup = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.delete(`${groupsUrl}/${id}`, config)
  return res.data
}

const joinGroup = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(`${groupsUrl}/${id}`, id, config)
  return res.data
}

const leaveGroup = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.delete(`${groupsUrl}/${id}/unsubscribe`, config)
  return res.data
}

export default {
  getAllGroups,
  createGroup,
  getOneGroup,
  updateGroup,
  deleteGroup,
  joinGroup,
  setToken,
  leaveGroup
}
