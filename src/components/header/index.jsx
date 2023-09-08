import React from "react";
import { useSelector } from "react-redux";
import { Logo } from "../logo";
import { AuthenticationButtons } from "../authentication-buttons";
import { UserPopup } from "../user-popup";
import styles from "./index.module.css";
import { profileRenderingSelector } from "../../redux/selectors";

export const Header = () => {
  const profileRendering = useSelector(profileRenderingSelector);

  return (
    <header className={styles.Header}>
      <Logo styles={styles} />
      <div className={styles.Person}>
        {profileRendering ? (
          <AuthenticationButtons styles={styles} />
        ) : (
          <UserPopup styles={styles} />
        )}
      </div>
    </header>
  );
};
