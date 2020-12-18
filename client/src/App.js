import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Land/Home';
import Profile from './components/Profile/Profile';

import './App.css';

const logUserContext = React.createContext([{}, () => {}]);

function App() {

  const [logUser, setLogUser] = useState({loggedin: false, username: ''})

  return (
    <logUserContext.Provider value={[logUser, setLogUser]} >
      <Router>
        <Navbar />
        <Switch>

          <Route path="/" exact >
            <Home />
          </Route>

          <Route path="/profile" >
            <Profile />
          </Route>

        </Switch>
      </Router>
    </logUserContext.Provider>
  );
}

export default App;

export {logUserContext}
