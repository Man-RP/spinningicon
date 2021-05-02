import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import NFTsReducer from "./reducers/NFTsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    NFTs: NFTsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
