import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../components/consts";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  cart: [],
  buttonBoolean: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (state.user && state.user.id === action.payload.id) {
        return;
      }
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));

      if (action.payload.cart) {
        state.cart = action.payload.cart;
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.cart = [];
      localStorage.removeItem("user");
    },
    addToCart: (state, action) => {
      if (state.user) {
        const { id, title } = action.payload;
        const isBookInCart = state.cart.some((item) => item.id === id);

        if (!isBookInCart) {
          state.cart.push({ id, title });

          axios
            .put(`${API_BASE_URL}/users/${state.user.id}`, { cart: state.cart })
            .then((response) => {
              console.log(
                "Название книги добавлено в корзину на сервере:",
                response.data
              );
            })
            .catch((error) => {
              console.error("Ошибка при сохранении корзины на сервере:", error);
            });
        }
      }
    },
    removeFromCart: (state, action) => {
      if (state.user) {
        const title = action.payload.title;

        state.cart = state.cart.filter((item) => item.title !== title);

        axios
          .put(`${API_BASE_URL}/users/${state.user.id}`, { cart: state.cart })
          .then((response) => {
            console.log(
              "Название книги удалено из корзины на сервере:",
              response.data
            );
          })
          .catch((error) => {
            console.error("Ошибка при сохранении корзины на сервере:", error);
          });
      }
    },
    setButtonBoolean(state, action) {
      state.buttonBoolean = action.payload;
    },
  },
});

export const {
  setUser,
  clearUser,
  addToCart,
  removeFromCart,
  setButtonBoolean,
} = userSlice.actions;
export default userSlice.reducer;
