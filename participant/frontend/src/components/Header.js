import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: "#f6fcf4",
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" style={{ background: "#4006c0" }}>
      <Toolbar>
        <img
          className={classes.menuButton}
          src="garvan.png"
          alt="Garvan logo"
          width="50"
          height="50"
        />
        <Typography variant="h6" className={classes.title}>
          Participant Registration
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
