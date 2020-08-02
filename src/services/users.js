import axios from 'axios'

const usersUrl = 'http://localhost:3001/api/users'

const getAllUsers = () => {
  const req = axios.get(usersUrl)
  return req.then(res => res.data)
}

const getOneUser = id => {
  const req = axios.get(`${usersUrl}/${id}`)
  return req.then(res => res.data)
}

const createUser = async credentials => {
  const res = await axios.post(usersUrl, credentials)
  return res.data
}

const updateUser = async (id, newUser) => {
  const res = await axios.patch(`${usersUrl}/${id}`, newUser)
  return res.data
}

export default { getOneUser, getAllUsers, createUser, updateUser }
