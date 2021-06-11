import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserMints, tryLoginWaxOnSetUp, waxLogin } from "../api";

export interface IMints {
  [templateId: string]: string;
}
export interface UserState {
  userName: string | undefined;
  mints: IMints | undefined;
  userFetchStatus: "init" | "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  userName: undefined,
  mints: undefined,
  userFetchStatus: "init",
  error: null,
};

export const fetchUser = createAsyncThunk<
  [string | undefined, IMints | undefined],
  boolean
>("user/fetchUser", async (init: boolean, thunkAPI) => {
  let user: string | undefined = undefined;
  let mints: IMints | undefined = undefined;
  if (init) user = await tryLoginWaxOnSetUp();
  else user = await waxLogin();
  if (user) mints = await getUserMints(user);
  return [user, mints];
});

export const userSclice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, action: PayloadAction<void>) => {
      state.userName = undefined;
      state.mints = undefined;
      state.userFetchStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.userFetchStatus = "loading";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      if (action.payload === undefined) state.userFetchStatus = "idle";
      else state.userFetchStatus = "succeeded";

      state.userName = action.payload[0];
      state.mints = action.payload[1];
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.userFetchStatus = "failed";
      state.error = action.error.message ? action.error.message : null;
    });
  },
});

export const { logout } = userSclice.actions;

export default userSclice.reducer;
