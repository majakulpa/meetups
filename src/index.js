import React from 'react'
import ReactDOM from 'react-dom'
import './assets/main.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'

import axios from 'axios'

// axios.get('http://localhost:3001/api/users').then(res => {
//   const users = res.data
//   //console.log(users)
// })

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
