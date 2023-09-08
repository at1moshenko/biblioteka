import React from "react";
import styles from "./index.module.css";

export const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.smail}>😕</p>
      <p className={styles.text}>Ничего не найдено</p>
      <p className={styles.text}>К сожалени данная страница отсутствует</p>
    </div>
  );
};
