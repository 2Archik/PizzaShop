import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Sort = {
  name: string;
  sortProperty: string;
};

interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: Sort;
}

const initialState: FilterSliceState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },

    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },

    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },

    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;

export const { setCategoryId, setSort, setCurrentPage, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
