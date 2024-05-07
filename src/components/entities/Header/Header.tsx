import {
  AppBar,
  Button,
  CssBaseline,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useAppSelector } from "../../../redux/store.ts";
import { useStyles } from "./styles.ts";

interface HeaderI {
  onExit: () => void;
}
function Header({ onExit }: HeaderI) {
  const classes = useStyles();
  const { currentUser } = useAppSelector((state) => state.user);

  return (
    <>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Krasnova Test
          </Typography>
          {currentUser && (
            <Button
              href="#"
              color="primary"
              variant="outlined"
              className={classes.link}
              onClick={onExit}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
export default Header;
