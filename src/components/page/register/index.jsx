import React from "react";
import useAuthForm from "../../hooks/useRegister";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

export const AuthForm = () => {
  const {
    auth,
    email,
    password,
    confirmPassword,
    wrongData,
    formValid,
    emailDirty,
    userExists,
    passwordDirty,
    confirmPasswordDirty,
    emailError,
    passwordMismatchError,
    passwordError,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    blurHandler,
    handleSubmit,
  } = useAuthForm();

  return (
    <div className={styles.Wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Link to="/">
          <svg
            className={styles.closeIcon}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </Link>
        <h2 className={styles.h2}>{auth ? "Регистрация" : "Авторизация"}</h2>

        <p className={styles.P}>Логин</p>
        <input
          name="email"
          className={styles.Login}
          type="text"
          value={email}
          onChange={handleEmailChange}
          onBlur={blurHandler}
        />
        {emailDirty && emailError && auth && (
          <p className={styles.error}>{emailError}</p>
        )}

        <p className={styles.P}>Пароль</p>
        <input
          name="password"
          className={styles.Parol}
          type="password"
          value={password}
          onChange={handlePasswordChange}
          onBlur={blurHandler}
        />

        {passwordDirty && passwordError && auth && (
          <p className={styles.error}>{passwordError}</p>
        )}
        {wrongData && (
          <p className={styles.error}>Неверное имя пользователя или пароль</p>
        )}

        {auth && (
          <>
            <p className={styles.P}>Подтверждение пароля</p>
            <input
              name="confirmPassword"
              className={styles.Parol}
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onBlur={blurHandler}
            />

            {confirmPasswordDirty && passwordMismatchError && (
              <p className={styles.error}>{passwordMismatchError}</p>
            )}
          </>
        )}
        {userExists && (
          <p className={styles.error}>Такой пользователь уже существует</p>
        )}
        <button
          disabled={!formValid && auth}
          className={styles.BtnOk}
          type="submit"
        >
          {auth ? "Register" : "Login"}
        </button>
      </form>
    </div>
  );
};
