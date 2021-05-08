import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getAllTemplates } from "../api";
import { addUserMintsToNFTs } from "../helper";
import { RootState } from "../store";
import { IMints } from "./userSlice";

export interface NFT {
  templateId: string;
  templateName: string;
  schemeName: string;
  description: string;
  img: string;
  maxSupply: string | undefined;
  mint?: string | undefined;
}

export interface NFTsState {
  data: NFT[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NFTsState = { data: [], status: "idle", error: null };

export const fetchNFTs = createAsyncThunk<NFT[], void, { state: RootState }>(
  "NFTs/fetchNFTs",
  async (dummy, thunkAPI) => {
    let NFTs: NFT[] = await getAllTemplates();
    const { user } = await thunkAPI.getState();
    if (user.userName) NFTs = addUserMintsToNFTs(NFTs, user.mints);
    return NFTs as NFT[];
  }
);

export const NFTsSlice = createSlice({
  name: "NFTs",
  initialState,
  reducers: {
    addUserMints: (state, action: PayloadAction<IMints>) => {
      state.data = addUserMintsToNFTs(state.data, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNFTs.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchNFTs.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    });
    builder.addCase(fetchNFTs.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message ? action.error.message : null;
    });
  },
});

export const { addUserMints } = NFTsSlice.actions;

export default NFTsSlice.reducer;
