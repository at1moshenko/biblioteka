import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../components/consts";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooksStatus",
  async (params) => {
    const { category, order, sortBy } = params;
    const { data } = await axios.get(
      `${API_BASE_URL}/books?&${category}&sortBy=${sortBy}&order=${order}`
    );
    return data;
  }
);

export const jumpToASpecificBook = (setBook, id) => {
  async function fetchBook() {
    try {
      const { data } = await axios.get(` ${API_BASE_URL}/books/` + id);
      setBook(data);
    } catch (error) {
      alert("error");
    }
  }
  fetchBook();
};

export const initialState = {
  books: [],
  status: "",
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks(state, action) {
      state.books = action.payload;
    },
  },
  extraReducers: {
    [fetchBooks.fulfilled]: (state, action) => {
      state.books = action.payload;
      state.status = "success";
    },
    [fetchBooks.rejected]: (state, action) => {
      state.books = [];
      state.status = "error";
    },
  },
});

export const { setBooks } = booksSlice.actions;
export default booksSlice.reducer;
