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

export default { getOneUser, getAllUsers }
