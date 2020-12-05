import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';

import '@splidejs/splide/dist/css/themes/splide-default.min.css';

const IMG_API = 'https://image.tmdb.org/t/p/w1280';

const TopMovieSlider = () => {
    const [topMovie, setTopMovie] = useState([]);

    const fetchMovies = async (link) => {
        const movieResp = await fetch(link);
        const moviesData = await movieResp.json();
        console.log(moviesData.results);
        setTopMovie(moviesData.results)
      }

    useEffect(() => {
        const FEATURED_API = 'https://api.themoviedb.org/3/movie/top_rated?api_key=6609563e8d1d008dc8ac0c209b7f5c8d&language=en-US&page=1';
        fetchMovies(FEATURED_API);
      }, [])

  return (
      <>
        <h1>Popular Movies</h1>

        <Splide
            options={ {
                perPage: 3,
                type         : 'loop',
                gap          : '1rem',
                autoplay     : true,
                pauseOnHover : false,
                resetProgress: false,
                arrows       : 'slider',
            } }
            hasSliderWrapper
            hasAutoplayProgress
        >
            { topMovie && topMovie.map( slide => (
                <SplideSlide className="imgSlide" key={ slide.id }>
                    <img src={  IMG_API + slide.poster_path } alt={ slide.title } />
                </SplideSlide>
            ) ) }
        </Splide>
      </>
    
  );
};

export default TopMovieSlider;