import React, { useState, useEffect } from 'react';

const TestMovies = () => {

    const [movies, setMovies] = useState([]);

    const fecthMovies = async (link) => {
        const MovieResp = await fetch(link)
        const data = await MovieResp.Json();
    }

    useEffect(() => {

    }, []);

    return (
        <h1>Hello .....</h1>
    )
}

export default TestMovies;