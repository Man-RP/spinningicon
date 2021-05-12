import React, { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/storeHooks";
import HomePage from "./pages/HomePage";
import { fetchUser, fetchUserMints } from "./reducers/userSlice";

function App() {
  const dispatch = useAppDispatch();

  const userStatus = useAppSelector((state) => state.user.userFetchStatus);
  const mintsStatus = useAppSelector((state) => state.user.mintsFetchStatus);

  useEffect(() => {
    if (userStatus === "idle") dispatch(fetchUser(true));
    else if (userStatus === "succeeded" && mintsStatus === "idle")
      dispatch(fetchUserMints());
  }, [userStatus, mintsStatus, dispatch]);

  return <HomePage />;
}

export default App;
