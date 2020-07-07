import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Bikes from "./pages/Bikes"
import Map from './components/Map';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path ="/" component={Bikes} />
        <Route path ="/map" component={Map} />
      </Switch>
    </div>
  );
}

export default App;
