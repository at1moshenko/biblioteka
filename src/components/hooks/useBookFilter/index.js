import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryId,
  setCloseCategorySort,
} from "../../../redux/slices/filterSlice";
import { closeCategorySortSelector } from "../../../redux/selectors";

export const useBookFilters = () => {
  const dispatch = useDispatch();
  const closeCategorySort = useSelector(closeCategorySortSelector);

  const handleCategoryChange = (id) => {
    dispatch(setCategoryId(id));
  };

  const openingAndClosingCategoryMenu = () => {
    dispatch(setCloseCategorySort(!closeCategorySort));
  };

  const filterBooksBySearch = (books, value) => {
    return books.filter((el) => {
      return (
        el.NameAuthor.toLowerCase().includes(value.toLowerCase()) ||
        el.title.toLowerCase().includes(value.toLowerCase())
      );
    });
  };

  const fetchBooksByFilters = (categoryId, sortType) => {
    const category = categoryId === null ? 0 : `category=${categoryId}`;
    const order = sortType.includes("title") ? "asc" : "desc";
    const sortBy = sortType;

    return { category, order, sortBy };
  };

  return {
    filterBooksBySearch,
    fetchBooksByFilters,
    handleCategoryChange,
    openingAndClosingCategoryMenu,
  };
};
