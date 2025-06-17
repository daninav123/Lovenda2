import { configureStore } from '@reduxjs/toolkit';
import weddingReducer from './weddingSlice';

export const store = configureStore({
  reducer: {
    wedding: weddingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
