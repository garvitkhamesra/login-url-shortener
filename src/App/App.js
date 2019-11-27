import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import {PrivateRoute} from "../components/PrivateRoute";
import LoginPage from "../LoginPage/LoginPage";
import HomePage from "../HomePage/HomePage"
function App() {
  return (
      <div className="jumbotron">
          <div className="container">
              <div className="col-sm-8 col-sm-offset-2">
                  <Router>
                      <div>
                          <PrivateRoute exact path="/" component={HomePage} />
                          <Route path="/login" component={LoginPage} />
                      </div>
                  </Router>
              </div>
          </div>
      </div>
  );
}

export default App;
