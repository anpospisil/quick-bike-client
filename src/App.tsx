import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Bikes from "./pages/Bikes"
import Navbar from "./components/Navbar"
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import userProfile from './pages/UserProfile';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path = "/" component={Bikes} />
        <Route path = "/user" component={userProfile} />
        <Route path = "/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
