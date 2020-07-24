import axios from 'axios'

const eventsUrl = 'http://localhost:3001/api/events'

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

const update = (id, newEvent) => {
  const req = axios.patch(`${eventsUrl}/${id}`, newEvent)
  return req.then(res => res.data)
}

export default { getAll, create, update, setToken, getOneEvent }
