import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WaxJS } from "@waxio/waxjs/dist";
import { error } from "node:console";

export interface UserState {
  userName: string | undefined;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  userName: undefined,
  status: "idle",
  error: null,
};

export const fetchUser = createAsyncThunk<string, WaxJS>(
  "user/fetchUser",
  async (wax) => {
    let response = undefined;
    const status = await wax.isAutoLoginAvailable();
    if (status) response = wax.userAccount;
    return response as string;
  }
);

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
      state.userName = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message ? action.error.message : null;
    });
  },
});

export const { logout, logIn } = userSclice.actions;

export default userSclice.reducer;
