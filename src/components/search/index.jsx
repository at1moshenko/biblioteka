import React, { useCallback, useRef, useState } from "react";
import { setValue } from "../../redux/slices/filterSlice";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import styles from "./index.module.css";

export const Search = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const [valueLocal, setValueLocal] = useState("");

  const clearSearchValue = () => {
    dispatch(setValue(""));
    setValueLocal("");
    inputRef.current.focus();
  };

  const debounceSearchValue = useCallback(
    debounce((str) => {
      dispatch(setValue(str));
    }, 500),
    []
  );

  const onChangeInput = (event) => {
    setValueLocal(event.target.value);
    debounceSearchValue(event.target.value);
  };

  return (
    <>
      <input
        ref={inputRef}
        value={valueLocal}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск книги или автора"
      />
      {valueLocal && (
        <svg
          onClick={clearSearchValue}
          className={styles.closeIcon}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </>
  );
};
