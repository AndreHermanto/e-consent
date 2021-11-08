import "./App.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Header from "./components/Header";
import React from "react";
import Register from "./pages/Register";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(1200 + theme.spacing(2) * 2)]: {
      width: 1200,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div className="ParticipantForm">
      <Router basename={window.location.pathname}>
        <Header />
        <main className={classes.layout}>
          <Switch>
            <Route exact path="/" component={Register} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
