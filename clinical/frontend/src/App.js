import "./App.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Clinical from "./pages/Clinical";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header";
import React from "react";

function App() {
  return (
    <div className="NSWHP">
      <CssBaseline />
      <Router basename={window.location.pathname}>
        <Header />

        <Switch>
          <Route exact path="/" component={Clinical} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
