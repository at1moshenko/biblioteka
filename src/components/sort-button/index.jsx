import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../../redux/slices/filterSlice";
import styles from "./index.module.css";
import { sortList, addClickOutsideListener } from "../hooks/logic-sort-button";
import { sortSelector } from "../../redux/selectors";

export const SortButton = () => {
  const sortRef = useRef();
  const dispatch = useDispatch();
  const sort = useSelector(sortSelector);
  const [openSortButton, setOpenSortButton] = useState(false);

  useEffect(() => {
    addClickOutsideListener(sortRef.current, setOpenSortButton);
  }, []);

  const onClosePopup = (obj) => {
    dispatch(setSort(obj));
    setOpenSortButton(false);
  };

  return (
    <div className={styles.sort}>
      <p
        ref={sortRef}
        className={styles.p}
        onClick={() => {
          setOpenSortButton(!openSortButton);
        }}
      >
        фильтр
      </p>
      {openSortButton && (
        <div className={styles.sortPopup}>
          <ul>
            {sortList.map((obj, index) => (
              <li
                key={index}
                onClick={() => onClosePopup(obj)}
                className={
                  sort.sortProperty === obj.sortProperty
                    ? styles.active
                    : styles.li
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
