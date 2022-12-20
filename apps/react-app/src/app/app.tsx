import React, { useEffect, useState } from 'react';
import './app.scss';
import MovieCard from './components/MovieCard';
import SearchBar from './components/searchBar'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import CircularUnderLoad from './components/loader';
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from './reducers/MovieSlice';
import MovieModel from './models/MovieModel';
import { store } from './store/store';
export type RootState = ReturnType<typeof store.getState>

export const App = () => {
  let dispatch = useDispatch();
  let movieState = useSelector((state: RootState) => {
    return state.movieStore
  });
  const [query, setQuery] = useState<string>('Jurassic Park');
  useEffect(() => {
    if (movieState.movies.length === 0) {
      dispatch(getMovies({query: query}))
    }
  }, [query])


  function displayMovieList(){
    return movieState.movies?.map( (movie:MovieModel) => {
        return (
          <div key={movie.imdbID}>
            <MovieCard 
              name={movie.Title}
              image={movie.Poster}
              year={movie.Year}
              type={movie.Type}
              id={movie.imdbID}
            />
          </div>
        )
    })
  }

  function search (e:any){
    setQuery(e.target.value);
  }
  
  function handleSubmit(e:KeyboardEvent){
    if (e.key === "Enter") {
      dispatch(getMovies({query: query}))
    }
  };  

  return (

    <div className="app">
      <SearchBar 
        search={search}
        submit={handleSubmit}
      />

      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="md">

          { movieState.movies ? (
              <div className='first-item'>
                {displayMovieList()}
              </div>
            ):(  
              <CircularUnderLoad /> 
            )
          }  

        </Container>
      </React.Fragment>
    </div>
  );

};

export default App;