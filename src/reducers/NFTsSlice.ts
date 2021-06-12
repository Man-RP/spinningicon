import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { getAllTemplates, getUserMints } from "../api";
import { templatesInterval } from "../consts/consts";
import {
  addMintsToTemplatesHelper,
  checkIfLastPage,
  clearMintsFromTemplatesHelper,
  filterNFTsByPage,
  filterNFTsBySchemas,
  filterTemplatesByName,
  removeItemOnce,
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
  schemasFilter: string[];
}

const initialState: NFTsState = {
  data: [],
  page: 1,
  hasMore: true,
  status: "idle",
  error: null,
  search: "",
  schemasFilter: [],
};

export const fetchAllNFTs = createAsyncThunk<
  NFT[],
  void,
  {
    state: RootState;
  }
>("NFTs/fetchAllNFTs", async (temp, thunkAPI) => {
  let NFTs: NFT[] = await getAllTemplates(); //fetch all templates
  const user = thunkAPI.getState().user.userName;
  //if user is already authenticated - fetch his assets and add mints to templates
  if (user && NFTs.length > 0) {
    const mints = await getUserMints(user);
    NFTs = addMintsToTemplatesHelper(NFTs, mints);
  }
  return NFTs as NFT[];
});

export const NFTsSlice = createSlice({
  name: "NFTs",
  initialState,
  reducers: {
    filterByName: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.hasMore = true;
      state.page = 1;
    },
    icreasePage: (state) => {
      state.page = state.page + 1;
      if (
        //check if this is the last page - should stop the indicator
        checkIfLastPage(
          state.data,
          templatesInterval,
          state.page,
          state.search,
          state.schemasFilter
        )
      )
        state.hasMore = false;
    },
    toggleSchemaFilter: (state, action: PayloadAction<string>) => {
      if (state.schemasFilter.includes(action.payload))
        state.schemasFilter = removeItemOnce(
          state.schemasFilter,
          action.payload
        );
      else state.schemasFilter.push(action.payload);
      state.search = "";
      state.hasMore = true;
      state.page = 1;
    },
    addMintsToTemplates: (state, action: PayloadAction<IMints>) => {
      state.data = addMintsToTemplatesHelper(state.data, action.payload);
    },
    clearMintsFromTemplates: (state) => {
      state.data = clearMintsFromTemplatesHelper(state.data);
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
  },
});

export const NFTsSelector = createSelector<
  RootState,
  NFT[],
  string,
  string[],
  number,
  NFT[]
>(
  [
    (state) => state.NFTs.data,
    (state) => state.NFTs.search,
    (state) => state.NFTs.schemasFilter,
    (state) => state.NFTs.page,
  ],
  (NFTs, search, schemasFilter, page) => {
    let res: NFT[] = NFTs;
    if (search.length > 0) res = filterTemplatesByName(NFTs, search); //filter by search
    if (schemasFilter.length > 0) res = filterNFTsBySchemas(res, schemasFilter); //filter by schemas
    res = filterNFTsByPage(res, templatesInterval, page); //limit results amount
    return res;
  }
);

export const {
  filterByName,
  icreasePage,
  toggleSchemaFilter,
  addMintsToTemplates,
  clearMintsFromTemplates,
} = NFTsSlice.actions;

export default NFTsSlice.reducer;
