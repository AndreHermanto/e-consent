import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  drawer: {
    width: 240,
    flexShrink: 0,
    zIndex: 1
  },
  drawerPaper: {
    width: 240,
    zIndex: 1
  },
  drawerContainer: {
    overflow: "auto"
  }
}));

export default function ManagementDrawer({ children }) {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>{children}</List>
      </div>
    </Drawer>
  );
}
