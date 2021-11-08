import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { Fragment } from "react";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    color: "#f6fcf4",
    flexGrow: 1
  },
  appBar: {}
}));

const Header = () => {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();

  const classes = useStyles();

  const unauthHeaders = (
    <Button color="inherit" onClick={() => loginWithRedirect()}>
      Login
    </Button>
  );

  const authHeaders = (
    <Fragment>
      <Button
        color="inherit"
        onClick={() =>
          logout({
            returnTo: window.location.origin + window.location.pathname
          })
        }
      >
        Logout
      </Button>
    </Fragment>
  );

  return (
    <AppBar
      position="fixed"
      style={{ background: "#4006c0" }}
      className={classes.appBar}
    >
      <Toolbar>
        <img
          className={classes.menuButton}
          src="garvan.png"
          alt="Garvan logo"
          width="50"
          height="50"
        />
        <Typography variant="h6" className={classes.title}>
          Clinical
        </Typography>
        {(() => {
          if (isAuthenticated) return authHeaders;
          return unauthHeaders;
        })()}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
