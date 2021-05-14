import React from "react";
import { AppBar, Avatar, Button, makeStyles } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { fetchUser } from "../../reducers/userSlice";
import logo from "../../assets/logo.jpg";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const userName = useAppSelector((state) => state.user.userName);
  const userStatus = useAppSelector((state) => state.user.userFetchStatus);

  const handleLoginClick = async () => {
    if (userStatus !== "loading") {
      dispatch(fetchUser(false));
    }
  };

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Avatar className={classes.icon} alt="Logo" src={logo} />
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            SpinningIcons
          </Typography>
          {!userName && userStatus === "succeeded" ? (
            <Button onClick={() => handleLoginClick()} color="inherit">
              Login
            </Button>
          ) : (
            <Typography color="inherit">{userName}</Typography>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
