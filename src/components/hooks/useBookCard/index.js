import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, setButtonBoolean } from "../../../redux/slices/usersSlice";
import { favoriteSelector } from "../../../redux/selectors";

export const useBookCardLogic = (obj) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoritesStorage = useSelector(favoriteSelector);

  const [isBookReserved, setIsBookReserved] = useState(false);

  const redirectToBookPage = () => {
    navigate(`./book/${obj.id}/${obj.title}`);
  };

  const addToFavorite = () => {
    dispatch(addToCart({ ...obj }));
    dispatch(setButtonBoolean(true));
    localStorage.setItem(`booked_${obj.id}`, JSON.stringify(true));
  };

  useEffect(() => {
    setIsBookReserved(
      favoritesStorage.some((book) => book.title === obj.title)
    );
  }, [favoritesStorage, obj.id, obj.title]);

  return { isBookReserved, redirectToBookPage, addToFavorite };
};
