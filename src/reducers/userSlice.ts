import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserMints, tryLoginWaxOnSetUp, waxLogin } from "../api";
import { RootState } from "../store";
import { addMintsToTemplates, clearMintsFromTemplates } from "./NFTsSlice";

export interface IMints {
  [templateId: string]: string;
}
export interface UserState {
  userName: string | undefined;
  userFetchStatus: "init" | "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  userName: undefined,
  userFetchStatus: "init",
  error: null,
};

export const fetchUser = createAsyncThunk<
  string | undefined,
  boolean,
  {
    state: RootState;
  }
>("user/fetchUser", async (init: boolean, thunkAPI) => {
  let user: string | undefined = undefined;
  if (init) user = await tryLoginWaxOnSetUp();
  else user = await waxLogin();
  //if templates were fetched already - fetch user's assets and add mint numbers to the templates
  if (user && thunkAPI.getState().NFTs.data.length > 0) {
    const mints = await getUserMints(user);
    thunkAPI.dispatch(addMintsToTemplates(mints)); //add mint numbers
  }
  return user;
});

export const logoutUser = createAsyncThunk<
  void,
  void,
  {
    state: RootState;
  }
>("user/logout", async (dummy, thunkAPI) => {
  thunkAPI.dispatch(clearMintsFromTemplates()); //clear mint number from templates first
});

export const userSclice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.userFetchStatus = "loading";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      if (action.payload === undefined) state.userFetchStatus = "idle";
      else state.userFetchStatus = "succeeded";

      state.userName = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.userFetchStatus = "failed";
      state.error = action.error.message ? action.error.message : null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.userName = undefined;
      state.userFetchStatus = "idle";
    });
  },
});

export default userSclice.reducer;
