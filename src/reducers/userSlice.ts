import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserMints, tryLoginWaxOnSetUp, waxLogin } from "../api";
import { RootState } from "../store";

export interface IMints {
  [templateId: string]: string;
}
export interface UserState {
  userName: string | undefined;
  mints: IMints | undefined;
  userFetchStatus: "idle" | "loading" | "succeeded" | "failed";
  mintsFetchStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  userName: undefined,
  mints: undefined,
  userFetchStatus: "idle",
  mintsFetchStatus: "idle",
  error: null,
};

export const fetchUser = createAsyncThunk<string | undefined, boolean>(
  "user/fetchUser",
  async (init: boolean, thunkAPI) => {
    let user: string | undefined = undefined;
    if (init) user = await tryLoginWaxOnSetUp();
    else user = await waxLogin();
    return user;
  }
);

export const fetchUserMints = createAsyncThunk<
  IMints | undefined,
  void,
  {
    state: RootState;
  }
>("user/fetchUserMints", async (temp, thunkAPI) => {
  const { userName } = thunkAPI.getState().user;
  if (userName) return await getUserMints();
  return undefined;
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
      state.userFetchStatus = "loading";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.userFetchStatus = "succeeded";
      state.userName = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.userFetchStatus = "failed";
      state.error = action.error.message ? action.error.message : null;
    });
    builder.addCase(fetchUser.pending, (state, action) => {
      state.mintsFetchStatus = "loading";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.mintsFetchStatus = "succeeded";
      state.userName = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.mintsFetchStatus = "failed";
      state.error = action.error.message ? action.error.message : null;
    });
  },
});

export const { logout, logIn } = userSclice.actions;

export default userSclice.reducer;
