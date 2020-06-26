import React, { Component } from 'react'
import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/events'

class Events extends Component {
  state = {
    events: []
  }

  componentDidMount() {
    const request = axios.get(baseUrl)
    request.then(res => {
      const events = res.data
      this.setState({ events })
    })
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.events.map(event => (
            <li key={event.id}>{event.title}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Events
