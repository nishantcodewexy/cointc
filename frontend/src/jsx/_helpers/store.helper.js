import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createLogger } from 'redux-logger';
import rootReducer from "../_reducers";

const loggerMiddleware = createLogger();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['user',"settings"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(loggerMiddleware),
})

// export const store = createStore(
//   persistedReducer,
//   applyMiddleware(thunkMiddleware, loggerMiddleware)
// );
export const persistor = persistStore(store);

const stores = { store, persistor }

export default stores
