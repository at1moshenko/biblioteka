import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setAuth } from "../../redux/slices/authSlice";

export const AuthenticationButtons = ({ styles }) => {
  const dispatch = useDispatch();
  const handleAuthFalseClick = () => {
    dispatch(setAuth(false));
  };

  const handleAuthTrueClick = () => {
    dispatch(setAuth(true));
  };

  return (
    <>
      <Link to="/auth">
        <button onClick={handleAuthFalseClick} className={styles.BtnVhod}>
          Вход
        </button>
      </Link>
      <Link to="/auth">
        <button
          onClick={handleAuthTrueClick}
          className={styles.BtnRegistration}
        >
          Регистрация
        </button>
      </Link>
    </>
  );
};
