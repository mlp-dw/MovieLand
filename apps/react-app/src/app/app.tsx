import React, { useEffect, useState } from 'react';
import './app.scss';
import MovieCard from './components/MovieCard';
import SearchBar from './components/searchBar'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const API_KEY = '23aaa32';

export const App = () => {
  useEffect(() => {
    document.title = `MovieLand`;
    fetchData(URL);
  }, [])
  
  const [data, setData] = useState(null);
  const [query, setQuery] = useState('jurassic park');
  const URL = `https://omdbapi.com/?s=${query}&page=1&apikey=${API_KEY}`;

  async function fetchData(url:string) {
    try {
      const response = await fetch(url)
      const datas = await response.json()
  console.log(datas);

      if(datas.Response == "True"){
        setData(datas.Search);
      } 
    } catch (err) {
      console.log(err);
    } 
  }
  console.log(data);
  
  function displayMovieList(){
    // if (data){
      
      return data.map( movie => {
          return <div key={movie.imdbID}>
              <MovieCard 
                name={movie.Title}
                image={movie.Poster}
                year={movie.Year}
                type={movie.Type}
                id={movie.imdbID}
              />
              
          </div>
          // <div key={movie.imdbID} id={movie.imdbID}>
          //     <div className="img">
          //         <img  
          //             src={movie.Poster} 
          //             alt={movie.Title}
          //         />
          //     </div>
          //     <h6>{movie.Title}</h6>
          // </div>
      })
    // }else{
    //     // <Error />
    // }
  }

  return (

    <div className="app">
      <SearchBar />

      <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">

      { data ? (
          <div className='first-item'>
            {displayMovieList()}
          </div>
        ):(  
        //  <Error />
          <div>
            snif snif pourquooooiiiii T-T
          </div>
        )
      }  
       </Container>
    </React.Fragment>
    </div>
  );

};

export default App;