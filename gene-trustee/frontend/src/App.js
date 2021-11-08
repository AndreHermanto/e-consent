import "./App.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import GeneTrustee from "./pages/GeneTrustee";
import Header from "./components/Header";
import React from "react";

function App() {
  return (
    <div className="NSWHP">
      <Router basename={window.location.pathname}>
        <Header />

        <Switch>
          <Route exact path="/" component={GeneTrustee} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
