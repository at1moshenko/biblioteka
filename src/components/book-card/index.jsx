import React from "react";
import { Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import styles from "./index.module.css";
import { useBookCardLogic } from "../hooks/useBookCard";

export const BookCard = ({ ...obj }) => {
  const { isBookReserved, redirectToBookPage, addToFavorite } =
    useBookCardLogic(obj);

  return (
    <div className={styles.ProductBookCardTile} key={obj.id}>
      <div className={styles.BookDetails}>
        <img
          className={styles.ImgBookTile}
          src={obj.imageUrl}
          onClick={redirectToBookPage}
        />
        <Box component="fieldset" borderColor="transparent">
          <Rating value={obj.rating} precision={1} readOnly />
        </Box>
        <div className={styles.WrappBookAndAuthor}>
          <p className={styles.BookNameTile}>{obj.title}</p>
          <p className={styles.NameAuthorTile}>{obj.NameAuthor}</p>
        </div>
        <button
          className={
            isBookReserved
              ? styles.ButtonTileBookFavorites
              : styles.ButtonTileBook
          }
          onClick={addToFavorite}
          disabled={isBookReserved}
        >
          {isBookReserved ? "ДОБАВЛЕНО В ИЗБРАННОЕ" : "В ИЗБРАННОЕ"}
        </button>
      </div>
    </div>
  );
};
