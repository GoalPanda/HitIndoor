import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Home'

const routes = () => (
  <Router>
    <Route exact path='/' component={Home} />
    <Route exact path='/class' component={Home} />
    <Route exact path='/appointment' component={Home} />
    <Route exact path='/btn=cage' component={Home} />
    <Route exact path='/btn=lesson' component={Home} />
    <Route exact path='/btn=both' component={Home} />
  </Router>
)


export default (routes)
