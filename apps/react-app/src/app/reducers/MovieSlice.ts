import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import IMovie from '../interfaces/IMovie';
import MovieModel from '../models/MovieModel';
import MovieServices from '../services/movieService';

interface SliceState {
  movie: MovieModel | null;
  movies: Array<MovieModel>
  isLoading: boolean;
}

const initialState: SliceState = {
    movie: null,
    isLoading: false,
    movies: []

};

const MovieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovie: (state: {movie: any}, action: PayloadAction<MovieModel>) => {
      state.movie = action.payload;
    },
    setMovies: (state: {movies: Array<MovieModel>}, action: PayloadAction<Array<MovieModel>>) => {
        state.movies = action.payload;
      },
    setIsLoading: (
      state: {isLoading: boolean},
      action: PayloadAction<boolean>,
    ) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getMovies.fulfilled, (state, action) => {
      state.isLoading = false;
      // console.log('Login :', state);
    });
    // builder.addCase(getUser.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   // console.log('getUser :', state);
    // });
  },
});

export const {setMovie, setMovies, setIsLoading} = MovieSlice.actions;
export default MovieSlice.reducer;

export const getMovies = createAsyncThunk(
  'movies/list',
  async (data: {query: string}, thunkAPI) => {
    const response = await MovieServices.getAll(data.query);
    const movieData:any = await response.json();
    if (movieData) {
        if (movieData.Response == 'True') {
            // console.log(movieData);
            let MovieArray: Array<MovieModel>  = movieData.Search.map((movie: IMovie)=>{
                return new MovieModel(movie);
            })
            // console.log(MovieArray);
            thunkAPI.dispatch(setMovies(MovieArray))
            // thunkAPI.dispatch(setIsLoading(false));
            return true;
        }
    }

    return true;
  },
);
export const getMovieById = createAsyncThunk(
  'movie/id',
  async (data: {imdbID: string}, thunkAPI) => {
    const response = await MovieServices.getById(data.imdbID);
    const movieData:any = await response.json();
    console.log('getid', movieData);
    
    if (movieData) {
      thunkAPI.dispatch(setMovie(movieData))
      thunkAPI.dispatch(setIsLoading(false))
      return true;
    }
    // console.log(movie);
    
    return true;
  },
);