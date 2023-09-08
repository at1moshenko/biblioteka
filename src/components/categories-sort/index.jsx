import React from "react";
import styles from "./index.module.css";
import { useLogicCategoriesSort } from "../hooks/useCategoriesSort";

export const Categories = ({ onChangeCategory }) => {
  const { categoriesBook, closingTheBurgerMenuAndChoosingCategory } =
    useLogicCategoriesSort(onChangeCategory);

  return (
    <div className={styles.categories}>
      <p className={styles.Zagolovok}>Жанры книг</p>
      <hr className={styles.HR}></hr>
      <ul>
        {categoriesBook.map((elements, index) => (
          <li
            key={elements.id}
            onClick={() => closingTheBurgerMenuAndChoosingCategory(index)}
            className={styles.li}
          >
            {elements}
          </li>
        ))}
      </ul>
    </div>
  );
};
