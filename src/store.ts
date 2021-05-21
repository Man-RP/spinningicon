import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import NFTsReducer from "./reducers/NFTsSlice";
import schemasReducer from "./reducers/schemasSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    NFTs: NFTsReducer,
    schemas: schemasReducer,
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
