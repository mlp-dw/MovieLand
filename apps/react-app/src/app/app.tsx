import React, { useEffect, useState } from 'react';

import './app.scss';
import SearchBar from './components/searchBar'

const API_KEY = '23aaa32';

export const App = () => {
  useEffect(() => {
    document.title = `MovieLand`
    fetchData(URL)
  }, [])
  
  const [data, setData] = useState({})
  const [error, setError] = useState(false)
  const [query, setQuery] = useState('jurassic park')
  const URL = `https://omdbapi.com/?s=${query}&page=1&apikey=${API_KEY}`;

  // const [Response, setResponse] = useState(second)
  // const [Search, setSearch] = useState(second)
  // const [first, setfirst] = useState(second)
  
  async function fetchData(url:String) {
    try {
      const response = await fetch(url)
      const data = await response.json()
      if(data.Response == "True"){
        setData(data);
      } 
    } catch (err) {
      console.log(err)
      setError(true)
    } 
  }
  
  console.log(data);
  
  function displayMovieList(movies:[]){

    const searchList: any = document.getElementById('movies-list');
    searchList.innerHTML = "";

    movies.forEach(movie => {
      let movieItem = document.createElement('div');

      if(movie.Poster != "N/A"){
        moviePoster = movie.Poster;
      }else{
        moviePoster = "image_not_found.png";
      }

      movieItem.innerHTML = `
        <div id="${movie.imdbID}"
          <div>
            <img src = "${movie.Poster}">
          </div>

          <div>
            <h3>${movie.Title}</h3>
            <p>${movies.Year}</p>
          </div>
        </div>
      `;
      searchList.appendChild(movieItem);

    });
}

  return (
    <div className="app">
      <SearchBar />

      <div id="movies-list">
        {/* { displayMovieList(data) } */}
      </div>

    </div>
  );

};

export default App;
