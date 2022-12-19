import { configureStore } from '@reduxjs/toolkit';
import MovieSlice from '../reducers/MovieSlice';

export const store = configureStore({
  reducer: {
    movieStore: MovieSlice,
  },
})