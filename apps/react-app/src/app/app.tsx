import React, { useEffect, useState } from 'react';
import './app.scss';
import MovieCard from './components/MovieCard';
import SearchBar from './components/searchBar'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { styled } from '@material-ui/core';
import CircularUnderLoad from './components/loader';

const API_KEY = '23aaa32';

export const App = () => {
  useEffect(() => {
    document.title = `MovieLand`;

    if (!URL){
      setLoading(true);
    }
    fetchData(URL);
  }, [])
  
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState(null);
  const [query, setQuery] = useState('jurassic park');
  const URL = `https://omdbapi.com/?s=${query}&apikey=${API_KEY}`;

  async function fetchData(url:string) {
    try {
      const response = await fetch(url)
      const datas = await response.json()
        // @ts-ignore
      if(datas.Response == "True"){
        setLoading(false);
          // @ts-ignore
        setData(datas.Search);
      } 

    } catch (err) {
      console.log(err);
    } 
  }
  console.log(data);
  
  function displayMovieList(){
      // @ts-ignore
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
      })
  }

  const search = e => {
    setQuery(e.target.value);
  }

  const handleSubmit = () =>{
    
    if (query !== ''){
      fetchData(URL)
      setQuery(''); 
    }else{
      // <Error />
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
        <Container maxWidth="sm">

          { data ? (
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