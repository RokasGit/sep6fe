import { Box } from "@chakra-ui/react"
import React, { useState, useEffect } from 'react';
import { getToplist } from "../requests/toplist.requests"
import { Movie } from "../types/movie";
import MovieCard from "../components/movie-card";

const Toplist = () => {
    const[movies, setMovies] = useState<Movie[]>();

    useEffect(() => {
        const fetchData = async () => {
            setMovies(await getToplist(1));
        }
        fetchData();
    });
    
    return (
        <Box>{movies && <>{movies.forEach((movie) => <MovieCard movie={movie} />)}</>}</Box>
    ) 
}  

export default Toplist;
