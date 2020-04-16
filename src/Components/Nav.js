import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Link } from "react-router-dom";

export const Nav = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Link className={classes.link} to={"/"}>
            <Typography className={classes.title} variant="h6" noWrap>
              Pokedex Project
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#ff3860",
  },
  appBar: {
    backgroundColor: "#ff3860",
    boxShadow: "none",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  title: {
    flexGrow: 1,
    display: "block",
  },
}));
