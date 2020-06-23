import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Events from './pages/Events/Events'
import Bookings from './pages/Bookings/Bookings'
import Account from './pages/Account/Account'
import Login from './pages/Login/Login'
import Groups from './pages/Groups/Groups'
import Navigation from './components/Navigation/Navigation'
import './App.css'

class App extends Component {
  state = {}
  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <main className="main">
          <Switch>
            <Redirect path="/" to="/events" exact />
            <Route path="/events" component={Events} />
            <Route path="/bookings" component={Bookings} />
            <Route path="/account" component={Account} />
            <Route path="/login" component={Login} />
            <Route path="/groups" component={Groups} />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}

export default App
