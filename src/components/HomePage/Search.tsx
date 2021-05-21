import React from "react";
import {
  createStyles,
  InputBase,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useAppDispatch } from "../../hooks/storeHooks";
import { filterByName } from "../../reducers/NFTsSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: theme.spacing(28),
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

const Search = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    dispatch(filterByName(e.target.value));
  };

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search.."
        inputProps={{ "aria-label": "Search" }}
        onChange={handleSearch}
      />
      <SearchIcon />
    </Paper>
  );
};

export default Search;
