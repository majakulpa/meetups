import React, { useState, useMemo, Suspense } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { GlobalContext } from './context/Context'
const Bookings = React.lazy(() => import('./pages/Bookings/Bookings'))
const BookingDelete = React.lazy(() =>
  import('./components/Booking/BookingDelete')
)
const Account = React.lazy(() => import('./pages/Account/Account'))
const UserAccount = React.lazy(() => import('./pages/Account/UserAccount'))
const Login = React.lazy(() => import('./pages/Login/Login'))
const Signup = React.lazy(() => import('./pages/Login/Signup'))
const PasswordReset = React.lazy(() => import('./pages/Login/PasswordReset'))
const Groups = React.lazy(() => import('./pages/Groups/Groups'))
const GroupDetails = React.lazy(() => import('./components/Group/GroupDetails'))
const GroupUnsubscribe = React.lazy(() =>
  import('./components/Group/GroupUnsubscribe')
)
const CreateGroup = React.lazy(() => import('./components/Group/CreateGroup'))
const CreateEvent = React.lazy(() => import('./components/Event/CreateEvent'))
const EventDetails = React.lazy(() => import('./components/Event/EventDetails'))
const Navigation = React.lazy(() =>
  import('./components/Navigation/Navigation')
)
const Events = React.lazy(() => import('./pages/Events/Events'))

const App = () => {
  const [user, setUser] = useState(null)
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser])

  return (
    <GlobalContext.Provider value={providerValue}>
      <Suspense fallback={<div className="loader"></div>}>
        <Navigation />
        <main
          className="main sp-screen text-gray-700 font-light
        flex flex-col justify-between"
        >
          <Switch>
            <Route path="/meetups/" exact component={Events} />
            <Redirect path="/meetups/events" to="/" exact />
            <Route path="/meetups/events/:id" exact component={EventDetails} />
            <Route path="/meetups/create-event" exact component={CreateEvent} />
            <Route path="/meetups/bookings" exact component={Bookings} />
            <Route
              path="/meetups/bookings/:id"
              exact
              component={BookingDelete}
            />
            <Route path="/meetups/my-account/:id" exact component={Account} />
            <Route path="/meetups/users/:id" exact component={UserAccount} />
            <Route path="/meetups/login" exact component={Login} />
            <Route path="/meetups/signup" exact component={Signup} />
            <Route
              path="/meetups/password-reset"
              exact
              component={PasswordReset}
            />
            <Route path="/meetups/groups" exact component={Groups} />
            <Route path="/meetups/groups/:id" exact component={GroupDetails} />
            <Route path="/meetups/create-group" exact component={CreateGroup} />
            <Route
              path="/meetups/groups/:id/unsubscribe"
              exact
              component={GroupUnsubscribe}
            />
          </Switch>
        </main>
      </Suspense>
    </GlobalContext.Provider>
  )
}

export default App
