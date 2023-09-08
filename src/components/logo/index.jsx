import React from "react";
import { useDispatch } from "react-redux";
import { setValue, setCategoryId } from "../../redux/slices/filterSlice";
import { Link } from "react-router-dom";

export const Logo = ({ styles }) => {
  const dispatch = useDispatch();

  const onClickLogo = () => {
    dispatch(setValue(""));
    dispatch(setCategoryId(null));
  };

  return (
    <Link to="/" className={styles.customLink}>
      <h1 onClick={onClickLogo} className={styles.Biblioteka}>
        Библиотека
      </h1>
    </Link>
  );
};
