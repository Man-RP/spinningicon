import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllTemplates } from "../api";

interface NFT {
  name: string;
  id: string;
  img: string;
  description: string;
  maxSupply: string;
}

export interface NFTsState {
  data: NFT[];
  loading: "idle" | "pending";
}

const initialState: NFTsState = { data: [], loading: "idle" };

export const NFTsSlice = createSlice({
  name: "NFTs",
  initialState,
  reducers: {
    loadData: (state, action: PayloadAction<NFT[]>) => {
      state.data = action.payload;
    },
    NFTLoading(state, action) {
      // Use a "state machine" approach for loading state instead of booleans
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    NFTReceived(state, action) {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.data = action.payload;
      }
    },
  },
  // extraReducers: {
  //   [fetchNFTs.fulfilled]: (state, action) => {
  //     // Add user to the state array
  //     state.data = action.payload;
  //   },
  // },
});

const fetchNFTs = createAsyncThunk("NFTs/fetchNFTs", async () => {
  const response = await getAllTemplates();
  return response as NFT[];
});

export const { loadData } = NFTsSlice.actions;

export default NFTsSlice.reducer;
