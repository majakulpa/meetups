import axios from 'axios'

const eventsUrl = 'http://localhost:3001/api/events'

const getAll = () => {
  const req = axios.get(eventsUrl)
  return req.then(res => res.data)
}

const create = newEvent => {
  const req = axios.post(eventsUrl, newEvent)
  return req.then(res => res.data)
}

const update = (id, newEvent) => {
  const req = axios.patch(`${eventsUrl}/${id}`, newEvent)
  return req.then(res => res.data)
}

export default { getAll, create, update }
