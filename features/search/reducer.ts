import {createSlice} from "@reduxjs/toolkit";
import type {AppState} from "store";

interface ISearchState {
    searchResults: IPagination;
}

interface IPagination {
    data: Array<object>;
    pagination: IPaginationData
}

interface IPaginationData {
    "page": number;
    "pageSize": number;
    "pageCount": number;
    "total": number
}

export const initialState: ISearchState = {
    searchResults: {data: [], pagination: {"page": 1, "pageSize": 10, "pageCount": 0, "total": 0}},
};

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
        },
        setPage: (state, action) => {
            state.searchResults.pagination.page = action.payload;
        },

    },
});

export const {
    setSearchResults,
    setPage,
} = searchSlice.actions;

export const selectSearch = (state: AppState) => state.search;

export default searchSlice.reducer;
