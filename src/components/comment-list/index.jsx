import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CommentForm from "../comment";
import { deleteReview } from "../../redux/slices/reviewsSlice";
import { commentSelector } from "../../redux/selectors";

export const CommentList = ({ user, styles, id }) => {
  const dispatch = useDispatch();
  const comment = useSelector(commentSelector);

  const handleDeleteComment = (reviewId, userId) => {
    dispatch(deleteReview({ bookId: id, reviewId, userId }));
  };

  return (
    <div className={styles.Reviews}>
      <h3>Отзывы</h3>
      <CommentForm styles={styles} bookId={id} />
      {comment[id]?.length > 0 ? (
        <ul>
          {comment[id]
            .slice()
            .reverse()
            .map((review) => (
              <li className={styles.li} key={review.reviewId}>
                <p>{review.email}</p>
                <p>{review.text}</p>
                {user?.id === review.userId && (
                  <button
                    className={styles.delete}
                    onClick={() =>
                      handleDeleteComment(review.reviewId, review.userId)
                    }
                  >
                    Удалить отзыв
                  </button>
                )}
              </li>
            ))}
        </ul>
      ) : (
        <p>Пока нет отзывов</p>
      )}
    </div>
  );
};
