import React, { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/storeHooks";
import HomePage from "./pages/HomePage";
import { fetchUser, logIn } from "./reducers/userSlice";

function App() {
  const dispatch = useAppDispatch();

  const wax = useAppSelector((state) => state.wax.waxInstance);
  const userName = useAppSelector((state) => state.user.userName);
  const userStatus = useAppSelector((state) => state.user.status);

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUser(wax));
    }
  }, [userStatus, dispatch]);

  return <HomePage />;
}

export default App;
