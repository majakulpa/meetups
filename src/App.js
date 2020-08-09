import React, { useState, useMemo } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Events from './pages/Events/Events'
import Bookings from './pages/Bookings/Bookings'
import Account from './pages/Account/Account'
import Login from './pages/Login/Login'
import Signup from './pages/Login/Signup'
import PasswordReset from './pages/Login/PasswordReset'
import Groups from './pages/Groups/Groups'
import CreateEvent from './components/Event/CreateEvent'
import EventDetails from './components/Event/EventDetails'
import Navigation from './components/Navigation/Navigation'
import { GlobalContext } from './context/Context'

const App = () => {
  const [user, setUser] = useState(null)
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser])

  return (
    <GlobalContext.Provider value={providerValue}>
      <Navigation />
      <main className="main">
        <Switch>
          <Route path="/" exact component={Events} />
          <Redirect path="/events" to="/" exact />
          <Route path="/events/:id" exact component={EventDetails} />
          <Route path="/create" exact component={CreateEvent} />
          <Route path="/bookings" exact component={Bookings} />
          <Route path="/users/:id" exact component={Account} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/password-reset" exact component={PasswordReset} />
          <Route path="/groups" exact component={Groups} />
        </Switch>
      </main>
    </GlobalContext.Provider>
  )
}

export default App
