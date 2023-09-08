import { useState, useEffect } from "react";
import { setProfileRendering } from "../../../redux/slices/profileSlice";
import { setUser } from "../../../redux/slices/usersSlice";
import { authSelector } from "../../../redux/selectors";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  API_BASE_URL,
  EMPTY_EMAIL_ERROR,
  INVALID_EMAIL_ERROR,
  PASSWORD_LENGTH_ERROR,
  EMPTY_PASSWORD_ERROR,
  PASSWORD_MISMATCH_ERROR,
  REGULAR,
} from "../../consts";

const useAuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [wrongData, setWrongData] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [confirmPasswordDirty, setConfirmPasswordDirty] = useState(false);
  const [passwordMismatchError, setPasswordMismatchError] = useState("");
  const [passwordError, setPasswordError] = useState(EMPTY_PASSWORD_ERROR);
  const [emailError, setEmailError] = useState(EMPTY_EMAIL_ERROR);
  const [confirmPasswordError, setConfirmPasswordError] = useState(
    "Поле не может быть пустым"
  );

  useEffect(() => {
    if (emailError || passwordError || confirmPasswordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError, confirmPasswordError]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    if (!REGULAR.test(String(event.target.value).toLowerCase())) {
      setEmailError(INVALID_EMAIL_ERROR);
      if (!event.target.value) {
        setEmailError(EMPTY_EMAIL_ERROR);
        setUserExists(false);
      }
    } else {
      setEmailError("");
      setUserExists(false);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length < 6 || event.target.value.length > 10) {
      setPasswordError(PASSWORD_LENGTH_ERROR);
      if (!event.target.value) {
        setPasswordError(EMPTY_PASSWORD_ERROR);
        setUserExists(false);
      }
    } else {
      setPasswordError("");
      setUserExists(false);
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);

    if (!event.target.value) {
      setConfirmPasswordError("Поле не может быть пустым55");
      setUserExists(false);
    } else {
      setConfirmPasswordError("");
      setUserExists(false);
    }

    if (password !== event.target.value) {
      setPasswordMismatch(true);
      setPasswordMismatchError(PASSWORD_MISMATCH_ERROR);
    } else {
      setPasswordMismatch(false);
      setPasswordMismatchError("");
    }
  };

  const blurHandler = (event) => {
    switch (event.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      case "confirmPassword":
        setConfirmPasswordDirty(true);
        break;
    }
  };

  const registerUser = () => {
    if (password !== confirmPassword) {
      console.log("Пароли не совпадают");
      setPasswordMismatch(true);
      return;
    } else {
      setPasswordMismatch(false);
    }

    const userData = { email, password, cart: [] };

    axios
      .get(`${API_BASE_URL}/users`)
      .then((response) => {
        const users = response.data;
        const existingUser = users.find((user) => user.email === email);

        if (existingUser) {
          console.log("Такой пользователь уже существует:", existingUser);
          setUserExists(true);
        } else {
          axios
            .post(`${API_BASE_URL}/users`, userData)
            .then((response) => {
              console.log("Регистрация успешна:", response.data);
              dispatch(setUser(response.data));
              navigate("/");
            })
            .catch((error) => {
              console.error("Ошибка регистрации:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Ошибка получения данных пользователей:", error);
      });
  };

  const authUser = () => {
    axios
      .get(`${API_BASE_URL}/users`)
      .then((response) => {
        const users = response.data;
        const authenticatedUser = users.find(
          (user) => user.email === email && user.password === password
        );

        if (authenticatedUser) {
          console.log("Авторизация успешна:", authenticatedUser);
          dispatch(setUser(authenticatedUser));
          dispatch(setProfileRendering(false));
          navigate("/");
        } else {
          console.log("Неверное имя пользователя или пароль");
          setWrongData(true);
        }
      })
      .catch((error) => {
        console.error("Ошибка авторизации:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (auth) {
      registerUser();
    } else {
      authUser();
    }
  };

  return {
    auth,
    email,
    password,
    confirmPassword,
    wrongData,
    formValid,
    emailDirty,
    userExists,
    passwordDirty,
    passwordMismatch,
    confirmPasswordDirty,
    emailError,
    confirmPasswordError,
    passwordError,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    blurHandler,
    handleSubmit,
    passwordMismatchError,
  };
};

export default useAuthForm;
