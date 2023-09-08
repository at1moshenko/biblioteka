import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLogicCommentForm } from "../hooks/useComment";
import { userSelector } from "../../redux/selectors";

const CommentForm = ({ bookId, styles }) => {
  const user = useSelector(userSelector);

  const [reviewText, setReviewText] = useState("");

  const { isSubmitDisabled, handleReviewSubmit } = useLogicCommentForm({
    bookId,
    reviewText,
    setReviewText,
    user,
  });

  return (
    <div className={styles.TextAndButton}>
      <textarea
        className={styles.text}
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
      <button
        className={styles.reviewButton}
        disabled={isSubmitDisabled()}
        onClick={handleReviewSubmit}
      >
        Написать отзыв
      </button>
    </div>
  );
};

export default CommentForm;
