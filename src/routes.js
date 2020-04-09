import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Layout from './hoc/layout'
import Home from './components/home/home'
import BookView from './components/books'
import Login from './containers/admin/login'
import User from './components/admin'
import Auth from './hoc/auth'

/*
Use Auth() function to restrict routes whenever required
or use it anyway to pass some user props to the component if user is logged in
*/
const Routes = () => (
  <Layout>
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/login" exact component={Auth(Login, false)}/>
      <Route path="/user" exact component={Auth(User, true)}/>
      <Route path="/books/:id" exact component={BookView}/>
    </Switch>
  </Layout>
)

export default Routes
