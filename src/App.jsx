import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function App() {
  const accessToken = localStorage.getItem("access_token")

  return (
    <>
      <BrowserRouter>
        <Route render={() => {
          return accessToken ? (
            <Redirect to="/dashboard" />
          ) : (
            <Redirect to="/login" />
          )
        }}
        />

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
