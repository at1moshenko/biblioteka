import { configureStore, combineReducers } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import books from "./slices/booksSlice";
import userReducer from "./slices/usersSlice";
import auth from "./slices/authSlice";
import profileRendering from "./slices/profileSlice";
import user from "./slices/usersSlice";
import reviews from "./slices/reviewsSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  filter,
  books,
  userReducer,
  auth,
  profileRendering,
  user,
  reviews,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
