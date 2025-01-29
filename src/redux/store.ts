import { persistReducer, persistStore } from "redux-persist";

import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
import { userState } from './states/user.state';

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  userState: persistReducer(persistConfig, userState),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;