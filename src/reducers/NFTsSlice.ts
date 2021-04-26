import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllTemplates } from "../api";

export interface NFT {
  templateId: string;
  templateName: string;
  schemeName: string;
  description: string;
  img: string;
  maxSupply: string | undefined;
  mint: string | undefined;
}

export interface NFTsState {
  data: NFT[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NFTsState = { data: [], status: "idle", error: null };

export const fetchNFTs = createAsyncThunk<NFT[]>("NFTs/fetchNFTs", async () => {
  const response = await getAllTemplates();
  return response as NFT[];
});

export const NFTsSlice = createSlice({
  name: "NFTs",
  initialState,
  reducers: {
    loadData: (state, action: PayloadAction<NFT[]>) => {
      state.data = action.payload;
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

export const { loadData } = NFTsSlice.actions;

export default NFTsSlice.reducer;
