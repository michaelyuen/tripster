import React from "react";

import { Normalize } from "styled-normalize";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Toast from "react-toast-component";
import Login from "./components/Login";
import Home from "./components/Home";
import SignUp from "./components/SignUp";

const App: React.FC = () => {
  return (
    <>
      <Toast />
      <Normalize />
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/dashboard" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
