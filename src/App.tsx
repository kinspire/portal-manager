import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import Content from "./pages/Content";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Kinspire Portal Manager</Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.root}>
        <Content />
      </main>
    </>
  );
};

export default App;
