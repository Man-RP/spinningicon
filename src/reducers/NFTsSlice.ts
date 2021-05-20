import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { getAllTemplates, getTemplatesByPage } from "../api";
import { templatesInterval } from "../consts/consts";
import {
  addUserMintsToNFTs,
  checkIfLastPage,
  filterNFTsByPage,
  filterTemplatesByName,
} from "../helper";
import { RootState } from "../store";
import { IMints } from "./userSlice";

export interface NFT {
  templateId: string;
  templateName: string;
  schemeName: string;
  collectionName: string;
  description: string;
  img: string;
  maxSupply: string | undefined;
  mint?: string | undefined;
}

export interface NFTsState {
  data: NFT[];
  page: number;
  hasMore: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  search: string;
  schemas: string[];
}

const initialState: NFTsState = {
  data: [],
  page: 1,
  hasMore: true,
  status: "idle",
  error: null,
  search: "",
  schemas: [],
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
    getSchemas: (state, action: PayloadAction<IMints>) => {
      state.data = addUserMintsToNFTs(state.data, action.payload);
    },
    filterByName: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.hasMore = true;
      state.page = 1;
    },
    icreasePage: (state) => {
      state.page = state.page + 1;
      if (
        checkIfLastPage(
          state.data,
          templatesInterval,
          state.page,
          state.search,
          state.schemas
        )
      )
        state.hasMore = false;
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
      if (action.payload.length > 0) {
        state.data = state.data.concat(action.payload);
        state.page++;
      } else state.hasMore = false;
    });
    builder.addCase(fetchNFTs.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message ? action.error.message : null;
    });
  },
});

export const NFTsSelector = createSelector<
  RootState,
  NFT[],
  string,
  number,
  NFT[]
>(
  [
    (state) => state.NFTs.data,
    (state) => state.NFTs.search,
    (state) => state.NFTs.page,
  ],
  (NFTs, search, page) => {
    let res: NFT[] = NFTs;
    if (search.length > 0) res = filterTemplatesByName(NFTs, search); //filter by search
    res = filterNFTsByPage(res, templatesInterval, page); //limit results amount
    return res;
  }
);

export const {
  addUserMints,
  getSchemas,
  filterByName,
  icreasePage,
} = NFTsSlice.actions;

export default NFTsSlice.reducer;
