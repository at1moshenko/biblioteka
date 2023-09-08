import { clearUser } from "../../../redux/slices/usersSlice";
import { setProfileRendering } from "../../../redux/slices/profileSlice";
import { setAuth } from "../../../redux/slices/authSlice";

export const logicSignOut = (dispatch) => {
  dispatch(clearUser());
  dispatch(setProfileRendering(true));
};

export const userSetAuth = (user, dispatch) => {
  if (user) {
    dispatch(setAuth(true));
  }
};

export const addClickOutsideListener = (element, callback) => {
  const handleClickOutside = (event) => {
    if (!event.composedPath().includes(element)) {
      callback();
    }
  };
  document.body.addEventListener("click", handleClickOutside);
  return () => document.body.removeEventListener("click", handleClickOutside);
};
