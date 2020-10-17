import axios from 'axios'

const loginUrl = 'https://salty-fjord-10290.herokuapp.com/api/login'

const login = async credentials => {
  const res = await axios.post(loginUrl, credentials)
  return res.data
}

export default { login }
