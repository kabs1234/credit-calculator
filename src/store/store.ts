import { configureStore } from '@reduxjs/toolkit';
import { creditApi } from '../api/creditApi';
import { rootReducer } from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(creditApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
