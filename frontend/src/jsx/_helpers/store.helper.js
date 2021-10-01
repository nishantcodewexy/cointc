import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../_reducers";

const loggerMiddleware = createLogger();

// function logger({ getState }) {
//   return (next) => (action) => {
//     console.log("will dispatch", action);
//     // Call the next dispatch method in the middleware chain.    const returnValue = next(action)
//     console.log("state after dispatch", getState());
//     // This will likely be the action itself, unless
//     // a middleware further in chain changed it.
//     return returnValue;
//   };
// }

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunkMiddleware),
);
export const persistor = persistStore(store);

export default { store, persistor };
