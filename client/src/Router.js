/**
 * Import globals.
 */
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

/**
 * Import scenes
 */
import Account from './scenes/Account'
import Balance from './scenes/Balance'
import CreateAccount from './scenes/CreateAccount'
import DeleteAccount from './scenes/DeleteAccount'
import Deposit from './scenes/Deposit'
import Withdrawal from './scenes/Withdrawal'

/**
 * Import components.
 */
import Navigation from './organisms/Navigation'

/**
 * Component.
 */
const Router = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route exact component={Account} path="/" />
        <Route exact component={Balance} path="/balance" />
        <Route exact component={CreateAccount} path="/create" />
        <Route exact component={DeleteAccount} path="/delete" />
        <Route exact component={Deposit} path="/deposit" />
        <Route exact component={Withdrawal} path="/withdrawal" />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
