import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { MoviePicker } from '../../MoviePicker/MoviePicker'
import { UserMoviePick } from '../../MoviePicker/UserMoviePick'

export interface MoviePicksState {
  value: {},
}

const initialState: MoviePicksState = {
  value: {}
}

export const PicksSlice = createSlice({
  name: 'moviePicks',
  initialState,
  reducers: {
    setValue: (state: {value: any}, action: PayloadAction<{}>) => {
        state.value = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder.addCase(getPicks.fulfilled, (state, action: PayloadAction<{}>) => {
      state.value = action.payload ?? [];
    }),
    builder.addCase(setPick.fulfilled, (state, action: PayloadAction<{}>) => {
        state.value = action.payload ?? [];
    })
}
})

export default PicksSlice.reducer;
export const {setValue} = PicksSlice.actions;
export const getPicks = createAsyncThunk(
    'getPicks',
    async (undefined, ThunkApi) => {
        const pickRepo = new UserMoviePick()
        const moviePicker: MoviePicker = new MoviePicker(pickRepo);
        const moviePicks = await moviePicker.getPicks();
        if (moviePicks) {
            ThunkApi.dispatch(setValue(moviePicks));
        }
        return moviePicks as {}
    }
)

export const setPick = createAsyncThunk(
    'setPick',
    async (movieName: string) => {
        const pickRepo = new UserMoviePick()
        const moviePicker: MoviePicker = new MoviePicker(pickRepo);
        const moviePicks = await moviePicker.pick(movieName);
        return moviePicks;
    }
)
