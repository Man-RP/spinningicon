import React, { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/storeHooks";
import HomePage from "./pages/HomePage";
import { fetchUser } from "./reducers/userSlice";

function App() {
  const dispatch = useAppDispatch();

  const userStatus = useAppSelector((state) => state.user.status);

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUser(true));
    }
  }, [userStatus, dispatch]);

  return <HomePage />;
}

export default App;
