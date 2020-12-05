import React, { useEffect, useState } from 'react';
import Movie from './components/Movie';
import TopMovies from './components/TopMovieSlider';

import './App.css';

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?&api_key=6609563e8d1d008dc8ac0c209b7f5c8d&query='

function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);


  const fetchMovies = async (link) => {
    setIsLoading(true);
    const movieResp = await fetch(link);
    const moviesData = await movieResp.json();
    setMovies([...movies ,...moviesData.results])
    setCurrentPage(moviesData.page)
    setIsLoading(false);
  }

  const searchMovie = async (link) => {
    setIsLoading(true);
    const movieResp = await fetch(link);
    const moviesData = await movieResp.json();
    setMovies(moviesData.results)
    setIsLoading(false);
  }

  useEffect(() => {
    const FEATURED_API = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6609563e8d1d008dc8ac0c209b7f5c8d&page=1';
    fetchMovies(FEATURED_API);
  }, [])

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setMovies([])
    setIsLoading(true);
    if(searchTerm){
      searchMovie(SEARCH_API + searchTerm);
      setSearchTerm('');
    }
    
  }

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleOnClick = (e) => {
    e.preventDefault();
    const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6609563e8d1d008dc8ac0c209b7f5c8d&page=${currentPage + 1}`;
    fetchMovies(FEATURED_API);
  }


  return (
    <>
    {
      isLoading && <div className="loading-container">
        <div className="loading"></div>
      </div>
    }
    
    <header>
      <h1>DeMovies</h1>
      <form onSubmit={handleOnSubmit}>
        <input type="search" placeholder="Search Movie...... " value={searchTerm} onChange={handleOnChange} />
      </form>
      
    </header>
    <TopMovies />
    <h1>Latest Movies</h1>
    <div className="movie-container">
      {
        movies.length > 0 && movies.map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))
      }
    </div>
    {
      searchTerm && 
      <div className="button-container">
        <button className="loadBtn" onClick={handleOnClick}> Load More </button>
      </div>
    }
    
    
    </>
  );
}

export default App;
