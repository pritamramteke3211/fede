import {configureStore} from '@reduxjs/toolkit';
import authenticationReducer from './feature/authentication/authentication';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
