import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const baseURL = "https://api.themoviedb.org/3";
const imgURL = "https://image.tmdb.org/t/p/original/";

function Row( {title, fetchUrl, isLargeRow } ) {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    
    // A snippet of code which based on a specific condition/variable
    useEffect(() => {
        // if [], run once when the row loads, and don't run again
        async function fetchData() {
            const request = await axios.get(`${baseURL}${fetchUrl}`);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    // console.log(movies);

    const opts = {
        height: "390",
        width: "100%",
        playersVars: {
            // "https://developers.google.com/youtube/player_parameters",
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        }else {
            movieTrailer(movie?.name || "")
            .then(url => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
            })
            .catch((error) => console.log(error));
        }
    }

    return (
        <div className='row'>
            <h2>{title}</h2>

            <div className='row__posters'>
                {movies.map(movie => (
                    <img 
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`${imgURL}${isLargeRow? movie.poster_path : movie.backdrop_path }`} 
                        alt={movie.name}>
                    </img>
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    );
}

export default Row