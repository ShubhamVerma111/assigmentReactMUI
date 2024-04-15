import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './dataSlice';
import filterSlice from './filterSlice';

export const store = configureStore({
  reducer: {
    data: dataSlice,
    filter: filterSlice,
  },
});