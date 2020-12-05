import React from 'react';

const IMG_API = 'https://image.tmdb.org/t/p/w1280';

const setVoteColor = (vote) => {
    if(vote >= 8){
        return 'green'
    }
    else if(vote >= 6){
        return 'orange'
    }
    else{
        return 'red'
    }
} 

const Movie = ({ title, poster_path, overview, vote_average }) => (
    <div className="movie">
        <img src={(poster_path ? (IMG_API + poster_path) : 'https://mel.cgiar.org/graph/getthumbhash/hash/6f408587d625394e348bd474dbcc1fe6/fetchthumbs/1/file_type/pdf')} alt={title} />
        <div className="movie-info">
            <h3>{title}</h3>
            <span className={`tag ${setVoteColor(vote_average)}`}>{vote_average}</span>
        </div>

        <div className="movie-over">
            <h2>Overview:</h2>
            <p>{overview}</p>
        </div>
    </div>
)

export default Movie;