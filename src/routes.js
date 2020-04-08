import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Layout from './hoc/layout'
import Home from './components/home/home'
import BookView from './components/books'
import Login from './containers/admin/login'

const Routes = () => (
  <Layout>
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/books/:id" exact component={BookView}/>
    </Switch>
  </Layout>
)

export default Routes
