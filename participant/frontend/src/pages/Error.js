import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import React from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

export default function Error(props) {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.paper}>
        {(() => {
          if (props.reason === "params") {
            return (
              <Typography variant="h6" component="h1">
                Alex you goose, you didnt set the URL params
              </Typography>
            );
          } else {
            return (
              <div>
                <Typography variant="h5" component="h1">
                  {props.context.response.status}
                </Typography>
                <Typography variant="h6" component="h2">
                  Response
                </Typography>
                <Typography variant="body1" component="h3">
                  {typeof props.context.response.data === "string"
                    ? props.context.response.data
                    : props.context.response.data.stack}
                </Typography>
                <Typography variant="h6" component="h2">
                  Request
                </Typography>
                {console.log(props.context.response.data)}
                {props.context.response.config.data.split(",").map((value) => {
                  return (
                    <Typography variant="body1" component="h3">
                      {value}
                    </Typography>
                  );
                })}
              </div>
            );
          }
        })()}
      </Paper>
    </div>
  );
}
