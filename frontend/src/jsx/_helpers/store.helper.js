import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import thunkMiddleware from "redux-thunk";
// import { createLogger } from 'redux-logger';
import rootReducer from "../_reducers";

// const loggerMiddleware = createLogger();

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export default { store, persistor };
