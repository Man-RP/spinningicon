import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllTemplates, getTemplatesByPage } from "../api";
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
  page: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NFTsState = {
  data: [],
  page: 0,
  status: "idle",
  error: null,
};

export const fetchAllNFTs = createAsyncThunk<NFT[], void>(
  "NFTs/fetchAllNFTs",
  async () => {
    let NFTs: NFT[] = await getAllTemplates();
    return NFTs as NFT[];
  }
);

export const fetchNFTs = createAsyncThunk<NFT[], void, { state: RootState }>(
  "NFTs/fetchNFTs",
  async (dummy, thunkApi) => {
    const { page } = thunkApi.getState().NFTs;
    let NFTs: NFT[] = await getTemplatesByPage(page);
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
    builder.addCase(fetchAllNFTs.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllNFTs.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    });
    builder.addCase(fetchAllNFTs.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message ? action.error.message : null;
    });
    builder.addCase(fetchNFTs.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchNFTs.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data.concat(action.payload);
      state.page++;
    });
    builder.addCase(fetchNFTs.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message ? action.error.message : null;
    });
  },
});

export const { addUserMints } = NFTsSlice.actions;

export default NFTsSlice.reducer;
