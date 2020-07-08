import axios from 'axios'

const usersUrl = 'http://localhost:3001/api/login'

const login = async credentials => {
  const res = await axios.post(usersUrl, credentials)
  return res.data
}

export default { login }
