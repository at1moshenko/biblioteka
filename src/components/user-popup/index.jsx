import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logicSignOut, userSetAuth } from "../hooks/logic-user-popup";
import { addClickOutsideListener } from "../hooks/logic-sort-button";
import { userSelector } from "../../redux/selectors";

export const UserPopup = ({ styles }) => {
  const sortRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const [openUserPopup, setOpenUserPopup] = useState(false);

  const performSignOut = () => {
    logicSignOut(dispatch);
  };

  useEffect(() => {
    userSetAuth(user, dispatch);
  }); //, [user, dispatch]

  useEffect(() => {
    return addClickOutsideListener(sortRef.current, () =>
      setOpenUserPopup(false)
    );
  }, []);

  return (
    <p
      ref={sortRef}
      className={styles.Name}
      onClick={() => {
        setOpenUserPopup(!openUserPopup);
      }}
    >
      {user.email}
      {openUserPopup && (
        <div className={styles.userPopup}>
          <ul>
            <Link to="/cart">
              <button className={styles.favoritesAndExit}>избранное</button>
            </Link>
            <button
              className={styles.favoritesAndExit}
              onClick={performSignOut}
            >
              выход
            </button>
          </ul>
        </div>
      )}
    </p>
  );
};
