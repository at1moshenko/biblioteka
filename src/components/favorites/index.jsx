import React from "react";
import { useFavorite } from "../hooks/UseFavorite";
import styles from "./index.module.css";

export const FavoritePage = () => {
  const { favoritesStorage, removeFromCartHandler, navigateToBook } =
    useFavorite();

  return (
    <div className={styles.cartPage}>
      <h2>Избранное</h2>
      <div className={styles.cartListContainer}>
        {favoritesStorage.length > 0 ? (
          <ul className={styles.cartList}>
            {favoritesStorage.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <span
                  onClick={() => navigateToBook(item.id, item.title)}
                  className={styles.bookTitle}
                >
                  {item.title}
                </span>{" "}
                <button
                  onClick={() => removeFromCartHandler(item.title)}
                  className={styles.removeButton}
                >
                  удалить
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>В избранном пусто</p>
        )}
      </div>
    </div>
  );
};
