import './app.scss';
import React, { useEffect, useState } from 'react';
import MovieCard from './components/MovieCard';
import SearchBar from './components/SearchBar'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import CircularUnderLoad from './components/Loader';
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from './reducers/MovieSlice';
import MovieModel from './models/MovieModel';
import { store } from './store/store';
export type RootState = ReturnType<typeof store.getState>
import MovieIcon from '@material-ui/icons/Movie';
import MovieDetails from './components/MovieDetails';

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
      { query == "Jurassic Park" ? 
        <div className='dinosaur'>
          <img src='../../assets/furassic.png' />
          <h1>Dinosaurs are the best</h1>
        </div>
      :
        <h1 className='not-dinosaur'>Your movies <MovieIcon/> </h1>

      }
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="md">

          { movieState.movies ? (
              <>
                {displayMovieList()}
              </>
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