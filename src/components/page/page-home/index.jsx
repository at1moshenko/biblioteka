import React from "react";
import { useSelector } from "react-redux";
import { Categories } from "../../categories-sort";
import { SortButton } from "../../sort-button";
import { BookCard } from "../../book-card";
import { Search } from "../../search";
import { Error } from "../../errorr";
import { useBookFilters } from "../../hooks/useBookFilter";
import { useURLParameterLogic } from "../../hooks/useUrlParams";
import {
  closeCategorySortSelector,
  booksSelector,
  statusSelector,
  valueSelector,
  categoryIdSelector,
} from "../../../redux/selectors";
import styles from "./index.module.css";

export const HomePage = () => {
  const categoryId = useSelector(categoryIdSelector);
  const books = useSelector(booksSelector);
  const status = useSelector(statusSelector);
  const value = useSelector(valueSelector);
  const closeCategorySort = useSelector(closeCategorySortSelector);

  const {
    filterBooksBySearch,
    handleCategoryChange,
    openingAndClosingCategoryMenu,
  } = useBookFilters();

  useURLParameterLogic();

  return (
    <div className={styles.Wrapper}>
      <button
        onClick={openingAndClosingCategoryMenu}
        className={styles.MenuButton}
      />
      <div className={styles.Left}>
        <div
          className={
            closeCategorySort ? styles.BurgerMenuTrue : styles.BurgerMenuFalse
          }
        >
          <svg
            onClick={openingAndClosingCategoryMenu}
            className={styles.closeIcon}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
          <Categories
            value={categoryId}
            onChangeCategory={handleCategoryChange}
          />
        </div>
      </div>
      {status === "error" ? (
        <Error />
      ) : (
        <div className={styles.Right}>
          <div>
            <Search valueBooks={value} />
            <SortButton />
          </div>
          {filterBooksBySearch(books, value).map((obj) => (
            <BookCard key={obj.id} {...obj} />
          ))}
        </div>
      )}
    </div>
  );
};
