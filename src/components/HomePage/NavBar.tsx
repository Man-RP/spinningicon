import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Button,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { fetchUser, logout } from "../../reducers/userSlice";
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const dispatch = useAppDispatch();

  const userName = useAppSelector((state) => state.user.userName);
  const userStatus = useAppSelector((state) => state.user.userFetchStatus);

  const handleLoginClick = async () => {
    if (userStatus !== "loading") {
      dispatch(fetchUser(false));
    }
  };

  const handleLogoutClick = async () => {
    dispatch(logout());
    handleClose();
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          {!userName ? (
            <Button onClick={() => handleLoginClick()} color="inherit">
              Login
            </Button>
          ) : (
            <div>
              <Button
                style={{ textTransform: "none" }}
                color="inherit"
                onClick={handleMenu}
              >
                {userName}
              </Button>
              <Menu
                id="menu-appbar"
                disableScrollLock
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
