import { combineSlices, configureStore } from "@reduxjs/toolkit";
import storage from "@/libs/client-storage";
import { persistReducer } from "redux-persist";

const rootReducer = combineSlices();

const persistConfig = {
  key: "root",
  storage,
  // blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: false,
      });
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
