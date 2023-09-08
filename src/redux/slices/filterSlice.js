import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  categoryId: null,
  sort: {
    sortProperty: "all",
  },
  value: "",
  closeCategorySort: false,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setValue: (state, action) => {
      state.value = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = action.payload.categoryId;
      state.sort = action.payload.sort;
    },
    setCloseCategorySort(state, action) {
      state.closeCategorySort = action.payload;
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setValue,
  setFilters,
  setCloseCategorySort,
} = filterSlice.actions;
export default filterSlice.reducer;
