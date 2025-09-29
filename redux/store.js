// src/redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import userReducer from "./userSlice";

// Configure persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // only persist the user slice
};

// Combine reducers (you can add more slices later)
const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

