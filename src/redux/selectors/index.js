export const userSelector = (state) => state.user.user;
export const authSelector = (state) => state.auth.auth;
export const sortSelector = (state) => state.filter.sort;
export const booksSelector = (state) => state.books.books;
export const valueSelector = (state) => state.filter.value;
export const favoriteSelector = (state) => state.user.cart;
export const statusSelector = (state) => state.books.status;
export const commentSelector = (state) => state.reviews.reviews;
export const categoryIdSelector = (state) => state.filter.categoryId;
export const sortPropertySelector = (state) => state.filter.sort.sortProperty;
export const profileRenderingSelector = (state) =>
  state.profileRendering.profileRendering;
export const closeCategorySortSelector = (state) =>
  state.filter.closeCategorySort;
