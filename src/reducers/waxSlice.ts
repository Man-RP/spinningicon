import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WaxJS } from "@waxio/waxjs/dist";

export interface WaxState {
  waxInstance: WaxJS;
}

const initialState: WaxState = {
  waxInstance: new WaxJS("https://wax.greymass.com"),
};

export const waxSclice = createSlice({
  name: "wax",
  initialState,
  reducers: {
    logIn: (state) => {
      const login = async () => await state.waxInstance.login();
      login();
    },
  },
});

export const { logIn } = waxSclice.actions;

export default waxSclice.reducer;
