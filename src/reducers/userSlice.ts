import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserMints, tryLoginWaxOnSetUp, waxLogin } from "../api";

export interface IMints {
  [templateId: string]: string;
}
export interface UserState {
  userName: string | undefined;
  mints: IMints;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  userName: undefined,
  mints: {},
  status: "idle",
  error: null,
};

export const fetchUser = createAsyncThunk<
  { user: string | undefined; mints: IMints },
  boolean
>("user/fetchUser", async (init: boolean, thunkAPI) => {
  let user: string | undefined = undefined;
  let mints: IMints = {};
  if (init) user = await tryLoginWaxOnSetUp();
  else user = await waxLogin();
  if (user) mints = await getUserMints();
  return {
    user: user,
    mints: mints,
  };
});

export const userSclice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.userName = undefined;
    },
    logIn: (state, action: PayloadAction<string | unknown>) => {
      if (typeof action.payload === "string") state.userName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.userName = action.payload.user;
      state.mints = action.payload.mints;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message ? action.error.message : null;
    });
  },
});

export const { logout, logIn } = userSclice.actions;

export default userSclice.reducer;
