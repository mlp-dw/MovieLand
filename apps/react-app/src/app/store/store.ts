import { configureStore } from '@reduxjs/toolkit';
import MovieSlice from '../reducers/MovieSlice';
import PicksSlice from '../reducers/PicksSlice';

export const store = configureStore({
  reducer: {
    movieStore: MovieSlice,
    moviePicks: PicksSlice,
  },
  // don't do this ⬇️
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})
