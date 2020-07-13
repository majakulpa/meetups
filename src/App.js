import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Events from './pages/Events/Events'
import Bookings from './pages/Bookings/Bookings'
import Account from './pages/Account/Account'
import Login from './pages/Login/Login'
import Groups from './pages/Groups/Groups'
import CreateEvent from './components/Event/CreateEvent'
import EventDetails from './components/Event/EventDetails'
import Navigation from './components/Navigation/Navigation'
import { GlobalProvider } from './context/GlobalState'

class App extends Component {
  state = {}
  render() {
    return (
      <GlobalProvider>
        <Navigation />
        <main className="main">
          <Switch>
            <Redirect path="/" to="/events" exact />
            <Route path="/events" exact component={Events} />
            <Route path="/events/:id" exact component={EventDetails} />
            <Route path="/create" exact component={CreateEvent} />
            <Route path="/bookings" exact component={Bookings} />
            <Route path="/account" exact component={Account} />
            <Route path="/login" exact component={Login} />
            <Route path="/groups" exact component={Groups} />
          </Switch>
        </main>
      </GlobalProvider>
    )
  }
}

export default App
