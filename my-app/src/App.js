import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import CompetitorsList from './Pages/CompetitorsList';
import Details from './Pages/Details';

import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={CompetitorsList} />
          <Route path="/details/:id" component={Details} />
        </div>
      </Router>
    );
  }
}

export default App;