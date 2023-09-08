import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../redux/slices/usersSlice";
import { useNavigate } from "react-router-dom";
import { favoriteSelector } from "../../../redux/selectors";
export const useFavorite = () => {
  const favoritesStorage = useSelector(favoriteSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeFromCartHandler = (title) => {
    dispatch(removeFromCart({ title }));
  };

  const navigateToBook = (id, title) => {
    navigate(`/book/${id}/${title}`);
  };

  return { favoritesStorage, removeFromCartHandler, navigateToBook };
};
