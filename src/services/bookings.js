import axios from 'axios'

const bookingsUrl = 'http://localhost:3001/api/bookings'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getOneBooking = id => {
  const req = axios.get(`${bookingsUrl}/${id}`)
  return req.then(res => res.data)
}

const deleteBooking = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.delete(`${bookingsUrl}/${id}`, config)
  return res.data
}

export default {
  getOneBooking,
  deleteBooking,
  setToken
}
