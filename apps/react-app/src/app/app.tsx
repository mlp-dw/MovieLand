import React, { useEffect, useState } from 'react';
import './app.scss';
import SearchBar from './components/searchBar'

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
      //@ts-ignore
      return data.map( movie => {
          return <div key={movie.imdbID} id={movie.imdbID}>
              <div className="img">
                  <img  
                      src={movie.Poster} 
                      alt={movie.Title}
                  />
              </div>
              <h6>{movie.Title}</h6>
          </div>
      })
    // }else{
    //     // <Error />
    // }
  }

  return (

    <div className="app">
      <SearchBar />
      { data ? (
          <div>
            {displayMovieList()}
          </div>
        ):(  
        //  <Error />
          <div>
            snif snif pourquooooiiiii T-T
          </div>
        )
      }  
    </div>
  );

};

export default App;
