import React from 'react';
import './style.scss';
import { Switch, Route } from 'react-router-dom';
import Bikes from "./pages/Bikes"
import Lock from './pages/Lock';
import Navbar from "./components/Navbar"
import MessageBox from "./components/MessageBox";
import About from './pages/About';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import userProfile from './pages/UserProfile';

function App() {
  return (
    <div className="App">
      <Navbar />
      <MessageBox />
      <Switch>
        <Route path = "/about" component={About} />
        <Route exact path = "/" component={Bikes} />
        <Route path = "/user" component={userProfile} />
        <Route path = "/mybike" component={Lock} />
        <Route path = "/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
