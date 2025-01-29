'use client';

import { persistor, store } from './store';

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

export default function StoreProvider({ children, }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}