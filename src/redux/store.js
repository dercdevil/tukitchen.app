import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AsyncStorage from '@react-native-community/async-storage';
import {isWeb} from "@/utils";

import { rootReducer } from "./reducers";

const excludedEnvs = ["test", "production"];

const shouldIncludeTools = !excludedEnvs.includes(
  process.env.NODE_ENV || ""
);

const middlewaresConfig = shouldIncludeTools
    ? { serializableCheck: false, immutableCheck: false }
    : { }

const defaultMiddlewares = [
    ...getDefaultMiddleware(middlewaresConfig)
];

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth","cart","addresses"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: defaultMiddlewares,
  devTools: shouldIncludeTools
});

export const persistor = persistStore(store);
