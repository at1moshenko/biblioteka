import React from "react";
import styles from "./index.module.css";

export const Error = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.smail}>😕</p>
      <p className={styles.text}>К сожалени сервер не работает </p>
      <p className={styles.text}>Вернитесь позже</p>
    </div>
  );
};
