import React, { useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./components/HomePage/Footer";
import NavBar from "./components/HomePage/NavBar";
import { useAppDispatch, useAppSelector } from "./hooks/storeHooks";
import { fetchUser, fetchUserMints } from "./reducers/userSlice";
import Cards from "./pages/Cards";

function App() {
  const dispatch = useAppDispatch();

  const userStatus = useAppSelector((state) => state.user.userFetchStatus);
  const mintsStatus = useAppSelector((state) => state.user.mintsFetchStatus);

  useEffect(() => {
    if (userStatus === "idle") dispatch(fetchUser(true));
    else if (userStatus === "succeeded" && mintsStatus === "idle")
      dispatch(fetchUserMints());
  }, [userStatus, mintsStatus, dispatch]);

  return (
    <Router>
      <CssBaseline />
      <NavBar />
      <main>
        <Switch>
          <Route path="/">
            <Cards />
          </Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
