import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Bikes from "./pages/Bikes"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path ="/bikes" component={Bikes} />
      </Switch>
    </div>
  );
}

export default App;
