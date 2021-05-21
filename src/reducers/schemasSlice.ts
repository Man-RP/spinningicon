import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllSchemas } from "../api";

export interface NFTsState {
  data: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NFTsState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchAllSchemas = createAsyncThunk<string[], void>(
  "schemas/fetchAllSchemas",
  async () => {
    let schemas: string[] = await getAllSchemas();
    return schemas as string[];
  }
);

export const schemasSlice = createSlice({
  name: "NFTs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllSchemas.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllSchemas.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    });
    builder.addCase(fetchAllSchemas.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message ? action.error.message : null;
    });
  },
});

export default schemasSlice.reducer;
