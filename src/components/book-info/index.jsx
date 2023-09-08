import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import axios from "axios";
import { useSelector } from "react-redux";
import { profileRenderingSelector } from "../../redux/selectors";

export const BookInfo = ({ styles, openModal, id, book }) => {
  const [averageRating, setAverageRating] = useState(book ? book.rating : 0);
  const [userRatings, setUserRatings] = useState(() => {
    const storedRatings = localStorage.getItem("userRatings");
    return storedRatings ? JSON.parse(storedRatings) : [];
  });

  const profileRendering = useSelector(profileRenderingSelector);

  useEffect(() => {
    if (userRatings.length !== 0) {
      const sum = userRatings.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      const averageRating = sum / userRatings.length;
      console.log("Средняя оценка:", averageRating, userRatings);
    }
  }, [userRatings]);

  useEffect(() => {
    if (userRatings.length !== 0) {
      const sum = userRatings.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      const averageRating = sum / userRatings.length;
      console.log("Средняя оценка:", averageRating, userRatings);
    }
  }, [userRatings]);

  useEffect(() => {
    if (book) {
      setAverageRating(book.rating || 0);
    }
  }, [book]);

  const handleRatingChange = (newValue) => {
    const updatedRatings = [...userRatings, newValue];
    setUserRatings(updatedRatings);
    localStorage.setItem("userRatings", JSON.stringify(updatedRatings));

    if (updatedRatings.length > 1) {
      const sum = updatedRatings.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      const newAverageRating = sum / updatedRatings.length;
      setAverageRating(newAverageRating);

      axios
        .put(`https://648607fda795d24810b79f33.mockapi.io/books/${id}`, {
          rating: newAverageRating,
        })
        .then((response) => {
          console.log("Оценка обновлена на сервере:", newAverageRating);
        })
        .catch((error) => {
          console.error("Ошибка при обновлении оценки на сервере:", error);
        });
    }
  };

  return (
    <div className={styles.BookDescription}>
      <p className={styles.PageBookName}>{book.title}</p>
      <p className={styles.PageBookAuthor}>{book.NameAuthor}</p>
      <button onClick={openModal} className={styles.ButtonPageBook}>
        ЧИТАТЬ
      </button>
      <div className={styles.Description}>
        <Box component="fieldset" borderColor="transparent">
          {profileRendering ? (
            <Rating readOnly value={averageRating} precision={1} />
          ) : (
            <Rating
              Controlled
              value={averageRating}
              precision={1}
              onChange={(event, newValue) => {
                handleRatingChange(newValue);
              }}
            />
          )}
        </Box>
        <p className={styles.oKnige}>О книге</p>
        <p className={styles.Opisanie}>{book.oKnige}</p>
      </div>
    </div>
  );
};
