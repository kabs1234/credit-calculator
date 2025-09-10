import { combineReducers } from '@reduxjs/toolkit';
import { Namespace } from '../const';
import { creditApi } from '../api/creditApi';
import { creditsSlice } from './creditSlice/credit.slice';

export const rootReducer = combineReducers({
  [Namespace.Credits]: creditsSlice.reducer,
  [creditApi.reducerPath]: creditApi.reducer,
});
