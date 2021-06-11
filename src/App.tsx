import { CssBaseline } from "@material-ui/core";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./components/shared/Footer";
import NavBar from "./components/shared/NavBar";
import { useAppDispatch, useAppSelector } from "./hooks/storeHooks";
import Cards from "./pages/Cards";
import { fetchUser } from "./reducers/userSlice";

function App() {
  const dispatch = useAppDispatch();

  const userStatus = useAppSelector((state) => state.user.userFetchStatus);

  useEffect(() => {
    if (userStatus === "init") dispatch(fetchUser(true));
  }, [userStatus, dispatch]);

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
