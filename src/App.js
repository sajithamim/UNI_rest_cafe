import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import cafeDetails from './components/cafeDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Route component={cafeDetails} path='/' />
      </Switch>
    </Router>
  );
}

export default App;
