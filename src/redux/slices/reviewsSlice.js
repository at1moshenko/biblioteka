import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: {},
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addReview: (state, action) => {
      const { bookId, reviewId, userId, text, email } = action.payload;
      if (!state.reviews[bookId]) {
        state.reviews[bookId] = [];
      }
      state.reviews[bookId].push({ reviewId, userId, text, email });
    },
    deleteReview: (state, action) => {
      const { bookId, reviewId, userId } = action.payload;

      if (state.reviews[bookId]) {
        state.reviews[bookId] = state.reviews[bookId].filter(
          (review) =>
            !(review.reviewId === reviewId && review.userId === userId)
        );
      }
    },
  },
});

export const { addReview, deleteReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;
