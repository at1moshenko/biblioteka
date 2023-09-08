import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addReview } from "../../../redux/slices/reviewsSlice";

export const useLogicCommentForm = ({
  bookId,
  reviewText,
  setReviewText,
  user,
}) => {
  const dispatch = useDispatch();

  const isSubmitDisabled = () => {
    return reviewText.trim() === "" || reviewText.length === 0 || user === null;
  };

  const handleReviewSubmit = () => {
    const reviewId = uuidv4();

    dispatch(
      addReview({
        bookId,
        reviewId,
        userId: user.id,
        text: reviewText,
        email: user.email,
      })
    );
    setReviewText("");
  };

  return { isSubmitDisabled, handleReviewSubmit };
};
