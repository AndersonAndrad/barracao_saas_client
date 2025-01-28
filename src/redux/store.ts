import { configureStore } from '@reduxjs/toolkit';
import { userState } from './states/user.state';

const store = configureStore({
  reducer: {
    userState
  },
});

export default store;