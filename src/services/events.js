import axios from 'axios'

const eventsUrl = 'https://salty-fjord-10290.herokuapp.com/api/events'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const req = axios.get(eventsUrl)
  return req.then(res => res.data)
}

const create = async newEvent => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(eventsUrl, newEvent, config)
  return res.data
}

const getOneEvent = id => {
  const req = axios.get(`${eventsUrl}/${id}`)
  return req.then(res => res.data)
}

const update = async (id, newEvent) => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.patch(`${eventsUrl}/${id}`, newEvent, config)
  return res.data
}

const deleteEvent = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.delete(`${eventsUrl}/${id}`, config)
  return res.data
}

const bookEvent = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(`${eventsUrl}/${id}`, id, config)
  return res.data
}

export default {
  getAll,
  create,
  update,
  setToken,
  getOneEvent,
  deleteEvent,
  bookEvent
}
