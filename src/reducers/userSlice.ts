import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  userName: string | undefined;
}

const initialState: UserState = {
  userName: undefined,
};

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
});

export const { logout, logIn } = userSclice.actions;

export default userSclice.reducer;
